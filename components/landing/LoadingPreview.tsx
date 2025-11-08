'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Image from 'next/image';

export function LoadingPreview() {
  // Skeleton shimmer animation
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  const pulse = {
    animate: {
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div className="w-full max-w-[920px] mx-auto px-4">
          {/* Analysis Results Dashboard matching Figma */}
          <div className="bg-white border-[#f1f1f1] border-[0.617px] border-solid relative rounded-[4.933px] w-full max-w-[888px] mx-auto overflow-clip">
            <div className="overflow-clip relative rounded-[inherit] size-full">
              <div className="md:px-[135.67px] px-6 md:py-[70.3px] py-10 flex flex-col md:gap-[82.63px] gap-12">
                {/* Header Section */}
                <div className="content-stretch flex flex-col gap-[3.7px] items-start">
                  {/* Title with URL Badge */}
                  <div className="relative flex items-center">
                    <p className="font-['Geist',sans-serif] font-medium leading-[1.4] not-italic overflow-ellipsis overflow-hidden text-[#111111] text-[19.733px] text-nowrap tracking-[-0.1973px]">
                      <span>Analyzing     </span>
                    </p>
                    {/* URL Badge - Loading State */}
                    <div className="bg-[#111111] border-[0.617px] border-solid border-white h-[31px] ml-[16px] rounded-[7.4px] relative">
                      <div className="box-border content-stretch flex h-[31px] items-center justify-between overflow-clip px-[6.167px] py-[8.017px] relative rounded-[inherit]">
                        <div className="flex items-center gap-[6px]">
                          <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[3.083px]" />
                          <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[3.083px]" />
                        </div>
                        <motion.div
                          {...pulse}
                          className="h-3 bg-white opacity-30 rounded px-12"
                        />
                        <Search className="size-[14.8px] text-white opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#111111] text-[9.867px] text-nowrap w-[min-content]">
                    <p className="[white-space-collapse:collapse] leading-[1.3] overflow-ellipsis overflow-hidden">
                      Analyzing your website...
                    </p>
                  </div>
                </div>

                {/* Main Content Container */}
                <div className="content-stretch flex flex-col gap-[19.733px] items-start w-full md:w-[616.667px] mx-auto">
                  {/* Score Cards - Skeleton */}
                  <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex gap-[14.8px] items-center p-[12.333px] relative rounded-[7.4px] shrink-0 w-full">
                    <Image
                      alt=""
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E"
                      width={1}
                      height={1}
                    />

                    {/* Overall Score Skeleton */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[8.633px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">Overall Score</p>
                        </div>
                      </div>
                      <motion.div
                        {...pulse}
                        className="h-5 bg-gray-200 rounded w-16"
                      />
                    </div>

                    {/* Divider */}
                    <div className="flex flex-row items-center self-stretch">
                      <div
                        className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]"
                        style={{ '--transform-inner-width': '0', '--transform-inner-height': '0' } as React.CSSProperties}
                      >
                        <div className="flex-none h-full rotate-[90deg]">
                          <div className="h-full relative w-[30.867px]">
                            <div className="absolute bottom-0 left-0 right-0 top-[-0.62px]">
                              <svg className="block max-w-none size-full" viewBox="0 0 31 1" fill="none">
                                <line x1="0" y1="0.5" x2="31" y2="0.5" stroke="#f1f1f1" strokeWidth="0.617" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEO Score Skeleton */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[8.633px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">SEO Score</p>
                        </div>
                      </div>
                      <motion.div
                        {...pulse}
                        className="h-5 bg-gray-200 rounded w-16"
                      />
                    </div>

                    {/* Divider */}
                    <div className="flex flex-row items-center self-stretch">
                      <div
                        className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]"
                        style={{ '--transform-inner-width': '0', '--transform-inner-height': '0' } as React.CSSProperties}
                      >
                        <div className="flex-none h-full rotate-[90deg]">
                          <div className="h-full relative w-[30.867px]">
                            <div className="absolute bottom-0 left-0 right-0 top-[-0.62px]">
                              <svg className="block max-w-none size-full" viewBox="0 0 31 1" fill="none">
                                <line x1="0" y1="0.5" x2="31" y2="0.5" stroke="#f1f1f1" strokeWidth="0.617" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Quality Skeleton */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[8.633px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">Content Quality</p>
                        </div>
                      </div>
                      <motion.div
                        {...pulse}
                        className="h-5 bg-gray-200 rounded w-16"
                      />
                    </div>

                    <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                  </div>

                  {/* First Row of Check Cards - Skeleton */}
                  <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[9.867px] relative shrink-0 w-full">
                    {[1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-center justify-center pb-[2.467px] pt-[14.8px] px-[12.333px] relative rounded-[7.4px]"
                      >
                        <Image
                          alt=""
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full"
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E"
                          width={1}
                          height={1}
                        />

                        {/* Label skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-3 bg-gray-200 rounded w-20"
                        />

                        {/* Title skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-4 bg-gray-300 rounded w-24"
                        />

                        {/* Details skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-2 bg-gray-200 rounded w-full"
                        />

                        {/* Button skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-6 bg-gray-200 rounded w-[143.067px]"
                        />

                        <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                      </div>
                    ))}
                  </div>

                  {/* Second Row of Check Cards - Skeleton */}
                  <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[9.867px] relative shrink-0 w-full">
                    {[5, 6, 7, 8].map((index) => (
                      <div
                        key={index}
                        className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-center justify-center pb-[2.467px] pt-[14.8px] px-[12.333px] relative rounded-[7.4px]"
                      >
                        <Image
                          alt=""
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full"
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E"
                          width={1}
                          height={1}
                        />

                        {/* Label skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-3 bg-gray-200 rounded w-20"
                        />

                        {/* Title skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-4 bg-gray-300 rounded w-24"
                        />

                        {/* Details skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-2 bg-gray-200 rounded w-full"
                        />

                        {/* Button skeleton */}
                        <motion.div
                          {...pulse}
                          className="h-6 bg-gray-200 rounded w-[143.067px]"
                        />

                        <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                      </div>
                    ))}
                  </div>

                  {/* Key Recommendations - Skeleton */}
                  <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-start justify-center px-[12.333px] py-[14.8px] relative rounded-[7.4px] shrink-0 w-full">
                    <Image
                      alt=""
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full"
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E"
                      width={1}
                      height={1}
                    />

                    <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] text-[11.1px] w-full">
                      <p className="leading-[1.4]">Key Recommendations</p>
                    </div>

                    <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                      {[1, 2, 3, 4].map((index) => (
                        <motion.div
                          key={index}
                          {...pulse}
                          className="h-3 bg-gray-200 rounded w-full"
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
