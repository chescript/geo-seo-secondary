'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function WaitlistForm() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('success');
    setUrl('');

    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  const features = [
    'Free forever',
    'No signup required',
    'Instant results',
  ];

  const FeatureIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8.25" stroke="#111111" strokeWidth="1.5" />
      <path
        d="M5.5 9.1L7.35 11L12.5 5.9"
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="bg-[#f1f1f1] rounded-full h-[44px] flex items-center px-4 py-3 w-[253px]">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website"
            disabled={status === 'loading'}
            className="flex-1 bg-transparent outline-none font-geist text-[16px] text-[#111111] tracking-[-0.48px] placeholder:opacity-60 disabled:opacity-50"
          />
        </div>
        <Button
          type="submit"
          disabled={!url || status === 'loading'}
          variant="primary"
          className="px-5"
        >
          {status === 'loading' ? 'Analyzing...' : 'Analyze Now'}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-[6px]">
              <FeatureIcon />
              <span className="font-neueBit text-[18px] leading-[1.4] text-[#111111] tracking-[-0.54px]">{feature}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
