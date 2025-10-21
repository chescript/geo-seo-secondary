/**
 * Temporary script to manually add credits to test users via Autumn API
 * Run with: npx tsx scripts/add-test-credits.ts <userId>
 */

import { Autumn } from 'autumn-js';

const userId = process.argv[2];

if (!userId) {
  console.error('Usage: npx tsx scripts/add-test-credits.ts <userId>');
  process.exit(1);
}

async function addTestCredits() {
  try {
    const autumn = new Autumn({
      secretKey: process.env.AUTUMN_SECRET_KEY!,
    });

    console.log(`Adding 500 test credits to user: ${userId}`);

    // Try to use track method instead
    const result = await autumn.track({
      customer_id: userId,
      event_name: 'test_credits_added',
      value: 500,
    });

    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

addTestCredits();
