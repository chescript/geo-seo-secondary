'use client';

import Link from "next/link";
import { useState, useRef, Suspense, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Check } from "lucide-react";
import { AnalysisResultsDashboard } from "@/components/ai-readiness/AnalysisResultsDashboard";
import { LoadingPreview } from "@/components/landing/LoadingPreview";
import { Button } from "@/components/ui/button";

// Lazy load below-the-fold components with aggressive settings
// Using ssr: false to defer execution and reduce initial bundle
const CompactAnalysisPreview = dynamic(
  () => import("@/components/landing/CompactAnalysisPreview").then(mod => mod.CompactAnalysisPreview),
  {
    ssr: false,
    loading: () => <div className="min-h-[600px] bg-white" />
  }
);

const WantMoreSection = dynamic(
  () => import("@/components/landing/WantMoreSection").then(mod => mod.WantMoreSection),
  {
    ssr: false,
    loading: () => <div className="min-h-[560px] bg-white" />
  }
);

const PricingSection = dynamic(
  () => import("@/components/landing/PricingSection").then(mod => mod.PricingSection),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px] bg-white" />
  }
);

const TopicsSection = dynamic(
  () => import("@/components/landing/TopicsSection").then(mod => mod.TopicsSection),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px] bg-white" />
  }
);

const PixelArtCTA = dynamic(
  () => import("@/components/landing/PixelArtCTA").then(mod => mod.PixelArtCTA),
  {
    ssr: false,
    loading: () => <div className="min-h-[600px] bg-white" />
  }
);

const StartForFree = dynamic(
  () => import("@/components/landing/StartForFree").then(mod => mod.StartForFree),
  {
    ssr: false,
    loading: () => <div className="min-h-[200px] bg-white" />
  }
);

const FooterBottomBanner = dynamic(
  () => import("@/components/footer").then(mod => mod.FooterBottomBanner),
  {
    ssr: false,
    loading: () => <div className="min-h-[50px] bg-white" />
  }
);

import FeaturesContainer from "@/components/landing/Features";

export default function HomePageClient() {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [urlError, setUrlError] = useState<string>("");
  const [showAnalysisTool, setShowAnalysisTool] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalysis = useCallback(async () => {
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
  }, [url]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-[132px] pb-[56px]">
        <div className="relative max-w-[796px] mx-auto px-4">
          <div className="text-center flex flex-col items-center gap-10">
            {/* Title */}
            <div className="flex flex-col items-center gap-6">
              <h1
                className="hero-title font-neueBit text-5xl md:text-[80px] leading-[0.9] text-[#111111] w-full md:w-[604px]"
                style={{ textTransform: 'none' }}
              >
                Future-Proof Your Presence In The AI Web.
              </h1>

              {/* Subtitle */}
              <p
                className="hero-subtitle font-apercu text-base leading-[1.8] text-[#818181] tracking-[-0.48px] uppercase w-full md:w-[572px]"
              >
                Analyze how AI-ready your webpage is. Get instant insights on LLM compatibility, SEO, and metadata optimization.
              </p>
            </div>

            {/* Analysis Form */}
            <div
              className="hero-form flex flex-col items-center gap-8 w-full"
            >
              {/* Input and Button */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[398px]">
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
                  className="w-full h-[44px] px-5 bg-[#f1f1f1] border-none rounded-full font-geist text-[16px] text-[#111111] placeholder:text-[#111111] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#111111]"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={handleAnalysis}
                  disabled={!url || isAnalyzing}
                  variant="primary"
                  className="px-5 w-full sm:w-auto"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                </Button>
              </div>

              {/* Feature Badges */}
              <FeaturesContainer />

              {urlError && (
                <p className="text-sm text-red-500">{urlError}</p>
              )}
            </div>
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
                  Test Your Website&apos;s AI Readiness
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
                  <Button
                    onClick={handleAnalysis}
                    disabled={!url || isAnalyzing}
                    variant="primary"
                    size="lg"
                    className="px-8 shadow-[0px_20px_40px_rgba(5,5,5,0.35)]"
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
                  </Button>
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
                    <Button
                      onClick={() => {
                        setShowResults(false);
                        setAnalysisData(null);
                        setUrl("");
                      }}
                      variant="primary"
                      className="px-8"
                    >
                      Analyze Another Website
                    </Button>
                  </div>
                </div>
              </motion.section>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Compact Analysis Preview Section */}
      {!showResults && <CompactAnalysisPreview />}

      {/* Want More Section with Blue Gradient */}
      <WantMoreSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Topics Section */}
      <TopicsSection />

      {/* Pixel Art CTA Section (Second Want More) */}
      <PixelArtCTA />

      {/* Start For Free Section - Big Text */}
      <StartForFree />

      {/* Footer Bottom Banner - Copyright */}
      <FooterBottomBanner />
    </div>
  );
}
