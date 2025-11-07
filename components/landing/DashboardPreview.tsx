'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { AnalysisResultsDashboard } from "@/components/ai-readiness/AnalysisResultsDashboard";
import { EXAMPLE_URL, MOCK_CHECKS, MOCK_RECOMMENDATIONS, MOCK_SCORES } from './shared-constants';

export const DashboardPreview = memo(function DashboardPreview() {

  return (
    <section className="py-24 bg-white">
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
            url={`https://${EXAMPLE_URL}`}
            overallScore={MOCK_SCORES.overall}
            seoScore={MOCK_SCORES.seo}
            contentScore={MOCK_SCORES.content}
            checks={MOCK_CHECKS}
            recommendations={MOCK_RECOMMENDATIONS}
          />
        </motion.div>
      </div>
    </section>
  );
});
