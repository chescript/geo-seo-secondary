'use client';

import Link from 'next/link';
import Image from 'next/image';

import leftImg from '@/public/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9121.png';
import rightImg from '@/public/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9122.png';

export function WantMoreSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Card container (from scratch per Figma) */}
        <div className="relative rounded-[24px] overflow-hidden min-h-[380px] bg-gradient-to-br from-[#0066CC] via-[#0099DD] to-[#00CCAA]">
          {/* Left artwork */}
          <Image
            src={leftImg}
            alt=""
            fill
            priority
            sizes="(max-width: 1200px) 60vw, 720px"
            className="object-cover object-left opacity-70 scale-[1.06] -translate-y-1"
            style={{
              objectPosition: 'left 58%',
              maskImage: 'linear-gradient(to right, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 95%, transparent 100%)',
            }}
          />

          {/* Right artwork */}
          <div className="absolute inset-y-0 right-0 w-[38%]">
            <Image
              src={rightImg}
              alt=""
              fill
              priority
              sizes="(max-width: 1200px) 38vw, 456px"
              className="object-cover object-right opacity-70 scale-[1.05]"
              style={{
                objectPosition: 'right 42%',
                maskImage: 'linear-gradient(to left, black 95%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 95%, transparent 100%)',
              }}
            />
          </div>

          {/* Center seam */}
          <div className="absolute top-0 bottom-0" style={{ left: '64%' }}>
            <div className="w-[6px] h-full bg-[#007EC7] opacity-90" />
          </div>
          <div className="absolute top-0 bottom-0" style={{ left: 'calc(64% + 8px)' }}>
            <div className="w-[2px] h-full bg-white/50" />
          </div>

          {/* Wave overlay */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-soft-light"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 36c12 0 12-12 24-12s12 12 24 12 12-12 24-12 12 12 24 12v12c-12 0-12 12-24 12s-12-12-24-12-12 12-24 12S12 60 0 60V36z' fill='white'/%3E%3C/svg%3E\")",
              backgroundSize: '72px 72px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 grid grid-cols-12 gap-6 md:gap-8 p-8 md:p-12">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-neueBit font-semibold text-white tracking-tight leading-[1.1] text-[40px] md:text-[52px] max-w-[640px]">
                Want More? Track Your Brand Across AI Models
              </h2>
              <p className="font-apercu uppercase text-white/90 tracking-[-0.42px] mt-3 text-[12px] md:text-[14px] max-w-[640px]">
                Unlock FireGEO Monitor - Analyze how ChatGPT, Claude, Perplexity and other AI models rank your brand against competitors in real-time.
              </p>
            </div>
            {/* Empty placeholder for grid symmetry; buttons positioned absolutely near the seam */}
            <div className="col-span-12 md:col-span-5" />
          </div>

          {/* CTA group positioned per Figma near the seam */}
          <div
            className="absolute z-20 flex flex-col items-start gap-2"
            style={{ left: 'calc(64% + 20px)', top: '46%', transform: 'translateY(-50%)' }}
          >
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="h-[44px] px-5 rounded-full bg-white text-[#111] font-geist text-[16px] font-medium shadow-lg hover:bg-gray-100 transition"
              >
                Start free trial
              </Link>
              <Link
                href="/brand-monitor"
                className="h-[44px] px-4 rounded-full bg-white/25 text-white border border-white/50 backdrop-blur-[3px] text-[16px] font-geist font-medium hover:bg-white/35 transition"
              >
                View brand monitor
              </Link>
            </div>
            <p className="font-apercu uppercase text-white/85 tracking-[-0.36px] text-[10px] md:text-[12px] whitespace-pre">
              *FREE TIER INCLUDES 10 BRAND ANALYSES PER MONTH - NO CREDIT CARD REQUIRED
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}




