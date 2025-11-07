'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function PixelArtCTA() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-[1024px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-[69px]"
        >
          {/* Text content */}
          <div className="flex flex-col items-center gap-[32px] text-center">
            <h2 className="font-mondwest text-[44px] leading-[1.2] text-[#111111] capitalize w-[498px]">
              Want More? Track Your Brand Across AI Models
            </h2>
            <p className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase w-[588px]">
              Unlock FireGEO Monitor - Analyze how ChatGPT, Claude, Perplexity and other AI models rank your brand against competitors in real-time.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-[16px]">
            <Link
              href="/register"
              className="h-[44px] px-[20px] py-[14px] rounded-full bg-gradient-to-b from-[#4c4c4c] to-[#292929] border-t border-[#7a7a7a] text-white font-geist font-medium text-[16px] tracking-[-0.48px] hover:from-[#5c5c5c] hover:to-[#3a3a3a] transition-all inline-flex items-center justify-center whitespace-nowrap"
            >
              Start free trial
            </Link>
            <Link
              href="/brand-monitor"
              className="h-[44px] px-[20px] py-[12px] rounded-full bg-white border border-[#e1e1e1] text-[#111111] font-geist font-medium text-[16px] tracking-[-0.48px] hover:bg-gray-50 transition-all inline-flex items-center justify-center whitespace-nowrap"
            >
              View brand monitor
            </Link>
          </div>
        </motion.div>

        {/* Pixel Art Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative w-full h-[480px] mt-[100px]"
        >
          {/* Large image on the left */}
          <div className="absolute left-0 w-[1024px] h-[480px] rounded-[12px] overflow-hidden shadow-xl">
            <Image
              src="/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9121.png"
              alt="Pixel art landscape"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* Smaller image on the right (overlapping) */}
          <div className="absolute left-[521px] w-[503px] h-[480px] rounded-[12px] overflow-hidden shadow-2xl">
            <Image
              src="/figma/councile/1545-6418/img7Mjyf160WMHighlyDetailedPixelArtLandscapeInBrightDayl2Ac18033Fde24De883763Dbd91D1Cb9122.png"
              alt="Pixel art scene"
              fill
              sizes="(max-width: 503px) 100vw, 503px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
