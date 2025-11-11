import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Target, ExternalLink } from 'lucide-react';

interface CompetitorInsight {
  name: string;
  count: number;
  urls: string[];
}

interface CompetitorInsightsProps {
  competitors: CompetitorInsight[];
  totalAnalyses: number;
}

export function CompetitorInsights({ competitors, totalAnalyses }: CompetitorInsightsProps) {
  if (competitors.length === 0) {
    return (
      <Card
        className={cn(
          'relative overflow-hidden rounded-[28px] border border-landing-border bg-white/95',
          'transition-all duration-300'
        )}
      >
        <div className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-landing-background">
              <Target className="w-8 h-8 text-landing-muted" />
            </div>
          </div>
          <h3 className="font-neueBit text-[24px] leading-[0.9] text-landing-base mb-2">No competitors tracked yet</h3>
          <p className="font-apercu text-[13px] uppercase tracking-[0.28em] text-landing-body">
            Competitor insights will appear here after you run analyses
          </p>
        </div>
      </Card>
    );
  }

  const topCompetitors = competitors.slice(0, 5);

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-landing-border bg-white/95',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-landing-card'
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full bg-gradient-to-br from-landing-base to-gray-500" />

      <div className="p-6 relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-landing-base">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-neueBit text-[20px] leading-[0.9] text-landing-base">Competitor Insights</h3>
            <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">{competitors.length} unique tracked</p>
          </div>
        </div>

        <div className="space-y-3">
          {topCompetitors.map((competitor, index) => {
            const frequency = (competitor.count / totalAnalyses) * 100;
            return (
              <div
                key={competitor.name}
                className={cn(
                  'group relative p-3 rounded-xl border border-landing-border bg-landing-card',
                  'hover:bg-white hover:shadow-sm transition-all duration-200'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-landing-base text-white font-neueBit text-[14px] leading-none">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-apercu text-[13px] uppercase tracking-[0.2em] text-landing-base truncate font-medium">
                        {competitor.name}
                      </h4>
                      {competitor.urls.length > 0 && (
                        <a
                          href={competitor.urls[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Visit website"
                        >
                          <ExternalLink className="w-3 h-3 text-landing-body hover:text-landing-base" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-landing-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-landing-base rounded-full transition-all duration-500"
                          style={{ width: `${frequency}%` }}
                        />
                      </div>
                      <span className="font-apercu text-[11px] uppercase tracking-[0.2em] text-landing-body font-medium whitespace-nowrap">
                        {competitor.count}x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {competitors.length > 5 && (
          <div className="mt-4 text-center">
            <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">
              + {competitors.length - 5} more competitors
            </p>
          </div>
        )}

        <div className="mt-5 pt-5 border-t border-landing-border">
          <div className="flex items-center justify-between">
            <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-body">Total tracked</span>
            <span className="font-neueBit text-[18px] leading-none text-landing-base">{competitors.length}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
