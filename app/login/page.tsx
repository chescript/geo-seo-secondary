'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from '@/lib/auth-client';
import { AuthShowcase } from '@/components/auth/AuthShowcase';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('reset') === 'success') {
      setSuccess('Password reset successfully. You can now login with your new password.');
    }
    
    // Pre-fill email if passed from registration page
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 [LOGIN] Starting login process...');
    console.log('🔐 [LOGIN] Email:', email);
    console.log('🔐 [LOGIN] Password length:', password.length);

    try {
      console.log('🔐 [LOGIN] Calling signIn.email()...');

      const response = await signIn.email({
        email,
        password,
      });

      console.log('🔐 [LOGIN] Response received:', response);

      if (response.error) {
        console.error('❌ [LOGIN] Error:', response.error);
        setError(response.error.message || 'Failed to login');
        setLoading(false);
        return;
      }

      console.log('✅ [LOGIN] Login successful!');
      console.log('🔐 [LOGIN] User:', response.data?.user);

      // Use router for client-side navigation after successful login
      const returnUrl = searchParams.get('from') || '/dashboard';
      console.log('🔐 [LOGIN] Redirecting to:', returnUrl);
      window.location.replace(returnUrl);
    } catch (err: any) {
      console.error('❌ [LOGIN] Exception caught:', err);
      console.error('❌ [LOGIN] Error message:', err.message);
      console.error('❌ [LOGIN] Error stack:', err.stack);
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  const showcaseStats = [
    { value: '28,400', label: 'Daily Crawls', subtext: 'LLM + Search' },
    { value: '42', label: 'Signals Tracked', subtext: 'Schema • Entities' },
    { value: '4.8x', label: 'Faster Fixes', subtext: 'vs manual QA' },
  ];

  const loginChecklist = [
    'Realtime entity summaries',
    'AI ranking deltas',
    'Metadata quality guardrails',
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#111111]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AuthShowcase
          eyebrow="AI READINESS DASHBOARD"
          title="Stay discoverable inside AI assistants."
          description="Log in to compare how ChatGPT, Claude, and Perplexity describe your brand."
          stats={showcaseStats}
          checklist={loginChecklist}
          footerNote="Fresh crawl snapshots ship every morning."
        />

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
          <div className="w-full max-w-[440px] space-y-10">
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
              <h1 className="font-neueBit text-[40px] leading-[0.92] text-[#111111]">Stay in sync with how AI presents you.</h1>
            </div>

            <div className="rounded-[32px] border border-[#ece8dd] bg-white/90 p-8 sm:p-10 shadow-[0_45px_120px_rgba(11,11,11,0.15)] backdrop-blur">
              <div className="space-y-5 text-center">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e4ded0] bg-[#fdfbf5] px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#7f7a71]">
                  Account Access
                  <span className="h-2 w-2 rounded-full bg-[#111111]" />
                </span>
                <h2 className="font-neueBit text-[44px] leading-[0.9] text-[#111111]">Welcome back.</h2>
                <p className="text-[15px] leading-relaxed text-[#6a665d]">
                  Use your workspace credentials to keep your AI search profile healthy.
                </p>
                <p className="text-sm text-[#4a473f]">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="font-medium text-[#111111] underline decoration-[#c7c0b2]/70 underline-offset-4 transition-colors hover:decoration-[#111111]"
                  >
                    Create one for free
                  </Link>
                </p>
              </div>

              <form className="mt-10 space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8b867c]"
                    >
                      Email
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
                      placeholder="you@example.com"
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
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-[#111111] placeholder:text-[#928d82] focus:border-[#111111] focus:outline-none focus:ring-2 focus:ring-[#111111]/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#4a473f]">
                  <label htmlFor="remember-me" className="inline-flex cursor-pointer items-center gap-3">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-[#d5cec1] text-[#111111] accent-[#111111] focus:ring-0"
                    />
                    Keep me signed in
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-[#111111] underline decoration-dotted underline-offset-4 transition-colors hover:decoration-solid"
                  >
                    Forgot password?
                  </Link>
                </div>

                {success && (
                  <div className="rounded-2xl border border-[#c7f1d4] bg-[#f3fff6] px-4 py-3 text-sm text-[#1f5130] shadow-sm">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-[#f5d1cf] bg-[#fff7f6] px-4 py-3 text-sm text-[#712727] shadow-sm">
                    {error}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] py-3 text-[15px] font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_35px_80px_rgba(0,0,0,0.4)] disabled:translate-y-0 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-10 rounded-[24px] border border-[#ece8dd] bg-[#fdfbf5] p-6">
                <p className="text-center font-apercu text-[11px] uppercase tracking-[0.4em] text-[#8f8a81]">
                  Or continue with
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => signIn.social({ provider: 'google', callbackURL: searchParams.get('from') || '/dashboard' })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e1dbcf] bg-white px-4 py-3 text-sm font-medium text-[#111111] shadow-[0_12px_35px_rgba(15,15,15,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,15,15,0.12)]"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => signIn.social({ provider: 'github', callbackURL: searchParams.get('from') || '/dashboard' })}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e1dbcf] bg-white px-4 py-3 text-sm font-medium text-[#111111] shadow-[0_12px_35px_rgba(15,15,15,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,15,15,0.12)]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
