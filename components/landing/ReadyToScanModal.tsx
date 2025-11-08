'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadyToScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze?: (url: string) => void;
}

export function ReadyToScanModal({ isOpen, onClose, onAnalyze }: ReadyToScanModalProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && onAnalyze) {
      onAnalyze(url);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-8 top-1/2 -translate-y-1/2 w-[326px] h-[321px] overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-b from-white via-[#fffaf3] to-[#f6efe2] p-6 shadow-[0_35px_120px_rgba(15,15,15,0.18)] backdrop-blur-[6px] z-50"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-[32px] bg-white/60 blur-2xl"
            />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-8 pt-4">
              <div className="w-6 h-6 bg-gradient-to-br from-[#2b2b2b] to-[#050505] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h2 className="font-neueBit text-[29px] leading-[1] text-[#111111] mb-4">
                Ready to Scan?
              </h2>
              <p className="font-apercu text-[14px] leading-[1.43] text-[#818181] tracking-[-0.42px] uppercase">
                Enter your website URL to get instant AI-readiness insights
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website"
                className="w-full h-[44px] px-4 bg-[#f1f1f1] border-none rounded-full font-geist text-[16px] text-[#111111] placeholder:text-[#111111] placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#111111]"
              />

              <Button type="submit" variant="primary" className="w-full">
                Analyze Now
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

