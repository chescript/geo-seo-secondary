'use server';

import { Autumn } from 'autumn-js';

/**
 * Gives free credits to a newly registered user
 * In dev mode (DEV_BYPASS_CREDITS=true), returns success immediately
 * In production mode, adds credits via Autumn API
 */
export async function giveFreeCredits(userId: string) {
  try {
    // Check if dev bypass is enabled
    if (process.env.DEV_BYPASS_CREDITS === 'true') {
      console.log(`✅ [GIVE_FREE_CREDITS] Dev mode - skipping credit assignment for user: ${userId}`);
      return {
        success: true,
        data: { message: 'Dev mode - unlimited credits available' },
      };
    }

    console.log(`🎉 [GIVE_FREE_CREDITS] Adding 500 free credits to user: ${userId}`);

    const autumnSecretKey = process.env.AUTUMN_SECRET_KEY;

    if (!autumnSecretKey) {
      console.error('[GIVE_FREE_CREDITS] AUTUMN_SECRET_KEY not found');
      return { success: false, error: 'Configuration error' };
    }

    // Initialize Autumn client
    const autumn = new Autumn({
      secretKey: autumnSecretKey,
    });

    // Directly add 500 credits using the usage() method
    const result = await autumn.usage({
      customer_id: userId,
      feature_id: 'messages',
      value: 500,
    });

    if (result.error) {
      console.error('[GIVE_FREE_CREDITS] Error:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`✅ [GIVE_FREE_CREDITS] Success! Added 500 free credits`);
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('[GIVE_FREE_CREDITS] Exception:', error);
    return { success: false, error: error.message };
  }
}
