import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSubscriptionTier } from '@/lib/subscription-utils';
import { AuthenticationError, handleApiError } from '@/lib/api-errors';

/**
 * GET /api/subscription
 * Returns the user's current subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      throw new AuthenticationError('Please log in to view subscription status');
    }

    const subscriptionTier = await getSubscriptionTier(sessionResponse.user.id);

    return NextResponse.json({
      tier: subscriptionTier,
      hasPro: subscriptionTier === 'pro',
    });
  } catch (error: any) {
    console.error('Subscription API error:', error);
    return handleApiError(error);
  }
}
