'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

interface CheckResult {
  id: string;
  label: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  score: number;
  details: string;
  recommendation?: string;
}

interface AnalysisResultsDashboardProps {
  url: string;
  overallScore: number;
  seoScore: number;
  contentScore: number;
  checks: CheckResult[];
  recommendations: string[];
}

export function AnalysisResultsDashboard({
  url,
  overallScore,
  seoScore,
  contentScore,
  checks,
  recommendations
}: AnalysisResultsDashboardProps) {
  const hostname = new URL(url.includes('http') ? url : 'https://' + url).hostname;
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleCardClick = (cardId: string) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-[#f1f1f1] border-[0.617px] border-solid relative rounded-[4.933px] w-full max-w-[1200px] mx-auto overflow-clip"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="md:px-[135.67px] px-6 md:py-[70.3px] py-10 flex flex-col md:gap-[82.63px] gap-12">
          {/* Header Section */}
          <div className="content-stretch flex flex-col gap-[3.7px] items-start">
            {/* Title with URL Badge */}
            <div className="relative flex items-center flex-wrap gap-2">
              <p className="font-['Geist',sans-serif] font-medium leading-[1.4] not-italic overflow-ellipsis overflow-hidden text-[#111111] md:text-[26px] text-[22px] text-nowrap tracking-[-0.26px]">
                <span>Analysis Results for     </span>
              </p>
              {/* URL Badge */}
              <div className="bg-[#111111] border-[0.617px] border-solid border-white md:h-[44px] h-[38px] rounded-[10px] relative">
                <div className="box-border content-stretch flex md:h-[44px] h-[38px] items-center justify-between overflow-clip px-[12px] py-[10px] relative rounded-[inherit]">
                  <div className="flex items-center gap-[8px]">
                    <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[4px]" />
                    <div className="bg-white h-full opacity-[0.15] rounded-[19.733px] shrink-0 w-[4px]" />
                  </div>
                  <span className="font-['Geist',sans-serif] font-medium text-white md:text-[15px] text-[13px] px-[10px]">{hostname}</span>
                  <Search className="md:size-[18px] size-[16px] text-white opacity-60" />
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] min-w-full not-italic opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[#111111] md:text-[12px] text-[11px] text-nowrap w-[min-content]">
              <p className="[white-space-collapse:collapse] leading-[1.3] overflow-ellipsis overflow-hidden">Here&apos;s how AI-ready your website is</p>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="content-stretch flex flex-col gap-[19.733px] items-start w-full md:w-[800px] mx-auto">
            {/* Score Cards */}
            <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex gap-[18px] items-center md:p-[20px] p-[16px] relative rounded-[10px] shrink-0 w-full">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

              {/* Overall Score */}
              <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] md:text-[11px] text-[10px] text-nowrap">
                    <p className="leading-[1.3] whitespace-pre">Overall Score</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                    <p className="leading-[1.4]">
                      <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic md:text-[28px] text-[24px]">{overallScore}</span>
                      <span className="md:text-[28px] text-[24px]"> </span>
                      <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] md:text-[14px] text-[12px]">/100</span>
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
              <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] md:text-[11px] text-[10px] text-nowrap">
                    <p className="leading-[1.3] whitespace-pre">SEO Score</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                    <p className="leading-[1.4]">
                      <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic md:text-[28px] text-[24px]">{seoScore}</span>
                      <span className="md:text-[28px] text-[24px]"> </span>
                      <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] md:text-[14px] text-[12px]">/100</span>
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
              <div className="basis-0 content-stretch flex flex-col gap-[10px] grow items-start min-h-px min-w-px relative rounded-[9.867px] shrink-0">
                <div className="content-stretch flex gap-[3.7px] items-center relative shrink-0">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] justify-center leading-[0] not-italic opacity-50 relative shrink-0 text-[#111111] md:text-[11px] text-[10px] text-nowrap">
                    <p className="leading-[1.3] whitespace-pre">Content Quality</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-['Overused_Grotesk',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#111111] text-[0px] w-full">
                    <p className="leading-[1.4]">
                      <span className="font-['Overused_Grotesk',sans-serif] font-medium not-italic md:text-[28px] text-[24px]">{contentScore}</span>
                      <span className="md:text-[28px] text-[24px]"> </span>
                      <span className="font-['Overused_Grotesk',sans-serif] font-normal not-italic text-[#888888] md:text-[14px] text-[12px]">/100</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
            </div>

            {/* First Row of Check Cards */}
            <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[14px] relative shrink-0 w-full">
              {checks.slice(0, 4).map((check, index) => {
                const isExpanded = expandedCardId === check.id;
                return (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[16px] items-center justify-center md:pb-[8px] pb-[6px] md:pt-[18px] pt-[14px] md:px-[14px] px-[12px] relative rounded-[10px] cursor-pointer hover:border-gray-300 transition-colors"
                    onClick={() => handleCardClick(check.id)}
                  >
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                    {/* Label at top */}
                    <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] md:text-[10px] text-[9px] w-[min-content]">
                      <p className="leading-[1.3]">{check.label}</p>
                    </div>

                    {/* Title and Icon */}
                    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full">
                      <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] md:text-[14px] text-[13px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">{check.title}</p>
                      </div>
                      <div className="relative shrink-0 md:size-[14px] size-[13px]">
                        {check.status === 'fail' ? (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M16.24 7.76a1 1 0 0 0-1.41 0L12 10.59 9.17 7.76a1 1 0 0 0-1.41 1.41L10.59 12l-2.83 2.83a1 1 0 1 0 1.41 1.41L12 13.41l2.83 2.83a1 1 0 0 0 1.41-1.41L13.41 12l2.83-2.83a1 1 0 0 0 0-1.41z" fill="white"/>
                          </svg>
                        ) : check.status === 'warning' ? (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M12 8v5M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M17 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Details - Always visible */}
                    {!isExpanded && (
                      <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] md:text-[9px] text-[8px] w-[min-content]">
                        <p className="leading-[1.3]">{check.details}</p>
                      </div>
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: 'auto',
                            transition: {
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="w-full flex flex-col gap-[9.867px] relative overflow-hidden"
                        >
                          {/* Score */}
                          <div className="flex flex-col gap-[6px] w-full">
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                              <p className="leading-[1.3]">Score</p>
                            </div>
                            <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative text-[#111111] md:text-[13px] text-[11px]">
                              <p className="leading-[1.4]">{check.score}/100</p>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-[6px] w-full">
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                              <p className="leading-[1.3]">Details</p>
                            </div>
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[1.5] relative text-[#111111] md:text-[10px] text-[9px]">
                              <p>{check.details}</p>
                            </div>
                          </div>

                          {/* Recommendation */}
                          {check.recommendation && (
                            <div className="flex flex-col gap-[6px] w-full">
                              <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                                <p className="leading-[1.3]">Recommendation</p>
                              </div>
                              <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[1.5] relative text-[#111111] md:text-[10px] text-[9px]">
                                <p>{check.recommendation}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* View Details Button */}
                    <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex items-center justify-between md:px-[10px] px-[8px] md:py-[6px] py-[5px] relative rounded-[6px] shrink-0 md:w-auto w-full">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[6px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />
                      <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 md:text-[9px] text-[8px] text-black text-nowrap">
                        <p className="leading-[1.3] whitespace-pre">{isExpanded ? 'HIDE DETAILS' : 'VIEW DETAILS'}</p>
                      </div>
                      <motion.div
                        className="relative shrink-0 md:size-[14px] size-[12px]"
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                      <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* Second Row of Check Cards */}
            <div className="content-stretch grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-[14px] relative shrink-0 w-full">
              {checks.slice(4, 8).map((check, index) => {
                const isExpanded = expandedCardId === check.id;
                return (
                  <motion.div
                    key={check.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: (index + 4) * 0.05,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[16px] items-center justify-center md:pb-[8px] pb-[6px] md:pt-[18px] pt-[14px] md:px-[14px] px-[12px] relative rounded-[10px] cursor-pointer hover:border-gray-300 transition-colors"
                    onClick={() => handleCardClick(check.id)}
                  >
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[7.4px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

                    {/* Label at top */}
                    <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] md:text-[10px] text-[9px] w-[min-content]">
                      <p className="leading-[1.3]">{check.label}</p>
                    </div>

                    {/* Title and Icon */}
                    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full">
                      <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] md:text-[14px] text-[13px] text-nowrap">
                        <p className="leading-[1.4] whitespace-pre">{check.title}</p>
                      </div>
                      <div className="relative shrink-0 md:size-[14px] size-[13px]">
                        {check.status === 'fail' ? (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M16.24 7.76a1 1 0 0 0-1.41 0L12 10.59 9.17 7.76a1 1 0 0 0-1.41 1.41L10.59 12l-2.83 2.83a1 1 0 1 0 1.41 1.41L12 13.41l2.83 2.83a1 1 0 0 0 1.41-1.41L13.41 12l2.83-2.83a1 1 0 0 0 0-1.41z" fill="white"/>
                          </svg>
                        ) : check.status === 'warning' ? (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M12 8v5M12 16h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        ) : (
                          <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="12" fill="currentColor"/>
                            <path d="M17 9l-7 7-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Details - Only visible when not expanded */}
                    {!isExpanded && (
                      <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] min-w-full opacity-50 relative shrink-0 text-[#111111] text-[7.4px] w-[min-content]">
                        <p className="leading-[1.3]">{check.details}</p>
                      </div>
                    )}

                    {/* Expanded Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: 'auto',
                            transition: {
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: {
                              height: { duration: 0.3, ease: "easeInOut" },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="w-full flex flex-col gap-[9.867px] relative overflow-hidden"
                        >
                          {/* Score */}
                          <div className="flex flex-col gap-[6px] w-full">
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                              <p className="leading-[1.3]">Score</p>
                            </div>
                            <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative text-[#111111] md:text-[13px] text-[11px]">
                              <p className="leading-[1.4]">{check.score}/100</p>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-[6px] w-full">
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                              <p className="leading-[1.3]">Details</p>
                            </div>
                            <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[1.5] relative text-[#111111] md:text-[10px] text-[9px]">
                              <p>{check.details}</p>
                            </div>
                          </div>

                          {/* Recommendation */}
                          {check.recommendation && (
                            <div className="flex flex-col gap-[6px] w-full">
                              <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative text-[#111111] md:text-[10px] text-[9px]">
                                <p className="leading-[1.3]">Recommendation</p>
                              </div>
                              <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[1.5] relative text-[#111111] md:text-[10px] text-[9px]">
                                <p>{check.recommendation}</p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* View Details Button */}
                    <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex items-center justify-between md:px-[10px] px-[8px] md:py-[6px] py-[5px] relative rounded-[6px] shrink-0 md:w-auto w-full">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[6px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />
                      <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 md:text-[9px] text-[8px] text-black text-nowrap">
                        <p className="leading-[1.3] whitespace-pre">{isExpanded ? 'HIDE DETAILS' : 'VIEW DETAILS'}</p>
                      </div>
                      <motion.div
                        className="relative shrink-0 md:size-[14px] size-[12px]"
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="block max-w-none size-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                      <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none shadow-[1.233px_1.233px_6.167px_0px_inset_rgba(0,0,0,0.02)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* Key Recommendations */}
            <div className="border-[#f1f1f1] border-[0.617px] border-solid box-border content-stretch flex flex-col gap-[14.8px] items-start justify-center px-[12.333px] py-[14.8px] relative rounded-[10px] shrink-0 w-full">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23fafafa'/%3E%3C/svg%3E" />

              <div className="flex flex-col font-['Geist',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111111] md:text-[13px] text-[12px] w-full">
                <p className="leading-[1.4]">Key Recommendations</p>
              </div>

              <div className="content-stretch flex flex-col gap-[9.867px] items-start relative shrink-0 w-full">
                {recommendations.slice(0, 4).map((rec, index) => (
                  <div key={index} className="content-stretch flex gap-[7.4px] items-center relative shrink-0 w-full">
                    <div className="relative shrink-0 md:size-[12px] size-[11px]">
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
                    <div className="flex flex-col font-['Geist',sans-serif] font-normal justify-center leading-[0] opacity-50 relative shrink-0 text-[#111111] md:text-[9px] text-[8px] text-nowrap">
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
    </motion.div>
  );
}
