import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUsageStats } from '@/lib/usage-tracking';
import { AuthenticationError, handleApiError } from '@/lib/api-errors';

/**
 * GET /api/usage/stats
 * Returns the user's current usage statistics for brand analyses
 */
export async function GET(request: NextRequest) {
  try {
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      throw new AuthenticationError('Please log in to view usage statistics');
    }

    const stats = await getUsageStats(sessionResponse.user.id, 'brand_analysis');

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Usage stats API error:', error);
    return handleApiError(error);
  }
}
