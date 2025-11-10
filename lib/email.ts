import { Resend } from 'resend';

// Initialize Resend - you'll need to add RESEND_API_KEY to your .env.local
console.log('📧 [EMAIL CONFIG] Initializing Resend...');
console.log('📧 [EMAIL CONFIG] RESEND_API_KEY:', process.env.RESEND_API_KEY ? `✅ Set (${process.env.RESEND_API_KEY.substring(0, 10)}...)` : '❌ Missing');
console.log('📧 [EMAIL CONFIG] EMAIL_FROM:', process.env.EMAIL_FROM || 'Default: onboarding@resend.dev');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendEmail = async ({
  to,
  subject,
  text,
  html
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  console.log('\n📧 [EMAIL] ========================================');
  console.log('📧 [EMAIL] Attempting to send email');
  console.log('📧 [EMAIL] To:', to);
  console.log('📧 [EMAIL] Subject:', subject);
  console.log('📧 [EMAIL] Has API Key:', !!process.env.RESEND_API_KEY);
  console.log('📧 [EMAIL] Resend Instance:', !!resend);

  // In development without API key, just log to console
  if (!process.env.RESEND_API_KEY || !resend) {
    console.log('⚠️  [EMAIL] No API key configured - logging instead of sending');
    console.log('📧 [EMAIL] Content:', html || text);
    console.log('📧 [EMAIL] ========================================\n');
    return { id: 'dev-email' };
  }

  try {
    const fromAddress = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    console.log('📧 [EMAIL] From:', fromAddress);
    console.log('📧 [EMAIL] Sending via Resend API...');

    const data = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      text: text || html || '',
      html: html || text || '',
    });

    console.log('✅ [EMAIL] Email sent successfully!');
    if (data.data) {
      console.log('📧 [EMAIL] Message ID:', data.data.id);
    }
    console.log('📧 [EMAIL] Full response:', JSON.stringify(data, null, 2));
    console.log('📧 [EMAIL] ========================================\n');
    return data;
  } catch (error: any) {
    console.error('❌ [EMAIL] Failed to send email');
    console.error('❌ [EMAIL] Error:', error);
    console.error('❌ [EMAIL] Error message:', error?.message);
    console.error('❌ [EMAIL] Error response:', error?.response?.data);
    console.log('📧 [EMAIL] ========================================\n');
    throw error;
  }
};