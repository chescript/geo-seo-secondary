import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="analysis-card p-6 text-[#111111] gap-6">
          <CardHeader className="pb-6 font-apercu">
            <div className="flex items-center justify-between">
              <CardTitle className="font-neueBit text-[26px] leading-[1]">
                Generating Analysis Prompts
              </CardTitle>

              {/* Competitors preview */}
              <div className="flex items-center gap-2">
                <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#8b867c]">Competitors</span>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#ece8dd]" />
                  ))}
                </div>
              </div>
            </div>

            <CardDescription className="mt-3 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
              <span className="font-apercu text-[12px] uppercase tracking-[0.3em] text-[#8b867c]">Creating AI-powered analysis prompts...</span>
            </CardDescription>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-[#e8e1d5] rounded-full h-2 overflow-hidden">
              <div className="bg-[#111111] h-2 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Prompt tiles skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group relative rounded-[22px] border border-[#ece8dd] bg-white/90 p-5 animate-in fade-in"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="space-y-3">
                    {/* Prompt text skeleton */}
                    <Skeleton className="h-4 w-full bg-[#ece8dd]" />
                    <Skeleton className="h-4 w-4/5 bg-[#ece8dd]" />

                    {/* Provider icons skeleton */}
                    <div className="flex items-center gap-3 justify-end pt-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="w-5 h-5 rounded bg-[#ece8dd]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons skeleton */}
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-9 w-32 rounded-full bg-[#ece8dd]" />
              <Skeleton className="h-10 w-40 rounded-full bg-[#ece8dd]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
