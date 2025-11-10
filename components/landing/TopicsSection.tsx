'use client';

import { motion } from 'framer-motion';

export function TopicsSection() {
  const leftColumnTopics = `SEO health
Crawlability
Indexability
Structured data
Schema markup
Meta tags
Sitemaps
Robots.txt
OpenGraph data
Canonical URLs
Internal linking`;

  const rightColumnTopics = `Semantic HTML
Page speed
Accessibility
Content clarity
Embedding readiness
LLM discoverability
API responses
Search snippets
Metadata coverage`;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="flex flex-col gap-[56px]">
          {/* "Built for Indexing" Section - Single Instance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-[24px] w-full"
          >
            <h2 className="font-geist font-semibold text-lg leading-[1.4] text-black tracking-[-0.54px] w-full">
              Built for Indexing. Designed for Understanding.
            </h2>
            <p className="font-apercu text-[14px] leading-[1.8] text-[#818181] tracking-[-0.42px] uppercase w-full">
              Geoscanner evaluates how your website performs in an AI-first world. From SEO fundamentals to LLM readiness, it detects gaps in metadata, structure, and content signals, helping you stay visible to both search engines and intelligent crawlers.
            </p>
          </motion.div>

          {/* Topics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-[24px] w-full"
          >
            <div className="flex flex-col md:flex-row gap-[24px] w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-[24px]">
                <h3 className="font-geist font-semibold text-lg leading-[1.4] text-black tracking-[-0.54px]">
                  More topics we analyze
                </h3>
                <p className="font-apercu text-lg leading-[2.4] text-[#818181] tracking-[-0.54px] uppercase whitespace-pre-line">
                  {leftColumnTopics}
                </p>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-[24px]">
                <h3 className="font-geist font-semibold text-lg leading-[1.4] text-black tracking-[-0.54px]">
                  More topics we analyze
                </h3>
                <p className="font-apercu text-lg leading-[2.4] text-[#818181] tracking-[-0.54px] uppercase whitespace-pre-line">
                  {rightColumnTopics}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
