import React from "react";
import { Globe, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
    <div className="flex items-center justify-center animate-panel-in pb-12">
      <div className="w-full max-w-4xl px-4">
        <div className="flex items-center justify-between pb-3">
          <div className="space-y-1">
            <p className="font-apercu text-[11px] uppercase tracking-[0.35em] text-[#8b867c]">
              Enter brand domain
            </p>
            <p className="font-neueBit text-[22px] text-[#111111] leading-tight">
              We&apos;ll crawl every AI surface in your plan.
            </p>
          </div>
          {(isValid || isInvalid) && (
            <span
              className={`font-apercu text-[11px] uppercase tracking-[0.3em] ${
                isValid ? "text-emerald-600" : "text-[#c94135]"
              }`}
            >
              {isValid ? "Looks good" : "Needs attention"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
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
                w-full h-[56px] rounded-full border bg-[#f4f2ed] px-14 font-geist text-[16px] text-[#111111] transition-all
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

          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled || !url || isInvalid}
            className="h-[56px] rounded-full bg-[#111111] px-8 font-neueBit text-[18px] text-white tracking-[-0.32px] transition-all hover:-translate-y-0.5 hover:bg-[#000000] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading || analyzing ? "Scanning..." : "Start Crawl"}
          </button>
        </div>

        <div className="mt-3 min-h-[20px]">
          {isInvalid && (
            <p className="font-geist text-sm text-[#c94135]">
              Enter a full domain (example.com or https://example.com)
            </p>
          )}
          {isValid && (
            <p className="font-geist text-sm text-emerald-600">
              URL verified - launch your crawl whenever you&apos;re ready.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
