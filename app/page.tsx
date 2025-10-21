'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RadarChart from "@/components/ai-readiness/RadarChart";
import MetricBars from "@/components/ai-readiness/MetricBars";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [urlError, setUrlError] = useState<string>("");
  const [viewMode, setViewMode] = useState<'cards' | 'radar' | 'bars'>('cards');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (checkId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(checkId)) {
      newExpanded.delete(checkId);
    } else {
      newExpanded.add(checkId);
    }
    setExpandedCards(newExpanded);
  };

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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white pt-24 pb-32">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 -left-20 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 -right-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Free AI-Readiness Checker
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="block text-zinc-900 mb-2">Is Your Website</span>
              <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                AI Ready?
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Analyze how AI-ready your webpage is. Get instant insights on LLM compatibility, SEO, and metadata optimization.
            </motion.p>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
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
                    className="w-full px-6 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all shadow-sm hover:shadow-md"
                    disabled={isAnalyzing}
                  />
                  {urlError && (
                    <p className="absolute -bottom-6 left-0 text-sm text-red-500">{urlError}</p>
                  )}
                </div>
                <button
                  onClick={handleAnalysis}
                  disabled={!url || isAnalyzing}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-base font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200"
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
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free forever
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No signup required
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant results
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
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
          .map((c: any) => c.recommendation);

        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative py-16 bg-gray-50 overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-grid-zinc-100 opacity-30" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-20 left-1/4 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"
                animate={{
                  y: [0, 50, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl"
                animate={{
                  y: [0, -50, 0],
                  x: [0, 30, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-zinc-900 mb-4">
                  Analysis Results for {new URL(url.includes('http') ? url : 'https://' + url).hostname}
                </h2>
                <p className="text-zinc-600">Here's how AI-ready your website is</p>

                {/* View Mode Toggle */}
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'cards'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cards View
                  </button>
                  <button
                    onClick={() => setViewMode('radar')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'radar'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Radar Chart
                  </button>
                  <button
                    onClick={() => setViewMode('bars')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'bars'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bar Chart
                  </button>
                </div>
              </div>

              {/* Cards View */}
              {viewMode === 'cards' && (
                <>
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Overall Score */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200">
                      <div className="text-orange-600 font-semibold mb-2">Overall Score</div>
                      <div className="text-5xl font-bold text-orange-700 mb-2">
                        {analysisData.overallScore || 0}
                        <span className="text-2xl">/100</span>
                      </div>
                      <div className="text-sm text-orange-600">AI Readiness</div>
                    </div>

                    {/* SEO Score */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
                      <div className="text-gray-600 font-semibold mb-2">SEO Score</div>
                      <div className="text-5xl font-bold text-gray-700 mb-2">
                        {seoScore}
                        <span className="text-2xl">/100</span>
                      </div>
                      <div className="text-sm text-gray-600">Search Optimization</div>
                    </div>

                    {/* Content Quality */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
                      <div className="text-gray-600 font-semibold mb-2">Content Quality</div>
                      <div className="text-5xl font-bold text-gray-700 mb-2">
                        {contentScore}
                        <span className="text-2xl">/100</span>
                      </div>
                      <div className="text-sm text-gray-600">Readability</div>
                    </div>
                  </div>

                  {/* Grid Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {checks.map((check: any, i: number) => {
                      const isExpanded = expandedCards.has(check.id);

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div
                            className="p-6 cursor-pointer"
                            onClick={() => toggleCard(check.id)}
                          >
                            {/* Status Icon */}
                            <div className="flex justify-end mb-4">
                              {check.status === 'pass' ? (
                                <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center bg-white">
                                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : check.status === 'warning' ? (
                                <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white">
                                  <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center bg-white">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-semibold text-gray-900 mb-2">
                              {check.label}
                            </h3>

                            {/* Status Text */}
                            <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
                              {check.details?.substring(0, 60)}{check.details?.length > 60 ? '...' : ''}
                            </p>

                            {/* Click for details */}
                            <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                              Click for details
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden border-t border-gray-200 bg-gray-50"
                              >
                                <div className="p-4 space-y-3">
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Status</div>
                                    <div className="text-sm text-gray-700">{check.details}</div>
                                  </div>
                                  {check.recommendation && (
                                    <div>
                                      <div className="text-xs font-semibold text-gray-500 mb-1">Recommendation</div>
                                      <div className="text-sm text-orange-600">{check.recommendation}</div>
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-xs font-semibold text-gray-500 mb-1">Score</div>
                                    <div className="text-sm font-medium text-gray-900">{check.score}/100</div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-sm mb-8">
                      <h3 className="text-xl font-bold text-zinc-900 mb-4">💡 Key Recommendations</h3>
                      <ul className="space-y-3">
                        {recommendations.map((rec: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-zinc-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {/* Radar Chart View */}
              {viewMode === 'radar' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  {/* Overall Score Display */}
                  <div className="flex justify-center mb-12">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-200 text-center">
                      <div className="text-orange-600 font-semibold mb-2">Overall Score</div>
                      <div className="text-6xl font-bold text-orange-700 mb-2">
                        {analysisData.overallScore || 0}
                        <span className="text-3xl">/100</span>
                      </div>
                      <div className="text-sm text-orange-600">AI Readiness</div>
                    </div>
                  </div>

                  {/* Radar Chart */}
                  <div className="flex justify-center mb-12">
                    <RadarChart
                      data={checks.map((check: any) => ({
                        label: check.label,
                        score: check.score || 0
                      }))}
                      size={400}
                    />
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-semibold text-zinc-900 mb-4">SEO Metrics</h4>
                      <div className="space-y-2">
                        {checks
                          .filter((c: any) => ['meta-tags', 'robots-txt', 'sitemap'].includes(c.id))
                          .map((check: any, i: number) => (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-sm text-zinc-600">{check.label}</span>
                              <span className="text-sm font-medium text-zinc-900">{check.score}/100</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                      <h4 className="font-semibold text-zinc-900 mb-4">Content Metrics</h4>
                      <div className="space-y-2">
                        {checks
                          .filter((c: any) => ['readability', 'heading-structure'].includes(c.id))
                          .map((check: any, i: number) => (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-sm text-zinc-600">{check.label}</span>
                              <span className="text-sm font-medium text-zinc-900">{check.score}/100</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bar Chart View */}
              {viewMode === 'bars' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <MetricBars
                    metrics={checks.map((check: any) => ({
                      label: check.label,
                      score: check.score || 0,
                      status: check.status as 'pass' | 'warning' | 'fail',
                      details: check.details,
                      recommendation: check.recommendation,
                      actionItems: check.actionItems
                    }))}
                  />
                </motion.div>
              )}

              {/* Reset Button */}
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setAnalysisData(null);
                    setUrl("");
                  }}
                  className="btn-firecrawl-outline px-6 py-3 rounded-xl"
                >
                  Analyze Another Website
                </button>
              </div>
            </div>
          </motion.section>
        );
      })()}

      {/* Premium CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[30px] p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Want More? Track Your Brand Across AI Models
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Unlock <strong>FireGEO Monitor</strong> - Analyze how ChatGPT, Claude, Perplexity
                and other AI models rank your brand against competitors in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8 bg-white text-orange-600 hover:bg-gray-100 shadow-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/brand-monitor"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-base font-medium transition-all duration-200 h-12 px-8 bg-orange-700 text-white hover:bg-orange-800"
                >
                  View Brand Monitor
                </Link>
              </div>
              <p className="mt-6 text-sm text-orange-100">
                Free tier includes 10 brand analyses per month • No credit card required
              </p>
            </div>
          </div>

          {/* Feature Comparison Grid */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* Free Tool */}
            <div className="bg-gray-50 rounded-[20px] p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">
                🆓 AI Readiness Check (Free)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700">Quick AI-readiness analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700">SEO & metadata score</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700">Basic LLM compatibility check</span>
                </li>
              </ul>
            </div>

            {/* Premium Tool */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-[20px] p-8 border-2 border-orange-500 relative">
              <div className="absolute -top-3 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
              <h3 className="text-2xl font-bold mb-4 text-zinc-900">
                🔥 FireGEO Brand Monitor
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700"><strong>Real-time</strong> brand tracking across all AI models</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700"><strong>Competitor analysis</strong> and ranking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700"><strong>Actionable insights</strong> & recommendations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700"><strong>Email alerts</strong> for visibility changes</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-200 h-10 px-4 w-full bg-orange-600 text-white hover:bg-orange-700"
                >
                  View Pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
