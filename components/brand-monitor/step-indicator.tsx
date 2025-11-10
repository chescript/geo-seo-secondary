import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
      <div className="rounded-[28px] border border-[#e4ded0] bg-white/90 p-6 shadow-[0_20px_50px_rgba(17,17,17,0.06)]">
        <div className="flex items-center justify-between gap-4">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const isUpcoming = currentStep < step.number;

            return (
              <React.Fragment key={step.number}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-geist text-sm font-semibold transition-all duration-300
                        ${
                          isCompleted
                            ? 'bg-[#1f8f4d] text-white'
                            : isCurrent
                            ? 'bg-[#111111] text-white shadow-[0_8px_20px_rgba(17,17,17,0.25)]'
                            : 'bg-[#f1f0ed] text-[#b2ada1]'
                        }
                      `}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`
                          font-neueBit text-[16px] leading-[1.1] transition-colors duration-300
                          ${isCurrent ? 'text-[#111111]' : 'text-[#8b867c]'}
                        `}
                      >
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <p className="text-landing-muted font-geist text-[12px] mt-0.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {isCurrent && (
                    <div className="mt-2 h-1 bg-[#e8e1d5] rounded-full overflow-hidden">
                      <div className="h-full bg-[#111111] w-2/3 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      h-0.5 w-12 transition-all duration-300
                      ${isCompleted ? 'bg-[#1f8f4d]' : 'bg-[#e8e1d5]'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
