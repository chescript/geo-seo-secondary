'use client';

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResultsDashboard } from "@/components/ai-readiness/AnalysisResultsDashboard";
import { ChevronDown } from "lucide-react";
import { ReadyToScanModal } from "@/components/landing/ReadyToScanModal";
import { PricingSection } from "@/components/landing/PricingSection";
import { TopicsSection } from "@/components/landing/TopicsSection";
import { PixelArtCTA } from "@/components/landing/PixelArtCTA";
import { CompactAnalysisPreview } from "@/components/landing/CompactAnalysisPreview";
import { LoadingPreview } from "@/components/landing/LoadingPreview";
import { WantMoreSection } from "@/components/landing/WantMoreSection";
import { StartForFree } from "@/components/landing/StartForFree";
import { Footer, FooterBottomBanner } from "@/components/footer";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [urlError, setUrlError] = useState<string>("");
  const [showAnalysisTool, setShowAnalysisTool] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalysis = async () => {
    if (!url) return;

    // Auto-prepend https:// if no protocol is provided
    let processedUrl = url.trim();
    if (!processedUrl.match(/^https?:\/\//i)) {
      processedUrl = 'https://' + processedUrl;
    }

    // Validate URL format
    try {
      const urlObj = new URL(processedUrl);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        setUrlError('Please enter a valid URL (e.g., example.com)');
        return;
      }
    } catch (error) {
      setUrlError('Please enter a valid URL (e.g., example.com)');
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);
    setAnalysisData(null);
    setUrlError("");

    // Scroll to results section
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const response = await fetch('/api/ai-readiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: processedUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisData(data);
        setShowResults(true);
      } else {
        setUrlError(data.error || 'Failed to analyze website');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setUrlError('An error occurred while analyzing the website');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-[183px] pb-[56px]">
        <div className="relative max-w-[796px] mx-auto px-4">
          <div className="text-center flex flex-col items-center gap-10">
            {/* Title */}
            <div className="flex flex-col items-center gap-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-neueBit text-[80px] leading-[0.9] text-[#111111] w-[604px]"
                style={{ textTransform: 'none' }}
              >
                Future-Proof Your Presence In The AI Web.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-apercu text-[16px] leading-[1.8] text-[#818181] tracking-[-0.48px] uppercase w-[572px]"
              >
                Analyze how AI-ready your webpage is. Get instant insights on LLM compatibility, SEO, and metadata optimization.
              </motion.p>
            </div>

            {/* Analysis Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-8 w-full max-w-[398px]"
            >
              {/* Input and Button */}
              <div className="flex gap-3 w-full">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (urlError) setUrlError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && url.length > 0 && !isAnalyzing) {
                      handleAnalysis();
                    }
                  }}
                  placeholder="Enter your website"
                  className="flex-1 h-[44px] px-5 bg-[#f1f1f1] border-none rounded-full font-geist text-[16px] text-[#111111] placeholder:text-[#111111] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  disabled={isAnalyzing}
                />
                <button
                  onClick={handleAnalysis}
                  disabled={!url || isAnalyzing}
                  className="h-[44px] px-5 bg-gradient-to-b from-[#282828] to-[#0f0f0f] border-t border-[#7a7a7a] rounded-full font-geist font-medium text-[16px] text-white tracking-[-0.48px] hover:from-[#333333] hover:to-[#1a1a1a] transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                </button>
              </div>

              {/* Feature Badges */}
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-[6px]">
                  <div className="w-[18px] h-[18px] bg-[#111111] bg-opacity-10 rounded-[3px] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3.75 6.25L2.5 5L3 4.5L3.75 5.25L6.75 2.25L7.25 2.75L3.75 6.25Z" fill="#111111"/>
                    </svg>
                  </div>
                  <span className="font-neueBit text-[18px] leading-[1.4] text-[#111111] tracking-[-0.54px]">Free forever</span>
                </div>

                <div className="flex items-center gap-[6px]">
                  <div className="w-[18px] h-[18px] bg-[#111111] bg-opacity-10 rounded-[3px] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3.75 6.25L2.5 5L3 4.5L3.75 5.25L6.75 2.25L7.25 2.75L3.75 6.25Z" fill="#111111"/>
                    </svg>
                  </div>
                  <span className="font-neueBit text-[18px] leading-[1.4] text-[#111111] tracking-[-0.54px]">No signup required</span>
                </div>

                <div className="flex items-center gap-[6px]">
                  <div className="w-[18px] h-[18px] bg-[#111111] bg-opacity-10 rounded-[3px] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M3.75 6.25L2.5 5L3 4.5L3.75 5.25L6.75 2.25L7.25 2.75L3.75 6.25Z" fill="#111111"/>
                    </svg>
                  </div>
                  <span className="font-neueBit text-[18px] leading-[1.4] text-[#111111] tracking-[-0.54px]">Instant results</span>
                </div>
              </div>

              {urlError && (
                <p className="text-sm text-red-500">{urlError}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analysis Tool Section (Collapsible) */}
      <AnimatePresence>
        {showAnalysisTool && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white py-16 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                  Test Your Website's AI Readiness
                </h2>
                <p className="text-zinc-600">Enter your URL to get a detailed analysis</p>
              </div>

              {/* URL Input */}
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (urlError) setUrlError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && url.length > 0 && !isAnalyzing) {
                          handleAnalysis();
                        }
                      }}
                      placeholder="Enter your website URL (e.g., example.com)"
                      className="w-full px-6 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#111111] focus:outline-none focus:ring-4 focus:ring-[#111111]/10 transition-all shadow-sm hover:shadow-md"
                      disabled={isAnalyzing}
                    />
                    {urlError && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500">{urlError}</p>
                    )}
                  </div>
                  <button
                    onClick={handleAnalysis}
                    disabled={!url || isAnalyzing}
                    className="bg-gradient-to-r from-[#2b2b2b] to-[#050505] hover:from-[#333333] hover:to-[#1a1a1a] text-white px-8 py-4 text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-200"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : 'Analyze Now'}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <div ref={resultsRef}>
        <AnimatePresence mode="wait">
          {isAnalyzing && !showResults && (
            <LoadingPreview key="loading" />
          )}

          {showResults && analysisData && (() => {
            // Calculate scores from checks
            const checks = analysisData.checks || [];

            // SEO Score: average of meta-tags, robots-txt, sitemap
            const seoChecks = checks.filter((c: any) =>
              ['meta-tags', 'robots-txt', 'sitemap'].includes(c.id)
            );
            const seoScore = seoChecks.length > 0
              ? Math.round(seoChecks.reduce((acc: number, c: any) => acc + c.score, 0) / seoChecks.length)
              : 0;

            // Content Score: average of readability and heading-structure
            const contentChecks = checks.filter((c: any) =>
              ['readability', 'heading-structure'].includes(c.id)
            );
            const contentScore = contentChecks.length > 0
              ? Math.round(contentChecks.reduce((acc: number, c: any) => acc + c.score, 0) / contentChecks.length)
              : 0;

            // Extract recommendations from checks with status 'warning' or 'fail'
            const recommendations = checks
              .filter((c: any) => c.status === 'warning' || c.status === 'fail')
              .map((c: any) => c.recommendation)
              .filter(Boolean);

            return (
              <motion.section
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="py-16 bg-white"
              >
                <div className="max-w-7xl mx-auto px-4">
                  <AnalysisResultsDashboard
                    url={url}
                    overallScore={analysisData.overallScore || 90}
                    seoScore={seoScore}
                    contentScore={contentScore}
                    checks={checks}
                    recommendations={recommendations}
                  />

                  {/* Reset Button */}
                  <div className="text-center mt-8">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setAnalysisData(null);
                        setUrl("");
                      }}
                      className="h-[44px] px-8 bg-gradient-to-b from-[#282828] to-[#0f0f0f] border-t border-[#7a7a7a] rounded-full font-geist font-medium text-[16px] text-white tracking-[-0.48px] hover:from-[#333333] hover:to-[#1a1a1a] transition-all"
                    >
                      Analyze Another Website
                    </button>
                  </div>
                </div>
              </motion.section>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Compact Analysis Preview Section */}
      <CompactAnalysisPreview />

      {/* Want More Section with Blue Gradient */}
      <WantMoreSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Topics Section */}
      <TopicsSection />

      {/* Pixel Art CTA Section (Second Want More) */}
      <PixelArtCTA />

      {/* Footer - Main Content (Logo and Links) */}
      <Footer />

      {/* Start For Free Section - Big Text */}
      <StartForFree />

      {/* Footer Bottom Banner - Copyright */}
      <FooterBottomBanner />
    </div>
  );
}

