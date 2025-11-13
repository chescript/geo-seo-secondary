import React from "react";
import { Globe, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onSubmit,
}: UrlInputSectionProps) {
  const disabled = loading || analyzing;
  const isValid = urlValid === true;
  const isInvalid = urlValid === false;

  return (
    <div className="flex items-center justify-center animate-panel-in py-12">
      <div className="w-full max-w-3xl px-4">
        <div className="text-center space-y-4 mb-10">
          <div className="space-y-3">
            <p className="font-apercu text-[11px] uppercase tracking-[0.35em] text-[#8b867c]">
              Enter brand domain
            </p>
            <h2 className="font-neueBit text-[36px] leading-[0.95] text-[#111111]">
              Analyze Your AI Visibility
            </h2>
            <p className="font-sans text-[16px] text-[#4a473f] max-w-xl mx-auto">
              See how ChatGPT, Claude, and Perplexity describe your brand
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
          <div className="relative flex-1">
            <Globe
              className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${
                isValid
                  ? "text-emerald-600"
                  : isInvalid
                  ? "text-[#c94135]"
                  : "text-[#8b867c]"
              }`}
            />
            <input
              type="text"
              value={url}
              placeholder="acme.com"
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled && url) {
                  onSubmit();
                }
              }}
              disabled={disabled}
              aria-invalid={isInvalid}
              aria-busy={disabled}
              className={`
                w-full h-[56px] rounded-full border bg-[#f4f2ed] px-14 font-sans text-[16px] text-[#111111] transition-all
                placeholder:text-[#8b867c] focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-[#111111]
                disabled:opacity-60 disabled:cursor-not-allowed
                ${isInvalid ? "border-[#f2b4ab]" : "border-[#d7d0c3] hover:border-[#111111]"}
              `}
            />
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {loading || analyzing ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#111111]" />
              ) : isValid ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : isInvalid ? (
                <AlertCircle className="h-5 w-5 text-[#c94135]" />
              ) : null
              }
            </div>
          </div>

          <Button
            type="button"
            onClick={onSubmit}
            disabled={disabled || !url || isInvalid}
            variant="primary"
            size="lg"
            className="h-[56px] px-10"
          >
            {loading || analyzing ? "Scanning..." : "Start Analysis"}
          </Button>
        </div>

        <div className="mt-4 text-center min-h-[24px]">
          {isInvalid && (
            <p className="font-sans text-[14px] text-[#c94135]">
              Enter a full domain (example.com or https://example.com)
            </p>
          )}
          {isValid && !loading && !analyzing && (
            <p className="font-sans text-[14px] text-emerald-600 flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Ready to analyze
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
