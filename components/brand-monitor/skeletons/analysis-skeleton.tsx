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
        <Card className="p-6 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold">
              Analysis in Progress
            </CardTitle>

            {/* Progress section */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  <span>{message}</span>
                </CardDescription>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>

              {/* Enhanced progress bar */}
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Prompt analysis tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-lg border border-gray-200 p-5"
                >
                  <div className="space-y-3">
                    {/* Prompt text skeleton */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>

                    {/* Provider status indicators */}
                    <div className="flex items-center gap-3 justify-end pt-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-1">
                          <Skeleton className="w-5 h-5 rounded" />
                          {/* Status indicator */}
                          <div className={`w-4 h-4 rounded-full ${
                            j === 1 ? 'bg-green-500' :
                            j === 2 ? 'border-2 border-orange-500 border-t-transparent animate-spin' :
                            'border border-gray-300'
                          }`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats preview */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Analyzing responses...</span>
                <Skeleton className="h-6 w-16" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <Skeleton className="h-8 w-16 mx-auto" />
                    <Skeleton className="h-3 w-20 mx-auto" />
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
