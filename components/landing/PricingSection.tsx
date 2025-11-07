'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function PricingSection() {
  const freePlanFeatures = [
    '10 analyses per month',
    'Community support',
    'Basic features',
    'Quick AI-readiness check',
    'SEO & metadata score',
    'Basic LLM compatibility check'
  ];

  const premiumFeatures = [
    '100 analyses per month',
    'Premium support',
    'Priority access',
    'Real-time brand tracking across all AI models',
    'Competitor analysis and ranking',
    'Actionable insights & recommendations',
    'Email alerts for visibility changes'
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1128px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mb-14 w-[540px] mx-auto"
        >
          {/* Badge */}
          <div className="bg-[#f4f4f4] border border-white rounded-full h-7 px-3 py-3 flex items-center justify-center gap-3">
            {/* Sparkles icon */}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L7.5 5.5L13 6L7.5 6.5L7 12L6.5 6.5L1 6L6.5 5.5L7 0Z" fill="#818181"/>
            </svg>
            <span className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase">
              TRANSPARENT PRICING
            </span>
          </div>

          {/* Title */}
          <h2 className="font-neueBit text-[52px] leading-[0.9] text-[#111111] capitalize text-center w-full">
            Simple, transparent pricing
          </h2>

          {/* Subtitle */}
          <p className="font-apercu text-[16px] leading-[1.8] text-[#818181] tracking-[-0.48px] uppercase text-center w-[416px]">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="flex items-start justify-center w-full">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-50 border border-[#efefef] w-[386px] p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8 w-full">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h3 className="font-geist font-semibold text-[16px] leading-[1.2] text-[#111111] tracking-[-0.48px] capitalize">
                  Free Plan
                </h3>
                <p className="font-apercu text-[14px] leading-[1.4] text-[#818181] tracking-[-0.42px] uppercase">
                  For all your messaging needs
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-200"></div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <p className="font-neueBit text-[44px] leading-[0.9] text-[#111111] capitalize">
                  Free
                </p>
                <p className="font-geist text-[14px] leading-[1.2] text-[#111111] opacity-50 tracking-[-0.42px]">
                  *No credit card required
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-5 w-full">
                {freePlanFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {/* Check icon */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect width="18" height="18" rx="3" fill="#111111" fillOpacity="0.1"/>
                      <path d="M7.5 11.5L5 9L6 8L7.5 9.5L11.5 5.5L12.5 6.5L7.5 11.5Z" fill="#111111"/>
                    </svg>
                    <span className="font-apercu text-[14px] leading-[1.4] text-[#818181] tracking-[-0.42px] uppercase">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button className="w-full h-[44px] bg-white border border-[#e1e1e1] rounded-full mt-8 flex items-center justify-center">
              <span className="font-geist font-medium text-[16px] text-[#111111] tracking-[-0.48px]">
                Get Started
              </span>
            </button>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-50 border-[#efefef] border-r border-t border-b flex-1 p-8 relative"
          >
            {/* Popular badge */}
            <div className="absolute -top-3 right-8 bg-[#111111] text-white px-3 py-1 rounded-full text-xs font-bold">
              POPULAR
            </div>

            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h3 className="font-geist font-semibold text-[16px] leading-[1.2] text-[#111111] tracking-[-0.48px] capitalize">
                  FireGEO Brand Monitor
                </h3>
                <p className="font-apercu text-[14px] leading-[1.4] text-[#818181] tracking-[-0.42px] uppercase">
                  Perfect for trying out our service
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gray-200"></div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <p className="font-neueBit text-[44px] leading-[0.9] text-[#111111] capitalize">
                  $10/m
                </p>
                <p className="font-geist text-[14px] leading-[1.2] text-[#111111] opacity-50 tracking-[-0.42px]">
                  *Billed monthly
                </p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-5 w-full">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {/* Check icon */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                      <rect width="18" height="18" rx="3" fill="#111111" fillOpacity="0.1"/>
                      <path d="M7.5 11.5L5 9L6 8L7.5 9.5L11.5 5.5L12.5 6.5L7.5 11.5Z" fill="#111111"/>
                    </svg>
                    <span className="font-apercu text-[14px] leading-[1.4] text-[#818181] tracking-[-0.42px] uppercase">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Link
                href="/register"
                className="w-full h-[44px] bg-gradient-to-b from-[#282828] to-[#0f0f0f] border-t border-[#7a7a7a] rounded-full flex items-center justify-center hover:from-[#333333] hover:to-[#1a1a1a] transition-all"
              >
                <span className="font-geist font-medium text-[16px] text-white tracking-[-0.48px]">
                  Get started
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

