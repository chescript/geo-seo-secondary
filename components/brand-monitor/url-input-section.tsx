import React from 'react';
import { Globe, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface UrlInputSectionProps {
  url: string;
  urlValid: boolean | null;
  loading: boolean;
  analyzing: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
}

export function UrlInputSection({
  url,
  urlValid,
  loading,
  analyzing,
  onUrlChange,
  onSubmit
}: UrlInputSectionProps) {
  return (
    <div className="flex items-center justify-center animate-panel-in pb-12">
      <div className="w-full max-w-3xl px-6">
        <div className="relative group">
          {/* Input container with gradient border on focus */}
          <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
            urlValid === true
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-100'
              : urlValid === false
              ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-100'
              : 'bg-gradient-to-r from-orange-500/0 to-orange-500/0 opacity-0'
          }`}></div>

          <div className="relative">
            {/* Left icon with animation */}
            <Globe className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${
              urlValid === true
                ? 'text-green-600'
                : urlValid === false
                ? 'text-red-600'
                : 'text-gray-400'
            }`} />

            {/* Input field */}
            <input
              type="text"
              className={`w-full pl-12 pr-16 h-14 text-base font-medium border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white ${
                urlValid === false
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-400'
                  : urlValid === true
                  ? 'border-green-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-400'
                  : 'border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 hover:border-gray-300'
              }`}
              placeholder="Enter your website URL (e.g., example.com)"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !loading && !analyzing && url) {
                  onSubmit();
                }
              }}
              onFocus={(e) => {
                if (!url) {
                  e.target.placeholder = "example.com";
                }
              }}
              onBlur={(e) => {
                e.target.placeholder = "Enter your website URL (e.g., example.com)";
              }}
              disabled={loading || analyzing}
            />

            {/* Status indicators */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              {urlValid === true && (
                <CheckCircle2 className="h-5 w-5 text-green-600 animate-pulse" />
              )}
              {urlValid === false && (
                <AlertCircle className="h-5 w-5 text-red-600 animate-pulse" />
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={onSubmit}
              disabled={loading || analyzing || !url || urlValid === false}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-gradient-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:shadow-lg hover:shadow-orange-500/30 disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none text-white"
              aria-label="Analyze website"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <svg className="h-5 w-5 text-white transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Validation feedback text */}
        <div className="mt-3 h-5">
          {urlValid === false && (
            <p className="text-sm text-red-600 font-medium animate-fade-in">
              Please enter a valid URL (e.g., example.com or https://example.com)
            </p>
          )}
          {urlValid === true && (
            <p className="text-sm text-green-600 font-medium animate-fade-in">
              URL looks good - press Enter or click the arrow to analyze
            </p>
          )}
        </div>
      </div>
    </div>
  );
}