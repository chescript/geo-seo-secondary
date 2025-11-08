import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { conversations, messages } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { generateText } from 'ai';
import { getProviderModel, normalizeProviderName, isProviderConfigured } from '@/lib/provider-config';
import {
  AuthenticationError,
  SubscriptionRequiredError,
  ValidationError,
  DatabaseError,
  ExternalServiceError,
  handleApiError
} from '@/lib/api-errors';
import {
  ERROR_MESSAGES,
  ROLE_USER,
  ROLE_ASSISTANT,
  UI_LIMITS
} from '@/config/constants';
import { requireProSubscription } from '@/lib/subscription-utils';

export async function POST(request: NextRequest) {
  try {
    // Get the session
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      console.error('No session found in chat API');
      throw new AuthenticationError('Please log in to use the chat');
    }

    console.log('Chat API - User:', sessionResponse.user.id);

    const { message, conversationId, provider = 'anthropic', model } = await request.json();

    if (!message || typeof message !== 'string') {
      throw new ValidationError('Invalid message format', {
        message: 'Message must be a non-empty string'
      });
    }

    // Check if user has Pro subscription to access chat
    try {
      console.log('[Chat API] Checking subscription for user:', sessionResponse.user.id);
      await requireProSubscription(sessionResponse.user.id, 'chat');
      console.log('[Chat API] Subscription check passed');
    } catch (err) {
      console.error('[Chat API] Subscription check failed:', err);
      if (err instanceof Error && err.message.includes('Pro subscription')) {
        throw new SubscriptionRequiredError(
          ERROR_MESSAGES.SUBSCRIPTION_REQUIRED_CHAT,
          'chat'
        );
      }
      throw new ExternalServiceError('Unable to verify subscription. Please try again', 'autumn');
    }

    // Get or create conversation
    let currentConversation;
    
    if (conversationId) {
      // Find existing conversation
      const existingConversation = await db.query.conversations.findFirst({
        where: and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, sessionResponse.user.id)
        ),
      });
      
      if (existingConversation) {
        currentConversation = existingConversation;
        // Update last message timestamp
        await db
          .update(conversations)
          .set({ lastMessageAt: new Date() })
          .where(eq(conversations.id, conversationId));
      }
    }
    
    if (!currentConversation) {
      // Create new conversation
      const [newConversation] = await db
        .insert(conversations)
        .values({
          userId: sessionResponse.user.id,
          title: message.substring(0, UI_LIMITS.TITLE_MAX_LENGTH) + (message.length > UI_LIMITS.TITLE_MAX_LENGTH ? '...' : ''),
          lastMessageAt: new Date(),
        })
        .returning();
      
      currentConversation = newConversation;
    }

    // Store user message
    const [userMessage] = await db
      .insert(messages)
      .values({
        conversationId: currentConversation.id,
        userId: sessionResponse.user.id,
        role: ROLE_USER,
        content: message,
      })
      .returning();

    // Fetch conversation history for context
    const conversationHistory = await db.query.messages.findMany({
      where: eq(messages.conversationId, currentConversation.id),
      orderBy: [messages.createdAt],
      limit: 20, // Last 20 messages for context
    });

    // Normalize provider name
    const normalizedProvider = normalizeProviderName(provider);

    // Check if provider is configured
    if (!isProviderConfigured(normalizedProvider)) {
      throw new ValidationError(`AI provider '${provider}' is not configured`, {
        provider: normalizedProvider,
        configured: 'Provider is not configured'
      });
    }

    // Get the AI model
    const aiModel = getProviderModel(normalizedProvider, model);

    if (!aiModel) {
      throw new ValidationError(`Failed to get model for provider '${provider}'`, {
        provider: normalizedProvider,
        model
      });
    }

    // Generate AI response with conversation context
    let aiResponseText: string;
    let tokenCount = 0;

    try {
      const result = await generateText({
        model: aiModel,
        messages: conversationHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        temperature: 0.7,
        maxTokens: 2000,
      });

      aiResponseText = result.text;
      tokenCount = result.usage?.totalTokens || aiResponseText.length;

      console.log(`Generated AI response using ${normalizedProvider}:`, {
        provider: normalizedProvider,
        model: model || 'default',
        tokens: tokenCount
      });
    } catch (aiError: any) {
      console.error('AI generation error:', aiError);
      throw new ExternalServiceError(
        `Failed to generate AI response: ${aiError.message}`,
        normalizedProvider
      );
    }

    // Store AI response
    const [aiMessage] = await db
      .insert(messages)
      .values({
        conversationId: currentConversation.id,
        userId: sessionResponse.user.id,
        role: ROLE_ASSISTANT,
        content: aiResponseText,
        tokenCount,
      })
      .returning();

    return NextResponse.json({
      response: aiResponseText,
      conversationId: currentConversation.id,
      messageId: aiMessage.id,
      provider: normalizedProvider,
      model: model || 'default',
      tokensUsed: tokenCount,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return handleApiError(error);
  }
}

// GET endpoint to fetch conversation history
export async function GET(request: NextRequest) {
  try {
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    if (conversationId) {
      // Get specific conversation with messages
      const conversation = await db.query.conversations.findFirst({
        where: and(
          eq(conversations.id, conversationId),
          eq(conversations.userId, sessionResponse.user.id)
        ),
        with: {
          messages: {
            orderBy: [messages.createdAt],
          },
        },
      });

      if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
      }

      return NextResponse.json(conversation);
    } else {
      // Get all conversations for the user
      const userConversations = await db.query.conversations.findMany({
        where: eq(conversations.userId, sessionResponse.user.id),
        orderBy: [desc(conversations.lastMessageAt)],
        with: {
          messages: {
            limit: 1,
            orderBy: [desc(messages.createdAt)],
          },
        },
      });

      return NextResponse.json(userConversations);
    }
  } catch (error: any) {
    console.error('Chat GET error:', error);
    return handleApiError(error);
  }
}
