import { autumn } from 'autumn-js/next';
import { SUBSCRIPTION_TIERS, ERROR_MESSAGES } from '@/config/constants';

/**
 * Check if a user has an active Pro subscription
 * @param userId - The user's ID
 * @returns true if user has Pro subscription, false otherwise
 */
export async function hasProSubscription(userId: string): Promise<boolean> {
  try {
    const customer = await autumn.getCustomer(userId);

    if (!customer || !customer.products) {
      return false;
    }

    // Check if user has the Pro product attached
    const hasProProduct = customer.products.some(
      (product: any) => product.id === SUBSCRIPTION_TIERS.PRO
    );

    return hasProProduct;
  } catch (error) {
    console.error('[SUBSCRIPTION] Error checking subscription:', error);
    return false;
  }
}

/**
 * Check if a user has access to a paid feature
 * Throws an error if the user doesn't have access
 * @param userId - The user's ID
 * @param featureName - Optional feature name for specific error message
 * @throws Error if user doesn't have Pro subscription
 */
export async function requireProSubscription(
  userId: string,
  featureName?: 'chat' | 'brand-monitor'
): Promise<void> {
  const hasPro = await hasProSubscription(userId);

  if (!hasPro) {
    let errorMessage = ERROR_MESSAGES.SUBSCRIPTION_REQUIRED;

    if (featureName === 'chat') {
      errorMessage = ERROR_MESSAGES.SUBSCRIPTION_REQUIRED_CHAT;
    } else if (featureName === 'brand-monitor') {
      errorMessage = ERROR_MESSAGES.SUBSCRIPTION_REQUIRED_BRAND_MONITOR;
    }

    throw new Error(errorMessage);
  }
}

/**
 * Get the user's subscription tier
 * @param userId - The user's ID
 * @returns 'free' | 'pro'
 */
export async function getSubscriptionTier(userId: string): Promise<'free' | 'pro'> {
  const hasPro = await hasProSubscription(userId);
  return hasPro ? SUBSCRIPTION_TIERS.PRO : SUBSCRIPTION_TIERS.FREE;
}
