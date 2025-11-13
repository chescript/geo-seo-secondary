'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { EXAMPLE_URL, MOCK_CHECKS, MOCK_RECOMMENDATIONS } from './shared-constants';

export const CompactAnalysisPreview = memo(function CompactAnalysisPreview() {

  return (
    <section className="relative overflow-hidden py-24 bg-white">
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-neueBit text-[48px] text-[#111111] mb-4">
            See Your AI-Readiness Score
          </h2>
          <p className="font-apercu text-[16px] text-[#818181] tracking-[-0.48px] uppercase">
            Get detailed insights on how AI models will read your website
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[920px] mx-auto px-4"
        >
          <div className="pointer-events-none absolute inset-x-8 top-6 mx-auto h-[420px] rounded-[40px] bg-gradient-to-b from-white/60 to-transparent blur-[80px]" />
          {/* Analysis Results Dashboard matching Figma */}
          <div className="relative w-full max-w-[888px] mx-auto overflow-clip rounded-[24px] border border-white/80 bg-[radial-gradient(circle_at_top,_#ffffff,_#fefbf4_70%,_#f5eee2_110%)] shadow-[0_45px_140px_rgba(15,15,15,0.12)]">
            <div className="overflow-clip relative rounded-[inherit] size-full">
              <div className="md:px-[135.67px] px-6 md:py-[70.3px] py-10 flex flex-col md:gap-[82.63px] gap-12">
                {/* Header Section */}
                <div className="content-stretch flex flex-col gap-[3.7px] items-start">
                  {/* Title with URL Badge */}
                  <div className="relative flex items-center">
                    <p className="font-['Geist',sans-serif] font-medium leading-[1.4] not-italic overflow-ellipsis overflow-hidden text-[#111111] text-[19.733px] text-nowrap tracking-[-0.1973px]">
                      <span>Analysis Results for     </span>
                    </p>
                    {/* URL Badge */}
                    <div className="bg-[#111111] border-[0.617px] border-solid border-white h-[31px] ml-[16px] rounded-[7.4px] relative">
                      <div className="box-border content-stretch flex h-[31px] items-center justify-between overflow-clip px-[6.167px] py-[8.017px] relative rounded-[inherit]">
                        <div className="flex items-center gap-[6px]">
                          <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[3.083px]" />
                          <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[3.083px]" />
                        </div>
                        <span className="font-['Geist',sans-serif] font-medium text-white text-[12px] px-[8px]">{EXAMPLE_URL}</span>
                        <Search className="size-[14.8px] text-white opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#111111] text-[9.867px] text-nowrap w-[min-content]">
                    <p className="[white-space-collapse:collapse] leading-[1.3] overflow-ellipsis overflow-hidden">Here&apos;s how AI-ready your website is</p>
                  </div>
                </div>

                {/* Main Content Container */}
                <div className="content-stretch flex flex-col gap-[19.733px] items-start w-full md:w-[616.667px] mx-auto">
                  {/* Score Cards */}
                  <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex gap-[14.8px] items-center p-[12.333px] relative rounded-[7.4px] shrink-0 w-full">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                    {/* Overall Score */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[11px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">Overall Score</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                          <p className="leading-[1.4]">
                            <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic text-[18px]">90</span>
                            <span className="text-[18px]"> </span>
                            <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] text-[10px]">/100</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                        <div className="flex-none h-full rotate-[90deg]">
                          <div className="h-full relative w-[30.867px]">
                            <div className="absolute bottom-0 left-0 right-0 top-[-0.62px]">
                              <svg className="block max-w-none size-full" viewBox="0 0 31 1" fill="none">
                                <line x1="0" y1="0.5" x2="31" y2="0.5" stroke="#f1f1f1" strokeWidth="0.617"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEO Score */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[11px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">SEO Score</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                          <p className="leading-[1.4]">
                            <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic text-[18px]">95</span>
                            <span className="text-[18px]"> </span>
                            <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] text-[10px]">/100</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex flex-row items-center self-stretch">
                      <div className="flex h-full items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties}>
                        <div className="flex-none h-full rotate-[90deg]">
                          <div className="h-full relative w-[30.867px]">
                            <div className="absolute bottom-0 left-0 right-0 top-[-0.62px]">
                              <svg className="block max-w-none size-full" viewBox="0 0 31 1" fill="none">
                                <line x1="0" y1="0.5" x2="31" y2="0.5" stroke="#f1f1f1" strokeWidth="0.617"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Quality */}
                    <div className="basis-0 content-stretch flex flex-col gap-[9.867px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                      <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] text-[11px] text-nowrap">
                          <p className="leading-[1.3] whitespace-pre">Content Quality</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                        <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                          <p className="leading-[1.4]">
                            <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic text-[18px]">73</span>
                            <span className="text-[18px]"> </span>
                            <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] text-[10px]">/100</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                  </div>

                  {/* First Row of Check Cards */}
                  <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[9.867px] relative shrink-0 w-full">
                    {MOCK_CHECKS.slice(0, 4).map((check, index) => (
                      <motion.div
                        key={check.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-center justify-center pb-[2.467px] pt-[14.8px] px-[12.333px] relative rounded-[7.4px]"
                      >
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                        {/* Label at top */}
                        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] text-[11px] w-[min-content]">
                          <p className="leading-[1.3]">{check.label}</p>
                        </div>

                        {/* Title and Icon */}
                        <div className="content-stretch flex gap-[7.4px] items-center relative shrink-0 w-full">
                          <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] text-[14px] text-nowrap">
                            <p className="leading-[1.4] whitespace-pre">{check.title}</p>
                          </div>
                          <div className="relative shrink-0 size-[11.1px]">
                            <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="12" fill="currentColor"/>
                              <path d="M17 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] text-[11px] w-[min-content]">
                          <p className="leading-[1.3]">{check.details}</p>
                        </div>

                        {/* View Details Button */}
                        <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex items-center justify-between px-[7.4px] py-[4.933px] relative rounded-[4.933px] shrink-0 w-[143.067px]">
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4.933px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />
                          <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[11px] text-black text-nowrap">
                            <p className="leading-[1.3] whitespace-pre">VIEW DETAILS</p>
                          </div>
                          <div className="relative shrink-0 size-[9.867px]">
                            <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                        </div>

                        <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Second Row of Check Cards */}
                  <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[9.867px] relative shrink-0 w-full">
                    {MOCK_CHECKS.slice(4, 8).map((check, index) => (
                      <motion.div
                        key={check.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index + 4) * 0.05 }}
                        className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-center justify-center pb-[2.467px] pt-[14.8px] px-[12.333px] relative rounded-[7.4px]"
                      >
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                        {/* Label at top */}
                        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] text-[11px] w-[min-content]">
                          <p className="leading-[1.3]">{check.label}</p>
                        </div>

                        {/* Title and Icon */}
                        <div className="content-stretch flex gap-[7.4px] items-center relative shrink-0 w-full">
                          <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] text-[14px] text-nowrap">
                            <p className="leading-[1.4] whitespace-pre">{check.title}</p>
                          </div>
                          <div className="relative shrink-0 size-[11.1px]">
                            <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="12" fill="currentColor"/>
                              <path d="M17 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] text-[11px] w-[min-content]">
                          <p className="leading-[1.3]">{check.details}</p>
                        </div>

                        {/* View Details Button */}
                        <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex items-center justify-between px-[7.4px] py-[4.933px] relative rounded-[4.933px] shrink-0 w-[143.067px]">
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4.933px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />
                          <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[11px] text-black text-nowrap">
                            <p className="leading-[1.3] whitespace-pre">VIEW DETAILS</p>
                          </div>
                          <div className="relative shrink-0 size-[9.867px]">
                            <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                        </div>

                        <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Key Recommendations */}
                  <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-start justify-center px-[12.333px] py-[14.8px] relative rounded-[7.4px] shrink-0 w-full">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                    <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] text-[11.1px] w-full">
                      <p className="leading-[1.4]">Key Recommendations</p>
                    </div>

                    <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                      {MOCK_RECOMMENDATIONS.map((rec, index) => (
                        <div key={index} className="content-stretch flex gap-[7.4px] items-center relative shrink-0 w-full">
                          <div className="relative shrink-0 size-[11.1px]">
                            {index % 2 === 0 ? (
                              <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                                <path d="M17 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                              </svg>
                            ) : (
                              <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="12" fill="currentColor"/>
                                <path d="M16.24 7.76a1 1 0 0 0-1.41 0L12 10.59 9.17 7.76a1 1 0 0 0-1.41 1.41L10.59 12l-2.83 2.83a1 1 0 1 0 1.41 1.41L12 13.41l2.83 2.83a1 1 0 0 0 1.41-1.41L13.41 12l2.83-2.83a1 1 0 0 0 0-1.41z" fill="white"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[#111111] text-[11px] text-nowrap">
                            <p className="leading-[1.3] whitespace-pre">{rec}</p>
                          </div>
                        </div>
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
    </section>
  );
});
