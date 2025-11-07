import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface AnalysisSkeletonProps {
  progress?: number;
  message?: string;
}

export function AnalysisSkeleton({ progress = 0, message = "Analyzing..." }: AnalysisSkeletonProps) {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="analysis-card p-6 text-[#111111] gap-6">
          <CardHeader className="pb-6 font-apercu">
            <CardTitle className="font-neueBit text-[26px] leading-[1]">
              Analysis in Progress
            </CardTitle>

            {/* Progress section */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                  <span className="font-apercu text-[12px] uppercase tracking-[0.3em] text-[#8b867c]">{message}</span>
                </CardDescription>
                <span className="font-neueBit text-[18px] text-[#111111]">{progress}%</span>
              </div>

              {/* Enhanced progress bar */}
              <div className="w-full bg-[#e8e1d5] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#111111] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Prompt analysis tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="group relative rounded-[22px] border border-[#ece8dd] bg-white/90 p-5"
                >
                  <div className="space-y-3">
                    {/* Prompt text skeleton */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-[#ece8dd]" />
                      <Skeleton className="h-4 w-3/4 bg-[#ece8dd]" />
                    </div>

                    {/* Provider status indicators */}
                    <div className="flex items-center gap-3 justify-end pt-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-1">
                          <Skeleton className="w-5 h-5 rounded bg-[#ece8dd]" />
                          {/* Status indicator */}
                          <div className={`w-4 h-4 rounded-full ${
                            j === 1 ? 'bg-[#1f8f4d]' :
                            j === 2 ? 'border-2 border-[#111111] border-t-transparent animate-spin' :
                            'border border-[#d7d0c3]'
                          }`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats preview */}
            <div className="mt-6 pt-6 border-t border-[#ece8dd] space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-apercu text-[12px] uppercase tracking-[0.3em] text-[#8b867c]">Analyzing responses...</span>
                <Skeleton className="h-6 w-16 bg-[#ece8dd]" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <Skeleton className="h-8 w-16 mx-auto bg-[#ece8dd]" />
                    <Skeleton className="h-3 w-20 mx-auto bg-[#ece8dd]" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
