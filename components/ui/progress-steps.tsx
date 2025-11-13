import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Circle */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${
                    step.status === 'completed'
                      ? 'bg-landing-base border-landing-base text-white'
                      : step.status === 'current'
                      ? 'bg-white border-landing-base text-landing-base shadow-landing-card'
                      : 'bg-white border-landing-border text-landing-muted'
                  }
                `}
              >
                {step.status === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-sans text-sm font-medium">{step.number}</span>
                )}
              </div>
              <span
                className={`
                  font-sans text-xs font-medium text-center max-w-[80px]
                  ${
                    step.status === 'current'
                      ? 'text-landing-base'
                      : step.status === 'completed'
                      ? 'text-landing-body'
                      : 'text-landing-muted'
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 relative -top-5">
                <div
                  className={`
                    h-full transition-all
                    ${
                      step.status === 'completed'
                        ? 'bg-landing-base'
                        : 'bg-landing-border'
                    }
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
