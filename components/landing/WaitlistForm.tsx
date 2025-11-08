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
            {/* Pixel check icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0Z" fill="#111111"/>
              <path d="M7.5 11.5L5 9L6 8L7.5 9.5L11.5 5.5L12.5 6.5L7.5 11.5Z" fill="white"/>
            </svg>
            <span className="font-neueBit text-[18px] leading-[1.4] text-[#111111] tracking-[-0.54px]">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
