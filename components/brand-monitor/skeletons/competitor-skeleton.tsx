import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompetitorSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="p-6 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold">
              Identifying Competitors
            </CardTitle>

            {/* Progress indicator */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-600">Analyzing market landscape...</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-orange-500 h-2 rounded-full animate-[pulse_2s_ease-in-out_infinite] w-1/2" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Competitor cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-gray-200 bg-white animate-in fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    {/* Favicon skeleton */}
                    <Skeleton className="w-8 h-8 rounded flex-shrink-0" />

                    <div className="flex-1 space-y-2">
                      {/* Company name */}
                      <Skeleton className="h-4 w-32" />
                      {/* URL */}
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats skeleton */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
