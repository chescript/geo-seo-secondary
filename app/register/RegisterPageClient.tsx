'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signUp } from '@/lib/auth-client';
import { AuthShowcase } from '@/components/auth/AuthShowcase';

export default function RegisterPageClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExistingAccountOptions, setShowExistingAccountOptions] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowExistingAccountOptions(false);

    console.log('📝 [REGISTER] Starting registration process...');
    console.log('📝 [REGISTER] Name:', name);
    console.log('📝 [REGISTER] Email:', email);
    console.log('📝 [REGISTER] Password length:', password.length);

    try {
      console.log('📝 [REGISTER] Calling signUp.email()...');

      const response = await signUp.email({
        name,
        email,
        password,
      });

      console.log('📝 [REGISTER] Response received:', response);

      // Only redirect if signup was successful
      if (!response.error) {
        console.log('✅ [REGISTER] Registration successful!');
        console.log('📝 [REGISTER] User:', response.data?.user);
        // Note: Better Auth signUp response returns user and token, no session object
        console.log('📝 [REGISTER] Free tier will be auto-attached via Better-Auth hook');

        // Wait a moment for everything to be set
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log('📝 [REGISTER] Redirecting to homepage...');
        // Force a hard navigation to ensure cookies are sent
        window.location.href = '/';
      } else {
        console.error('❌ [REGISTER] Error in response:', response.error);
        throw response.error;
      }
    } catch (err: any) {
      console.error('❌ [REGISTER] Exception caught:', err);
      console.error('❌ [REGISTER] Error status:', err.status);
      console.error('❌ [REGISTER] Error message:', err.message);
      console.error('❌ [REGISTER] Error stack:', err.stack);

      const errorMessage = err.message || 'Failed to register';
      setError(errorMessage);

      // Check if the error is about existing account
      // Better Auth returns 422 status for existing accounts
      if (err.status === 422 ||
          errorMessage.toLowerCase().includes('already exists') ||
          errorMessage.toLowerCase().includes('already registered') ||
          errorMessage.toLowerCase().includes('existing email') ||
          errorMessage.toLowerCase().includes('email already') ||
          errorMessage.toLowerCase().includes('user already exists')) {
        console.log('ℹ️ [REGISTER] Detected existing account error');
        setShowExistingAccountOptions(true);
      }
      setLoading(false);
    }
  };

  const showcaseStats = [
    { value: '14m', label: 'To first scan', subtext: 'Avg. onboarding' },
    { value: '6', label: 'AI surfaces ready', subtext: 'Day-one coverage' },
    { value: '35%', label: 'Metadata lift', subtext: 'After 2 weeks' },
  ];

  const registerChecklist = [
    'Workspace-wide visibility',
    'Automated crawl insights',
    'Auditable change history',
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AuthShowcase
          eyebrow="CREATE YOUR WORKSPACE"
          title="Launch your AI-ready workspace."
          description="Spin up Geoscanner to benchmark every landing page before AI assistants do."
          stats={showcaseStats}
          checklist={registerChecklist}
          footerNote="Provisioning takes under 60 seconds."
        />

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
          <div className="w-full max-w-[480px] space-y-10">
            <div className="space-y-3 text-center lg:hidden">
              <div className="relative mx-auto h-12 w-12">
                <Image
                  src="/logos/Logo.png"
                  alt="Geoscanner"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <p className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867c]">
                AI Readiness Platform
              </p>
              <h1 className="font-neueBit text-[40px] leading-[0.92] text-[#111111]">Create your workspace.</h1>
            </div>

            <div className="rounded-[32px] border border-[#ece8dd] bg-white/90 p-8 sm:p-10 shadow-[0_45px_120px_rgba(11,11,11,0.15)] backdrop-blur">
              <div className="space-y-5 text-center">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e4ded0] bg-[#fdfbf5] px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#7f7a71]">
                  Launch Workspace
                  <span className="h-2 w-2 rounded-full bg-[#111111]" />
                </span>
                <h2 className="font-neueBit text-[44px] leading-[0.9] text-[#111111]">Create your account.</h2>
                <p className="text-[15px] leading-relaxed text-[#6a665d]">
                  Benchmark your AI presence, ship fixes faster, and keep your landing-page aesthetic consistent everywhere.
                </p>
                <p className="text-sm text-[#4a473f]">
                  Already analyzing with us?{' '}
                  <Link
                    href="/login"
                    className="font-medium text-[#111111] underline decoration-[#c7c0b2]/70 underline-offset-4 transition-colors hover:decoration-[#111111]"
                  >
                    Sign in instead
                  </Link>
                </p>
              </div>

              <form className="mt-10 space-y-6" onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867c]"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#928d82] focus:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867c]"
                    >
                      Work email
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
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867c]"
                    >
                      Password
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
                      placeholder="Choose a strong password"
                    />
                    <p className="text-xs text-[#7c776d]">Must be at least 8 characters long.</p>
                  </div>
                </div>

                {error && (
                  <div
                    className={`rounded-2xl border px-5 py-4 text-sm shadow-sm ${
                      showExistingAccountOptions ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#f5d1cf] bg-[#fff7f6] text-[#712727]'
                    }`}
                  >
                    <p className="font-medium">{error}</p>
                    {showExistingAccountOptions && (
                      <div className="mt-4 space-y-3 text-white/90">
                        <p>It looks like you already have an account with this email address.</p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Link
                            href={`/login?email=${encodeURIComponent(email)}`}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-sm font-medium text-[#111111] transition-all hover:-translate-y-0.5"
                          >
                            Sign in instead
                          </Link>
                          <Link
                            href="/forgot-password"
                            className="inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white underline decoration-dotted underline-offset-4"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <label htmlFor="terms" className="flex items-start gap-3 text-sm text-[#4a473f]">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-[#d5cec1] text-[#111111] accent-[#111111] focus:ring-0"
                    />
                    <span>
                      I agree to the{' '}
                      <Link href="#" className="underline decoration-[#c7c0b2]/70 underline-offset-4 hover:decoration-[#111111]">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="underline decoration-[#c7c0b2]/70 underline-offset-4 hover:decoration-[#111111]">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative flex w-full items-center justify-center gap-2 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] py-3 text-[15px] font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)] disabled:translate-y-0 disabled:opacity-60"
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
