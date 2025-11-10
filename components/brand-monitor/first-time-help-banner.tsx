'use client';

import React, { useState, useEffect } from 'react';
import { X, Lightbulb, ChevronRight } from 'lucide-react';

interface FirstTimeHelpBannerProps {
  storageKey?: string;
}

export function FirstTimeHelpBanner({ storageKey = 'brand-monitor-help-dismissed' }: FirstTimeHelpBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const isDismissed = localStorage.getItem(storageKey);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto mb-6 animate-fade-in">
      <div className="rounded-[22px] border-2 border-[#f9e7b8] bg-gradient-to-r from-[#fffbf0] to-[#fff9e6] p-5 shadow-[0_12px_35px_rgba(249,231,184,0.3)] relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f9e7b8]/20 to-transparent rounded-full blur-3xl" />

        <div className="relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-1 -right-1 p-1.5 rounded-full hover:bg-[#f9e7b8]/40 transition-colors"
            aria-label="Dismiss help banner"
          >
            <X className="w-4 h-4 text-[#8b7a4a]" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f9e7b8] to-[#f0d78c] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-[#6b5a2e]" />
            </div>

            <div className="flex-1 pr-6">
              <h3 className="font-neueBit text-[20px] leading-[1.1] text-[#6b5a2e] mb-2">
                First time here? Let&apos;s get you started
              </h3>
              <p className="text-[#8b7a4a] font-geist text-[14px] leading-relaxed mb-4">
                Track how AI models like ChatGPT, Claude, and Perplexity rank your brand compared to competitors. Follow the steps above to run your first analysis.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#8b7a4a] mt-0.5 flex-shrink-0" />
                  <p className="text-[#8b7a4a] font-geist text-[13px]">
                    <span className="font-semibold text-[#6b5a2e]">Step 1:</span> Enter your website URL
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#8b7a4a] mt-0.5 flex-shrink-0" />
                  <p className="text-[#8b7a4a] font-geist text-[13px]">
                    <span className="font-semibold text-[#6b5a2e]">Step 2:</span> Add competitors to track
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#8b7a4a] mt-0.5 flex-shrink-0" />
                  <p className="text-[#8b7a4a] font-geist text-[13px]">
                    <span className="font-semibold text-[#6b5a2e]">Step 3:</span> Choose prompts to test
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-[#8b7a4a] mt-0.5 flex-shrink-0" />
                  <p className="text-[#8b7a4a] font-geist text-[13px]">
                    <span className="font-semibold text-[#6b5a2e]">Step 4:</span> View results & insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
