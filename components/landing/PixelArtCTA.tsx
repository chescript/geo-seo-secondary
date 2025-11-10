'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const PixelArtCTA = memo(function PixelArtCTA() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-[1024px] mx-auto px-4">
        {/* Pixel Art Images - at the top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full mb-[100px]"
        >
          <div className="grid grid-cols-1 grid-rows-1">
            {/* Large image on the left */}
            <div className="col-start-1 row-start-1 relative w-full rounded-[24px] shadow-[0px_756px_212px_rgba(0,0,0,0),0px_484px_194px_rgba(0,0,0,0.01),0px_272px_163px_rgba(0,0,0,0.05),0px_121px_121px_rgba(0,0,0,0.09),0px_30px_67px_rgba(0,0,0,0.1)] h-[300px] sm:h-[360px] md:h-[440px] lg:h-[480px]">
              <div className="relative h-full w-full rounded-[24px] overflow-hidden border border-white/40">
                <Image
                  src="/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9121.png"
                  alt="Pixel art landscape showing futuristic scene"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>

            {/* Smaller image on the right (overlapping) */}
            <div className="col-start-1 row-start-1 relative w-full rounded-[24px] shadow-[0px_756px_212px_rgba(0,0,0,0),0px_484px_194px_rgba(0,0,0,0.01),0px_272px_163px_rgba(0,0,0,0.05),0px_121px_121px_rgba(0,0,0,0.09),0px_30px_67px_rgba(0,0,0,0.1)] h-[260px] sm:h-[320px] md:h-[390px] lg:h-[480px] mt-6 lg:mt-0 lg:absolute lg:left-[521px] lg:w-[503px]">
              <div className="relative h-full w-full rounded-[24px] overflow-hidden border border-white/40">
                <Image
                  src="/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9122.png"
                  alt="Pixel art scene with vibrant colors"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 503px"
                  className="object-cover"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text content and CTA buttons - below images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-[69px]"
        >
          {/* Text content */}
          <div className="flex flex-col items-center gap-[32px] text-center">
            <h2 className="font-neueBit text-4xl md:text-[52px] leading-[0.9] text-[#111111] capitalize w-full md:w-[438px]">
              Want More? Track Your Brand Across AI Models
            </h2>
            <p className="font-apercu text-base leading-[1.8] text-[#818181] tracking-[-0.48px] uppercase w-full md:w-[486px]">
              Unlock Geoscanner Monitor - Analyze how ChatGPT, Claude, Perplexity and other AI models rank your brand against competitors in real-time.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-[16px]">
            <Button asChild variant="primary" className="w-full sm:w-auto">
              <Link href="/register">
                Start free trial
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/brand-monitor">
                View brand monitor
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
