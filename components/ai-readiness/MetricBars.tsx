"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MetricBarsProps {
  metrics: {
    label: string;
    score: number;
    status: 'pass' | 'warning' | 'fail';
    category?: 'page' | 'domain' | 'ai';
    details?: string;
    recommendation?: string;
    actionItems?: string[];
  }[];
}

export default function MetricBars({ metrics }: MetricBarsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const getBarColor = (score: number) => {
    // Use orange gradient for all bars
    if (score >= 80) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    if (score >= 60) return 'bg-gradient-to-r from-orange-400 to-orange-500';
    if (score >= 40) return 'bg-gradient-to-r from-orange-300 to-orange-400';
    return 'bg-gradient-to-r from-gray-300 to-gray-400';
  };

  const getBulletColor = (score: number) => {
    // Orange bullet for all
    return 'bg-orange-500';
  };
  
  const toggleExpanded = (label: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(label)) {
      newExpanded.delete(label);
    } else {
      newExpanded.add(label);
    }
    setExpandedItems(newExpanded);
  };
  
  // Sort metrics by score descending
  const sortedMetrics = [...metrics].sort((a, b) => b.score - a.score);
  
  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {sortedMetrics.map((metric, index) => {
        const isExpanded = expandedItems.has(metric.label);

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white rounded-lg overflow-hidden"
          >
            <div
              className={`flex items-center gap-4 p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                isExpanded ? 'bg-gray-50' : ''
              }`}
              onClick={() => toggleExpanded(metric.label)}
            >
              {/* Bullet */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getBulletColor(metric.score)}`} />

              {/* Label */}
              <div className="flex-shrink-0 w-40">
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>

              {/* Chevron */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.div>

              {/* Bar container */}
              <div className="flex-1 relative">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  {/* Animated bar */}
                  <motion.div
                    className={`absolute inset-y-0 left-0 ${getBarColor(metric.score)} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(metric.score, 2)}%` }}
                    transition={{
                      delay: 0.2 + index * 0.05,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />
                </div>
              </div>

              {/* Score value */}
              <div className="flex-shrink-0 w-12 text-right">
                <span className="text-sm font-semibold text-orange-600">
                  {metric.score}%
                </span>
              </div>
            </div>
            
            {/* Expanded Details */}
            <AnimatePresence>
              {isExpanded && metric.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="px-4 py-3 bg-gray-50 space-y-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Status</div>
                      <div className="text-sm text-gray-700">{metric.details}</div>
                    </div>
                    {metric.recommendation && (
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Recommendation</div>
                        <div className="text-sm text-gray-600">{metric.recommendation}</div>
                      </div>
                    )}
                    {metric.actionItems && metric.actionItems.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Action Items</div>
                        <ul className="space-y-1">
                          {metric.actionItems.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      
      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">
              {metrics.filter(m => m.status === 'pass').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Passing</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-600">
              {metrics.filter(m => m.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Warning</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-red-600">
              {metrics.filter(m => m.status === 'fail').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Failing</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
