import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompetitorSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="analysis-card p-6 text-[#111111] gap-6">
          <CardHeader className="pb-6 font-apercu">
            <CardTitle className="font-neueBit text-[26px] leading-[1]">
              Identifying Competitors
            </CardTitle>

            {/* Progress indicator */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                <span className="font-apercu text-[12px] uppercase tracking-[0.3em] text-[#8b867c]">Analyzing market landscape...</span>
              </div>

              <div className="w-full bg-[#e8e1d5] rounded-full h-2 overflow-hidden">
                <div className="bg-[#111111] h-2 rounded-full animate-[pulse_2s_ease-in-out_infinite] w-1/2" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Competitor cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-[22px] border border-[#ece8dd] bg-white/90 animate-in fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Favicon skeleton */}
                    <Skeleton className="w-8 h-8 rounded flex-shrink-0 bg-[#ece8dd]" />

                    <div className="flex-1 space-y-2">
                      {/* Company name */}
                      <Skeleton className="h-4 w-32 bg-[#ece8dd]" />
                      {/* URL */}
                      <Skeleton className="h-3 w-24 bg-[#ece8dd]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats skeleton */}
            <div className="mt-6 pt-6 border-t border-[#ece8dd]">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-40 bg-[#ece8dd]" />
                <Skeleton className="h-6 w-12 rounded-full bg-[#ece8dd]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
