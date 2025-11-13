'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BrandMonitorRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard (which now contains the brand analysis)
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-landing-background flex items-center justify-center text-landing-base">
      <div className="text-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
