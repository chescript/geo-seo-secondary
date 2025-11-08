import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { messageFeedback, messages } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import {
  handleApiError,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  DatabaseError
} from '@/lib/api-errors';

// POST /api/chat/feedback - Submit feedback for a message
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      throw new AuthenticationError('You must be logged in to submit feedback');
    }

    const { messageId, helpful, rating, feedback } = await request.json();

    if (!messageId) {
      throw new ValidationError('Message ID is required', { messageId: 'required' });
    }

    // Verify the message exists and belongs to the user
    const message = await db.query.messages.findFirst({
      where: and(
        eq(messages.id, messageId),
        eq(messages.userId, session.user.id)
      ),
    });

    if (!message) {
      throw new NotFoundError('Message not found or you do not have access to it');
    }

    // Create or update feedback
    const existingFeedback = await db.query.messageFeedback.findFirst({
      where: and(
        eq(messageFeedback.messageId, messageId),
        eq(messageFeedback.userId, session.user.id)
      ),
    });

    if (existingFeedback) {
      // Update existing feedback
      const [updated] = await db
        .update(messageFeedback)
        .set({
          rating: rating || (helpful === true ? 5 : helpful === false ? 1 : existingFeedback.rating),
          feedback: feedback || existingFeedback.feedback,
        })
        .where(eq(messageFeedback.id, existingFeedback.id))
        .returning();

      return NextResponse.json(updated);
    } else {
      // Create new feedback
      const [created] = await db
        .insert(messageFeedback)
        .values({
          messageId,
          userId: session.user.id,
          rating: rating || (helpful === true ? 5 : helpful === false ? 1 : null),
          feedback,
        })
        .returning();

      return NextResponse.json(created);
    }
  } catch (error) {
    return handleApiError(error, 'Failed to submit feedback');
  }
}