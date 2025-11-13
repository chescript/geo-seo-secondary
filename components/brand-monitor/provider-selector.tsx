import React, { useState } from "react";
import { Check, ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/shadcn/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { getEnabledProviders } from "@/lib/provider-config";
import { cn } from "@/lib/utils";

const providerDescriptions: Record<string, string> = {
  openai: "GPT-4o coverage for premium AI surfaces",
  anthropic: "Claude's writing-first brand summary",
  google: "Gemini grounding with live Google context",
  perplexity: "Blended search plus cited competitive intel",
};

interface ProviderSelectorProps {
  availableProviders: string[];
  selectedProviders: string[];
  onSelectionChange: (providers: string[]) => void;
  disabled?: boolean;
}

export function ProviderSelector({
  availableProviders,
  selectedProviders,
  onSelectionChange,
  disabled = false,
}: ProviderSelectorProps) {
  console.log('[ProviderSelector] Props:', { availableProviders, selectedProviders, disabled });

  const enabledProviders = getEnabledProviders();
  const enabledNames = enabledProviders.map((p) => p.name);
  const mergedProviders =
    availableProviders.length === 0
      ? enabledNames
      : Array.from(new Set([...enabledNames, ...availableProviders]));
  const validProviders = mergedProviders.filter((provider) =>
    enabledNames.includes(provider),
  );

  console.log('[ProviderSelector] Computed:', { enabledNames, validProviders });

  const handleProviderToggle = (provider: string, checked: boolean) => {
    console.log('[ProviderSelector] Toggle:', { provider, checked, currentSelection: selectedProviders, effectiveSelection });

    // If selectedProviders is empty, we're using the fallback (all providers)
    // Initialize it with all valid providers first
    const actualSelection = selectedProviders.length > 0 ? selectedProviders : validProviders;
    console.log('[ProviderSelector] Actual selection to work with:', actualSelection);

    if (checked) {
      if (!actualSelection.includes(provider)) {
        const newSelection = [...actualSelection, provider];
        console.log('[ProviderSelector] Adding provider:', newSelection);
        onSelectionChange(newSelection);
      }
    } else {
      const newSelection = actualSelection.filter((p) => p !== provider);
      if (newSelection.length > 0) {
        console.log('[ProviderSelector] Removing provider:', newSelection);
        onSelectionChange(newSelection);
      } else {
        console.log('[ProviderSelector] Cannot remove last provider');
      }
    }
  };

  const ProviderIcon = ({
    provider,
    size = 20,
  }: {
    provider: string;
    size?: number;
  }) => {
    const logoPath = `/providers/${provider.toLowerCase()}.svg`;
    return (
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <Image
          src={logoPath}
          alt={`${provider} logo`}
          width={size}
          height={size}
          className="object-contain"
        />
      </div>
    );
  };

  const effectiveSelection =
    selectedProviders.length > 0 ? selectedProviders : validProviders;

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    console.log('[ProviderSelector] Popover open state changing:', { from: open, to: newOpen });
    setOpen(newOpen);
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 font-apercu text-[11px] uppercase tracking-[0.35em] text-[#8b867c]">
        <Settings className="h-4 w-4" />
        AI Providers
      </label>

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className={cn(
              "w-full justify-between rounded-[32px] border border-[#d7d0c3] bg-[#fdfbf5] px-6 py-4 text-left shadow-[0_15px_45px_rgba(17,17,17,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#111111] hover:bg-white",
              disabled && "cursor-not-allowed opacity-50",
            )}
            disabled={disabled || validProviders.length === 0}
          >
            <div className="flex flex-wrap items-center gap-2">
              {effectiveSelection.length === validProviders.length ? (
                <span className="font-sans text-[13px] text-[#4a473f]">
                  All providers selected ({validProviders.length})
                </span>
              ) : effectiveSelection.length === 0 ? (
                <span className="font-sans text-[13px] text-[#8b867c]">
                  Select providers...
                </span>
              ) : (
                effectiveSelection.map((provider) => (
                  <span
                    key={provider}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7d0c3] bg-white/90 px-3 py-1 font-sans text-[12px] text-[#111111]"
                  >
                    <ProviderIcon provider={provider} size={14} />
                    {provider}
                  </span>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 text-[#8b867c]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[440px] max-w-[480px] rounded-[40px] border border-[#ece8dd] bg-[#fefcf7] p-7 shadow-[0_45px_100px_rgba(17,17,17,0.15)]"
          align="start"
        >
          <p className="mb-4 font-apercu text-[11px] uppercase tracking-[0.35em] text-[#8b867c]">
            Choose models to run
          </p>

          {validProviders.length === 0 ? (
            <div className="p-3 text-center font-apercu text-[12px] uppercase tracking-[0.35em] text-[#8b867c]">
              No providers available. Check your config.
            </div>
          ) : (
            <ScrollArea className="max-h-[360px] pr-1.5">
              <div className="space-y-1.5">
                {validProviders.map((provider) => {
                  const isSelected = effectiveSelection.includes(provider);
                  const isLastSelected =
                    effectiveSelection.length === 1 && isSelected;
                  const description =
                    providerDescriptions[provider.toLowerCase()] ||
                    "Runs our default crawl recipe";

                  return (
                    <button
                      key={provider}
                      type="button"
                      onClick={(e) => {
                        console.log('[ProviderSelector] Button clicked:', { provider, isSelected, isLastSelected });
                        e.preventDefault();
                        e.stopPropagation();
                        handleProviderToggle(provider, !isSelected);
                      }}
                      disabled={isLastSelected}
                      className={cn(
                        "w-full rounded-[18px] border bg-white px-4 py-3 text-left transition-all",
                        isSelected
                          ? "border-[#111111] shadow-[0_12px_28px_rgba(17,17,17,0.1)]"
                          : "border-[#d7d0c3] hover:border-[#111111]",
                        isLastSelected && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e4ded0] bg-[#fdfbf5]">
                          <ProviderIcon provider={provider} size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="font-apercu text-[11px] uppercase tracking-[0.32em] text-[#111111]">
                            {provider}
                          </p>
                          <p className="font-sans text-[13px] leading-snug text-[#5c5850]">
                            {description}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "flex h-[22px] w-[22px] items-center justify-center rounded-full border",
                            isSelected ? "border-[#111111]" : "border-[#d7d0c3]",
                          )}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-[#111111]" />
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          {validProviders.length > 1 && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button
                variant="secondary"
                size="default"
                className="h-11 rounded-2xl border border-transparent bg-[#111111] font-sans text-[13px] font-medium text-white hover:bg-[#000000]"
                onClick={() => {
                  console.log('[ProviderSelector] Select all clicked:', validProviders);
                  onSelectionChange(validProviders);
                }}
              >
                Select all
              </Button>
              <Button
                variant="secondary"
                size="default"
                className="h-11 rounded-2xl border border-[#d7d0c3] bg-white font-sans text-[13px] font-medium text-[#111111] hover:border-[#111111]"
                onClick={() => {
                  console.log('[ProviderSelector] Just first clicked:', [validProviders[0]]);
                  onSelectionChange([validProviders[0]]);
                }}
              >
                Just {validProviders[0]}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {effectiveSelection.length > 0 && (
        <p className="font-sans text-[12px] text-[#8b867c]">
          {effectiveSelection.length} provider
          {effectiveSelection.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
