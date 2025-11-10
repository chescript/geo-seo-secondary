'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

import TransparentPricingBadge from './TransparentPricingBadge';

const imgLine3 = "https://www.figma.com/api/mcp/asset/0d656245-20e0-4764-a019-db73b873e88c";
const imgFrame = "https://www.figma.com/api/mcp/asset/f080a36c-ea67-4fd9-a5dc-9ae9ea9958a6";
const imgLine4 = "https://www.figma.com/api/mcp/asset/bc142cd5-6dcf-4bd6-a6d7-f372682e0011";

export const PricingSection = memo(function PricingSection() {
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
    <section className="relative isolate py-24 bg-white">
      <div className="relative max-w-[1128px] mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mb-14 w-full lg:w-[540px] mx-auto"
        >
          {/* Badge */}
          <TransparentPricingBadge />

          {/* Title */}
          <h2 className="font-neueBit text-4xl lg:text-[52px] leading-[0.9] text-[#111111] capitalize text-center w-full">
            Simple, transparent pricing
          </h2>

          {/* Subtitle */}
          <p className="font-apercu text-[16px] leading-[1.8] text-[#818181] tracking-[-0.48px] uppercase text-center w-full lg:w-[416px]">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="content-stretch flex flex-col lg:flex-row items-center justify-center relative shrink-0 w-full" data-node-id="1545:12146">
            <div className="bg-neutral-50 border border-[#efefef] border-solid relative self-stretch shrink-0 w-full sm:w-[386px]" data-node-id="1545:12147">
                <div className="box-border content-stretch flex flex-col h-full items-start justify-between overflow-clip p-[32px] relative rounded-[inherit] w-[386px]">
                    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-node-id="1545:12148">
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1545:12149">
                            <p className="capitalize font-geist font-semibold leading-[1.2] relative shrink-0 text-[#111111] text-[16px] tracking-[-0.48px]" data-node-id="1545:12150">
                                Free Plan
                            </p>
                            <p className="font-apercu leading-[1.4] not-italic relative shrink-0 text-[#818181] text-[14px] text-center tracking-[-0.42px] uppercase" data-node-id="1545:12151">
                                For all your messaging needs
                            </p>
                        </div>
                        <div className="h-0 relative shrink-0 w-full" data-node-id="1545:12152">
                            <div className="absolute inset-[-0.5px_-0.16%]">
                                <img alt="" className="block max-w-none size-full" src={imgLine3} />
                            </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#111111]" data-node-id="1545:12153">
                            <p className="capitalize font-neueBit font-bold leading-[0.9] not-italic relative shrink-0 text-[44px]" data-node-id="1545:12154">
                                Free
                            </p>
                            <p className="font-geist font-normal leading-[1.2] opacity-50 relative shrink-0 text-[14px] text-center tracking-[-0.42px]" data-node-id="1545:12155">
                                *No credit card required
                            </p>
                        </div>
                        <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-node-id="1545:12156">
                            {freePlanFeatures.map((feature, index) => (
                                <div key={index} className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[251px]" data-node-id="1545:12157">
                                    <div className="relative shrink-0 size-[18px]" data-name="Frame" data-node-id="1545:12158">
                                        <img alt="" className="block max-w-none size-full" src={imgFrame} />
                                    </div>
                                    <p className="font-apercu leading-[1.4] not-italic relative shrink-0 text-[#818181] text-[14px] text-center tracking-[-0.42px] uppercase" data-node-id="1545:12160">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button variant="secondary" className="w-full mt-8">
                        Get Started
                    </Button>
                </div>
            </div>
            <div className="bg-neutral-50 border-[#efefef] border-b border-l-0 border-r border-solid border-t w-full lg:flex-[1_0_0] min-h-px min-w-px relative shrink-0 mt-8 lg:mt-0" data-node-id="1545:12183">
                <div className="box-border content-stretch flex flex-col gap-[32px] items-start overflow-clip p-[32px] relative rounded-[inherit] w-full">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1545:12184">
                        <p className="capitalize font-geist font-semibold leading-[1.2] relative shrink-0 text-[#111111] text-[16px] tracking-[-0.48px]" data-node-id="1545:12185">
                            FireGEO Brand Monitor
                        </p>
                        <p className="font-apercu leading-[1.4] not-italic relative shrink-0 text-[#818181] text-[14px] text-center tracking-[-0.42px] uppercase" data-node-id="1545:12186">
                            Perfect for trying out our service
                        </p>
                    </div>
                    <div className="h-0 relative shrink-0 w-full" data-node-id="1545:12187">
                        <div className="absolute inset-[-0.5px_-0.07%]">
                            <img alt="" className="block max-w-none size-full" src={imgLine4} />
                        </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[#111111]" data-node-id="1545:12188">
                        <p className="capitalize font-neueBit font-bold leading-[0.9] not-italic relative shrink-0 text-[44px]" data-node-id="1545:12189">
                            $10/m
                        </p>
                        <p className="font-geist font-normal leading-[1.2] opacity-50 relative shrink-0 text-[14px] text-center tracking-[-0.42px]" data-node-id="1545:12190">
                            *Billed monthly
                        </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[490px]" data-node-id="1545:12191">
                        {premiumFeatures.map((feature, index) => (
                            <div key={index} className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="1545:12204">
                                <div className="relative shrink-0 size-[18px]" data-name="Frame" data-node-id="1545:12205">
                                    <img alt="" className="block max-w-none size-full" src={imgFrame} />
                                </div>
                                <p className="flex-[1_0_0] font-apercu leading-[1.4] min-h-px min-w-px not-italic relative shrink-0 text-[#818181] text-[14px] tracking-[-0.42px] uppercase whitespace-pre-wrap" data-node-id="1545:12207">
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Button asChild variant="primary" className="w-full">
                        <Link href="/register">
                            Get started
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
});