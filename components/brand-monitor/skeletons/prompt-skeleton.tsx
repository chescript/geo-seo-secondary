import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="p-6 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Generating Analysis Prompts
              </CardTitle>

              {/* Competitors preview */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Competitors:</span>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
              </div>
            </div>

            <CardDescription className="mt-3 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <span>Creating AI-powered analysis prompts...</span>
            </CardDescription>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-2 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4" />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Prompt tiles skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-lg border border-gray-200 p-5 animate-in fade-in"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="space-y-3">
                    {/* Prompt text skeleton */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />

                    {/* Provider icons skeleton */}
                    <div className="flex items-center gap-3 justify-end pt-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="w-5 h-5 rounded" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons skeleton */}
            <div className="flex justify-between items-center pt-4">
              <Skeleton className="h-9 w-32 rounded-lg" />
              <Skeleton className="h-10 w-40 rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
