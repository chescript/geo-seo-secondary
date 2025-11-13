import { db } from '@/lib/db';
import { usageTracking } from '@/lib/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
import { USAGE_LIMITS, ERROR_MESSAGES } from '@/config/constants';
import { getSubscriptionTier } from './subscription-utils';

export type FeatureType = 'brand_analysis' | 'ai_chat';

/**
 * Get the start and end dates for the current monthly period
 */
function getCurrentPeriod(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

/**
 * Get the usage limit for a specific feature based on user's subscription tier
 */
export async function getUsageLimit(
  userId: string,
  featureType: FeatureType
): Promise<number> {
  const tier = await getSubscriptionTier(userId);

  if (featureType === 'brand_analysis') {
    return tier === 'pro'
      ? USAGE_LIMITS.PRO_TIER_ANALYSES_PER_MONTH
      : USAGE_LIMITS.FREE_TIER_ANALYSES_PER_MONTH;
  }

  // For future features like ai_chat
  return tier === 'pro' ? Infinity : 0;
}

/**
 * Get or create usage tracking record for the current period
 */
async function getOrCreateUsageRecord(
  userId: string,
  featureType: FeatureType
): Promise<{ id: string; usageCount: number }> {
  const { start, end } = getCurrentPeriod();

  try {
    // Try to find existing record for current period
    const existing = await db
      .select()
      .from(usageTracking)
      .where(
        and(
          eq(usageTracking.userId, userId),
          eq(usageTracking.featureType, featureType),
          eq(usageTracking.periodStart, start),
          eq(usageTracking.periodEnd, end)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return {
        id: existing[0].id,
        usageCount: existing[0].usageCount,
      };
    }

    // Create new record for current period
    const newRecord = await db
      .insert(usageTracking)
      .values({
        userId,
        featureType,
        usageCount: 0,
        periodStart: start,
        periodEnd: end,
      })
      .returning();

    return {
      id: newRecord[0].id,
      usageCount: 0,
    };
  } catch (error) {
    console.error('[USAGE_TRACKING] Error getting/creating usage record:', error);
    console.error('[USAGE_TRACKING] Full error details:', JSON.stringify(error, null, 2));

    // Provide more specific error message
    const errorMessage = error instanceof Error
      ? `Database error: ${error.message}`
      : ERROR_MESSAGES.USAGE_TRACKING_FAILED;

    throw new Error(errorMessage);
  }
}

/**
 * Get the current monthly usage for a feature
 */
export async function getMonthlyUsage(
  userId: string,
  featureType: FeatureType
): Promise<number> {
  try {
    const record = await getOrCreateUsageRecord(userId, featureType);
    return record.usageCount;
  } catch (error) {
    console.error('[USAGE_TRACKING] Error getting monthly usage:', error);
    return 0;
  }
}

/**
 * Get remaining usage for the current month
 */
export async function getRemainingUsage(
  userId: string,
  featureType: FeatureType
): Promise<number> {
  const limit = await getUsageLimit(userId, featureType);
  const used = await getMonthlyUsage(userId, featureType);

  if (limit === Infinity) {
    return Infinity;
  }

  return Math.max(0, limit - used);
}

/**
 * Check if user has exceeded their monthly limit
 */
export async function hasExceededLimit(
  userId: string,
  featureType: FeatureType
): Promise<boolean> {
  const remaining = await getRemainingUsage(userId, featureType);

  if (remaining === Infinity) {
    return false;
  }

  return remaining <= 0;
}

/**
 * Track usage - increment the counter for a feature
 * Throws an error if the limit would be exceeded
 */
export async function trackUsage(
  userId: string,
  featureType: FeatureType
): Promise<void> {
  try {
    // Check if limit would be exceeded
    const exceeded = await hasExceededLimit(userId, featureType);
    if (exceeded) {
      throw new Error(ERROR_MESSAGES.MONTHLY_LIMIT_EXCEEDED);
    }

    // Get or create the usage record
    const record = await getOrCreateUsageRecord(userId, featureType);

    // Increment the usage count
    await db
      .update(usageTracking)
      .set({
        usageCount: record.usageCount + 1,
        updatedAt: new Date(),
      })
      .where(eq(usageTracking.id, record.id));

    console.log(`[USAGE_TRACKING] Tracked usage for user ${userId}, feature ${featureType}, count: ${record.usageCount + 1}`);
  } catch (error) {
    console.error('[USAGE_TRACKING] Error tracking usage:', error);
    throw error;
  }
}

/**
 * Check if user can perform an action (has remaining quota)
 */
export async function canPerformAction(
  userId: string,
  featureType: FeatureType
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const limit = await getUsageLimit(userId, featureType);
  const remaining = await getRemainingUsage(userId, featureType);

  return {
    allowed: remaining > 0 || remaining === Infinity,
    remaining: remaining === Infinity ? -1 : remaining,
    limit: limit === Infinity ? -1 : limit,
  };
}

/**
 * Get usage statistics for a user
 */
export async function getUsageStats(
  userId: string,
  featureType: FeatureType
): Promise<{
  used: number;
  limit: number;
  remaining: number;
  percentage: number;
}> {
  const used = await getMonthlyUsage(userId, featureType);
  const limit = await getUsageLimit(userId, featureType);
  const remaining = await getRemainingUsage(userId, featureType);

  const percentage = limit === Infinity ? 0 : (used / limit) * 100;

  return {
    used,
    limit: limit === Infinity ? -1 : limit,
    remaining: remaining === Infinity ? -1 : remaining,
    percentage: Math.min(100, Math.round(percentage)),
  };
}
