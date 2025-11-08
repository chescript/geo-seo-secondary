'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { ArrowLeft } from 'lucide-react';
import { AuthShowcase } from '@/components/auth/AuthShowcase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔐 [FORGOT PASSWORD] Requesting password reset...');
      console.log('🔐 [FORGOT PASSWORD] Email:', email);
      const resetUrl = `${window.location.origin}/reset-password`;
      console.log('🔐 [FORGOT PASSWORD] Redirect URL:', resetUrl);

      await authClient.forgetPassword({
        email,
        redirectTo: resetUrl,
      });

      console.log('✅ [FORGOT PASSWORD] Reset email sent successfully');
      setSuccess(true);
    } catch (err: any) {
      console.error('❌ [FORGOT PASSWORD] Error:', err);
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const showcaseStats = [
      { value: '60s', label: 'Avg. delivery', subtext: 'Email link ETA' },
      { value: '99.9%', label: 'Uptime', subtext: 'Auth systems' },
      { value: '0', label: 'Cost', subtext: 'Reset is free' },
    ];

    return (
      <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <AuthShowcase
            eyebrow="PASSWORD RESET"
            title="Check your inbox."
            description="We emailed a secure link to reset your password."
            stats={showcaseStats}
            checklist={["Use the latest link", "Expires after use", "Contact support if needed"]}
            footerNote="Links are valid for a short time for your security."
          />

          <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
            <div className="w-full max-w-[440px]">
              <div className="text-center rounded-[28px] border border-[#e9e3d4] bg-white/95 p-10 shadow-[0_45px_120px_rgba(11,11,11,0.15)]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-neueBit text-[40px] leading-[0.92]">Email sent</h2>
                <p className="mt-3 text-[15px] text-[#4a473f]">We sent a reset link to</p>
                <p className="mt-1 text-[16px] font-medium">{email}</p>
                <p className="mt-4 text-sm text-[#6a665d]">Didn’t receive it? Check spam or try again.</p>

                <div className="mt-8">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] px-6 py-2 text-sm font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)]"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AuthShowcase
          eyebrow="PASSWORD RESET"
          title="We&apos;ve got you."
          description="Enter your email to receive a secure reset link."
          stats={[{ value: '60s', label: 'Avg. delivery' }, { value: '24/7', label: 'Support' }, { value: '1x', label: 'One-time link' }]}
          checklist={["Use your work email", "Check spam if missing", "Links expire after use"]}
          footerNote="For security, reset links are short&apos;lived."
        />

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
          <div className="w-full max-w-[440px] space-y-8">
            <div>
              <div className="lg:hidden mb-8 flex justify-center">
                <div className="relative h-12 w-12">
                  <Image
                    src="/logos/Logo.png"
                  alt="Geoscanner"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-center font-neueBit text-[44px] leading-[0.9] text-[#111111]">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-[#4a473f]">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-apercu uppercase tracking-[0.3em] text-[#8b867c] mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#928d82] focus:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] py-3 text-[15px] font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)] disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </div>

            <div className="text-center">
              <Link href="/login" className="text-sm text-[#111111] underline decoration-dotted underline-offset-4 inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Link>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
