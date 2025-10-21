/**
 * Credit utilities for handling credit checks and tracking
 * Supports development mode bypass via DEV_BYPASS_CREDITS environment variable
 */

import { Autumn } from 'autumn-js';

const DEV_MODE = process.env.DEV_BYPASS_CREDITS === 'true';
const DEV_CREDITS = 9999; // Unlimited credits in dev mode

/**
 * Check if user has credits available for a feature
 * In dev mode, always returns success with 9999 credits
 */
export async function checkCredits(
  autumn: Autumn,
  customerId: string,
  featureId: string
): Promise<{ data: { allowed: boolean; balance: number } | null; error: any }> {
  if (DEV_MODE) {
    console.log(`[DEV MODE] Bypassing credit check for user ${customerId} - returning ${DEV_CREDITS} credits`);
    return {
      data: {
        allowed: true,
        balance: DEV_CREDITS,
      },
      error: null,
    };
  }

  // Production mode - use real Autumn API
  return autumn.check({
    customer_id: customerId,
    feature_id: featureId,
  });
}

/**
 * Track credit usage for a feature
 * In dev mode, always returns success without actually tracking
 */
export async function trackCredits(
  autumn: Autumn,
  customerId: string,
  featureId: string,
  count: number
): Promise<{ data: any; error: any }> {
  if (DEV_MODE) {
    console.log(`[DEV MODE] Bypassing credit tracking for user ${customerId} - would have deducted ${count} credits`);
    return {
      data: {
        success: true,
        message: 'Dev mode - credits not tracked',
      },
      error: null,
    };
  }

  // Production mode - use real Autumn API
  return autumn.track({
    customer_id: customerId,
    feature_id: featureId,
    count,
  });
}

/**
 * Check if development mode credit bypass is enabled
 */
export function isDevCreditsBypass(): boolean {
  return DEV_MODE;
}

/**
 * Get the current credit balance for display purposes
 * In dev mode, always returns 9999
 */
export function getDevCreditBalance(): number {
  return DEV_MODE ? DEV_CREDITS : 0;
}
