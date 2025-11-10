'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const phrases = ['Start for free', 'Try now'];

export function StartForFree() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(id);
  }, []);

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
          <AnimatePresence mode="wait">
            <motion.h2
              key={phrases[activeIndex]}
              className="font-mondwest text-6xl sm:text-8xl md:text-9xl lg:text-[208.019px] leading-normal text-[#111111] tracking-[-6.2406px] whitespace-nowrap inline-flex items-center gap-4 sm:gap-8 md:gap-12"
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <span>{phrases[activeIndex]}</span>
              {phrases[activeIndex] === 'Try now' ? (
                <motion.span
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <svg className="w-20 h-20 text-[#111111]" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 36H60"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M42 18L60 36L42 54"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              ) : null}
            </motion.h2>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
