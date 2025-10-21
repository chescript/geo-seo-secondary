import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { Autumn } from 'autumn-js';
import { AuthenticationError, ExternalServiceError, handleApiError } from '@/lib/api-errors';
import { FEATURE_ID_MESSAGES } from '@/config/constants';
import { checkCredits } from '@/lib/credits-utils';

const autumn = new Autumn({
  secretKey: process.env.AUTUMN_SECRET_KEY!,
});

export async function GET(request: NextRequest) {
  try {
    // Get the session
    const sessionResponse = await auth.api.getSession({
      headers: request.headers,
    });

    if (!sessionResponse?.user) {
      throw new AuthenticationError('Please log in to view your credits');
    }

    // Check feature access for messages (uses dev bypass if enabled)
    const access = await checkCredits(
      autumn,
      sessionResponse.user.id,
      FEATURE_ID_MESSAGES
    );

    return NextResponse.json({
      allowed: access.data?.allowed || false,
      balance: access.data?.balance || 0,
    });
  } catch (error) {
    return handleApiError(error);
  }
}