'use client';

import { motion } from 'framer-motion';

export function StartForFree() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-mondwest text-[208.019px] leading-normal text-[#111111] tracking-[-6.2406px] whitespace-nowrap">
            Start for free
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
