'use client';

import { motion } from 'framer-motion';
import { AnalysisResultsDashboard } from "@/components/ai-readiness/AnalysisResultsDashboard";

export function DashboardPreview() {
  // Mock data for preview
  const mockChecks = [
    {
      id: 'llms-txt',
      label: 'LLMs.TXT',
      title: 'LLMs.txt',
      status: 'warning' as const,
      score: 0,
      details: 'No llms.txt file found',
      recommendation: 'Add an llms.txt file to define AI usage permissions'
    },
    {
      id: 'robots-txt',
      label: 'ROBOTS.TXT',
      title: 'Robots.txt',
      status: 'pass' as const,
      score: 100,
      details: 'Robots.txt found',
      recommendation: ''
    },
    {
      id: 'sitemap',
      label: 'SITEMAP',
      title: 'Sitemap',
      status: 'pass' as const,
      score: 100,
      details: 'Valid XML sitemap found at /sitemap.xml',
      recommendation: ''
    },
    {
      id: 'heading-hierarchy',
      label: 'HEADING HIERARCHY',
      title: 'Heading Hierarchy',
      status: 'warning' as const,
      score: 65,
      details: 'Multiple H1s (2) create topic ambiguity, Skipped heading.',
      recommendation: 'Use exactly one H1 and maintain logical heading hierarchy'
    },
    {
      id: 'content-readability',
      label: 'CONTENT READABILITY',
      title: 'Content Readability',
      status: 'warning' as const,
      score: 48,
      details: 'Difficult to read (Flesch: 48)',
      recommendation: 'Simplify sentences and use clearer language'
    },
    {
      id: 'metadata-quality',
      label: 'METADATA QUALITY',
      title: 'Metadata Quality',
      status: 'pass' as const,
      score: 85,
      details: 'Title ✓, Description ✓',
      recommendation: ''
    },
    {
      id: 'semantic-html',
      label: 'SEMANTIC HTML',
      title: 'Semantic HTML',
      status: 'pass' as const,
      score: 90,
      details: 'Found 1 semantic HTML5 elements',
      recommendation: ''
    },
    {
      id: 'accessibility',
      label: 'ACCESSIBILITY',
      title: 'Accessibility',
      status: 'pass' as const,
      score: 100,
      details: '100% images have alt text, ARIA labels: Yes',
      recommendation: ''
    }
  ];

  const mockRecommendations = [
    'Add an llms.txt file to define AI usage permissions',
    'Use exactly one H1 and maintain logical heading hierarchy (H1→H2→H3)',
    'Simplify sentences and use clearer language for better AI comprehension',
    'Use more semantic HTML5 elements (article, nav, main, section, etc.)'
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
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
        >
          <AnalysisResultsDashboard
            url="https://www.chatsy.com"
            overallScore={90}
            seoScore={95}
            contentScore={73}
            checks={mockChecks}
            recommendations={mockRecommendations}
          />
        </motion.div>
      </div>
    </section>
  );
}
