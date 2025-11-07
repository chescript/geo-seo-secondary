'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const WantMoreSection = memo(function WantMoreSection() {
  return (
    <section className="py-24 bg-white overflow-visible pb-[200px]">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Card container matching Figma exactly */}
        <div className="relative rounded-[12px] overflow-hidden shadow-[0px_756px_212px_rgba(0,0,0,0),0px_484px_194px_rgba(0,0,0,0.01),0px_272px_163px_rgba(0,0,0,0.05),0px_121px_121px_rgba(0,0,0,0.09),0px_30px_67px_rgba(0,0,0,0.1)] mb-[100px]">
          <div className="relative h-[560px] w-full">
            {/* Background images */}
            <div className="absolute inset-0">
              {/* Left image - larger portion */}
              <div className="absolute left-0 top-0 w-[1116.67px] h-full">
                <Image
                  src="/images/def33a43a4ae0671dc6a317f72cf857fc64adc35.png"
                  alt="Brand monitoring background illustration"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 1117px"
                  className="object-cover"
                  quality={65}
                />
              </div>

              {/* Right image - overlapping */}
              <div className="absolute right-0 top-0 w-[580.09px] h-full">
                <Image
                  src="/images/image 1520.png"
                  alt="AI models analysis illustration"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover"
                  quality={65}
                />
              </div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-start justify-between h-full px-[56px] py-[32px]">
              {/* Text content */}
              <div className="flex flex-col gap-[179px]">
                <div className="flex flex-col gap-[32px]">
                  <h2 className="font-neueBit text-[52px] leading-[0.9] text-white capitalize w-[474px]">
                    Want More? Track Your Brand Across AI Models
                  </h2>
                  <p className="font-apercu text-[16px] leading-[1.8] text-white tracking-[-0.48px] uppercase w-[510px]">
                    Unlock FireGEO Monitor - Analyze how ChatGPT, Claude, Perplexity and other AI models rank your brand against competitors in real-time.
                  </p>
                </div>

                {/* Buttons and footer text */}
                <div className="flex flex-col gap-[16px]">
                  <div className="flex items-center gap-[16px]">
                    <Link
                      href="/register"
                      className="h-[44px] px-[20px] py-[14px] rounded-full bg-gradient-to-b from-[#282828] to-[#0f0f0f] border-t border-[#7a7a7a] text-white font-geist font-medium text-[16px] tracking-[-0.48px] hover:from-[#333333] hover:to-[#1a1a1a] transition-all inline-flex items-center justify-center whitespace-nowrap"
                    >
                      Start free trial
                    </Link>
                    <Link
                      href="/brand-monitor"
                      className="h-[44px] px-[16px] py-[12px] rounded-full bg-white border border-[#e1e1e1] text-[#111111] font-geist font-medium text-[16px] tracking-[-0.48px] hover:bg-gray-50 transition-all inline-flex items-center justify-center whitespace-nowrap"
                    >
                      View brand monitor
                    </Link>
                  </div>
                  <p className="font-apercu text-[12px] leading-[1.8] text-white tracking-[-0.36px] uppercase w-[405px]">
                    *Free tier includes 10 brand analyses per month *No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});