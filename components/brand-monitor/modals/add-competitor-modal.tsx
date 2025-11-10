import React from 'react';
import { Button } from '@/components/ui/button';

interface AddCompetitorModalProps {
  isOpen: boolean;
  competitorName: string;
  competitorUrl: string;
  onNameChange: (name: string) => void;
  onUrlChange: (url: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

export function AddCompetitorModal({
  isOpen,
  competitorName,
  competitorUrl,
  onNameChange,
  onUrlChange,
  onAdd,
  onClose
}: AddCompetitorModalProps) {
  if (!isOpen) return null;
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && competitorName.trim()) {
      e.preventDefault();
      onAdd();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-landing-background rounded-[32px] border border-landing-border shadow-[0_45px_120px_rgba(11,11,11,0.15)] max-w-lg w-full mx-4 animate-fade-in">
        <div className="p-8">
          <div className="text-center mb-6">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e4ded0] bg-[#fdfbf5] px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-[#7f7a71] mb-4">
              Add Competitor
            </span>
            <h3 className="font-neueBit text-[32px] leading-[0.9] text-landing-base">Track a new competitor</h3>
            <p className="text-landing-muted font-geist text-[13px] mt-2">Compare how AI models rank them against your brand</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="font-apercu text-[11px] uppercase tracking-[0.4em] text-landing-muted">
                Competitor Name
              </label>
              <input
                type="text"
                value={competitorName}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Anthropic"
                className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-landing-base placeholder:text-[#928d82] focus:border-landing-base focus:outline-none focus:ring-2 focus:ring-landing-base/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="font-apercu text-[11px] uppercase tracking-[0.4em] text-landing-muted">
                Website URL <span className="text-[#b2ada1]">(Optional)</span>
              </label>
              <input
                type="text"
                value={competitorUrl}
                onChange={(e) => onUrlChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., anthropic.com"
                className="w-full rounded-2xl border border-[#e0dacf] bg-[#fdfbf5] px-4 py-3 text-[15px] text-landing-base placeholder:text-[#928d82] focus:border-landing-base focus:outline-none focus:ring-2 focus:ring-landing-base/60 transition-all shadow-[0_10px_30px_rgba(15,15,15,0.05)]"
              />
              <p className="text-xs text-landing-muted font-geist">We&apos;ll automatically fetch their logo and metadata</p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              onClick={onAdd}
              disabled={!competitorName.trim()}
              variant="primary"
              size="default"
              className="flex-1"
            >
              Add Competitor
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              size="default"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
