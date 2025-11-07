'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthShowcase } from '@/components/auth/AuthShowcase';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    console.log('🔐 [RESET PASSWORD] Component mounted');
    console.log('🔐 [RESET PASSWORD] Token:', token ? '✅ Present' : '❌ Missing');
    console.log('🔐 [RESET PASSWORD] Full search params:', Object.fromEntries(searchParams));

    if (!token) {
      setError('Invalid or missing reset token');
      console.error('❌ [RESET PASSWORD] No token found in URL');
    }
  }, [token, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('🔐 [RESET PASSWORD] Form submitted');
    console.log('🔐 [RESET PASSWORD] Password length:', password.length);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      console.error('❌ [RESET PASSWORD] Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      console.error('❌ [RESET PASSWORD] Password too short');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 [RESET PASSWORD] Calling authClient.resetPassword...');
      await authClient.resetPassword({
        newPassword: password,
        token: token!,
      });

      console.log('✅ [RESET PASSWORD] Password reset successful!');
      // Redirect to login with success message
      router.push('/login?reset=success');
    } catch (err: any) {
      console.error('❌ [RESET PASSWORD] Error:', err);
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    const showcaseStats = [
      { value: 'Expired', label: 'Link status', subtext: 'Request new' },
      { value: '1hr', label: 'Valid for', subtext: 'After sending' },
      { value: 'Free', label: 'Support', subtext: '24/7 available' },
    ];

    return (
      <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <AuthShowcase
            eyebrow="INVALID LINK"
            title="Link has expired."
            description="This password reset link is invalid or has expired. Request a new one below."
            stats={showcaseStats}
            checklist={["Links expire after 1 hour", "Request a fresh link", "Check email spam folder"]}
            footerNote="Reset links are time-limited for your security."
          />

          <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
            <div className="w-full max-w-[440px]">
              <div className="text-center rounded-[28px] border border-[#e9e3d4] bg-white/95 p-10 shadow-[0_45px_120px_rgba(11,11,11,0.15)]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="font-neueBit text-[40px] leading-[0.92]">Invalid Link</h2>
                <p className="mt-3 text-[15px] text-[#4a473f]">
                  This password reset link is invalid or has expired.
                </p>
                <p className="mt-2 text-sm text-[#6a665d]">Please request a new reset link to continue.</p>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/forgot-password"
                    className="block w-full rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] px-6 py-3 text-[15px] font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)]"
                  >
                    Request new reset link
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 text-sm text-[#111111] underline decoration-dotted underline-offset-4"
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

  const showcaseStats = [
    { value: 'Secure', label: 'Encryption', subtext: 'Bank-grade' },
    { value: '8+', label: 'Min chars', subtext: 'Required' },
    { value: '1x', label: 'Use', subtext: 'One-time link' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AuthShowcase
          eyebrow="PASSWORD RESET"
          title="Almost there!"
          description="Create a new password for your account. Make sure it's strong and unique."
          stats={showcaseStats}
          checklist={["At least 8 characters long", "Mix of letters and numbers", "Unique to this account"]}
          footerNote="Choose a password you don't use elsewhere."
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
                Enter your new password below
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-apercu uppercase tracking-[0.3em] text-[#8b867c] mb-2">
                    New password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#928d82] focus:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-apercu uppercase tracking-[0.3em] text-[#8b867c] mb-2">
                    Confirm new password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#928d82] focus:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                    placeholder="Confirm new password"
                  />
                </div>
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
                  {loading ? 'Resetting…' : 'Reset password'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
