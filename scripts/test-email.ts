/**
 * Test Email Configuration
 * Run this to test if your Resend API key is working correctly
 *
 * Usage:
 *   npx tsx scripts/test-email.ts your-email@example.com
 */

import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testEmail(recipientEmail: string) {
  console.log('\n🧪 Testing Email Configuration');
  console.log('=====================================\n');

  // Check if API key is loaded
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('❌ RESEND_API_KEY not found in .env.local');
    console.log('\nMake sure .env.local contains:');
    console.log('RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx\n');
    process.exit(1);
  }

  console.log('✅ RESEND_API_KEY found:', apiKey.substring(0, 10) + '...');
  console.log('📧 Recipient:', recipientEmail);
  console.log('📤 Sender:', process.env.EMAIL_FROM || 'onboarding@resend.dev');
  console.log('\n📨 Attempting to send test email...\n');

  try {
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: recipientEmail,
      subject: 'Test Email from Your App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">🎉 Email Configuration Test</h1>
          <p style="color: #666; line-height: 1.6;">
            If you're seeing this email, your Resend configuration is working correctly!
          </p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Configuration Details:</h3>
            <ul style="color: #666;">
              <li><strong>API Key:</strong> ${apiKey.substring(0, 15)}...</li>
              <li><strong>From:</strong> ${process.env.EMAIL_FROM || 'onboarding@resend.dev'}</li>
              <li><strong>To:</strong> ${recipientEmail}</li>
            </ul>
          </div>
          <p style="color: #666;">
            <strong>Next steps:</strong>
          </p>
          <ol style="color: #666; line-height: 1.8;">
            <li>Verify your domain in Resend (optional, for custom sender)</li>
            <li>Test the password reset flow</li>
            <li>Update EMAIL_FROM if using custom domain</li>
          </ol>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 14px;">
            This is a test email sent from your development environment.
          </p>
        </div>
      `
    });

    console.log('✅ SUCCESS! Email sent successfully');
    console.log('\n📬 Email Details:');
    if (result.data) {
      console.log('   Message ID:', result.data.id);
    }
    console.log('   Response:', JSON.stringify(result, null, 2));
    console.log('\n✅ Check your inbox at:', recipientEmail);
    console.log('   (Check spam folder if not in inbox)\n');

  } catch (error: any) {
    console.error('\n❌ FAILED to send email\n');
    console.error('Error:', error.message);

    if (error.message?.includes('Invalid API key')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Check if your API key is correct in .env.local');
      console.log('   2. Get a new API key from: https://resend.com/api-keys');
      console.log('   3. Make sure the key starts with "re_"');
    } else if (error.message?.includes('not verified')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   1. You can only send from onboarding@resend.dev with free tier');
      console.log('   2. Or verify your custom domain at: https://resend.com/domains');
      console.log('   3. Update EMAIL_FROM in .env.local after verification');
    } else if (error.message?.includes('rate limit')) {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Free tier: 100 emails per day');
      console.log('   - Wait a bit or upgrade your plan');
    }

    console.log('\nFull error details:', error);
    process.exit(1);
  }
}

// Get recipient email from command line args
const recipientEmail = process.argv[2];

if (!recipientEmail) {
  console.error('❌ Please provide a recipient email address\n');
  console.log('Usage:');
  console.log('  npx tsx scripts/test-email.ts your-email@example.com\n');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(recipientEmail)) {
  console.error('❌ Invalid email address format\n');
  process.exit(1);
}

testEmail(recipientEmail);
