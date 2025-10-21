'use server';

import { Autumn } from 'autumn-js';

/**
 * Attaches the free product to a new user
 * Called automatically after user registration via Better-Auth hooks
 *
 * This function serves as a Better-Auth hook handler
 */
export async function attachFreeProduct(context: any) {
  try {
    const userId = context.returned?.user?.id;

    if (!userId) {
      console.log('[ATTACH_FREE_PRODUCT] No user ID found in context');
      return;
    }

    console.log(`🎉 [ATTACH_FREE_PRODUCT] New user signed up: ${userId}`);
    console.log(`[ATTACH_FREE_PRODUCT] Attaching free product to user: ${userId}`);

    const autumnSecretKey = process.env.AUTUMN_SECRET_KEY;

    if (!autumnSecretKey) {
      console.error('[ATTACH_FREE_PRODUCT] AUTUMN_SECRET_KEY not found in environment');
      // Don't throw - allow signup to succeed even if product attachment fails
      return;
    }

    // Initialize Autumn client
    const autumn = new Autumn({
      secretKey: autumnSecretKey,
    });

    // Attach the free product to the user
    const result = await autumn.attach({
      customer_id: userId,
      product_id: 'free', // ID from autumn-products.ts
    });

    if (result.error) {
      console.error('[ATTACH_FREE_PRODUCT] Error attaching free product:', result.error);
      // Don't throw - allow signup to succeed
      return;
    }

    console.log(`✅ [ATTACH_FREE_PRODUCT] Successfully attached free product to user: ${userId}`);
    console.log('[ATTACH_FREE_PRODUCT] Result:', result.data);
  } catch (error: any) {
    console.error('[ATTACH_FREE_PRODUCT] Exception:', error);
    // Don't throw - allow signup to succeed even if product attachment fails
  }
}
