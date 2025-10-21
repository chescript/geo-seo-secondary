import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ScrapingSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="p-6 bg-card text-card-foreground rounded-xl border shadow-sm border-gray-200">
          <CardHeader className="pb-6">
            <div className="flex items-start gap-4">
              {/* Logo skeleton */}
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

              <div className="flex-1 space-y-3">
                {/* Company name skeleton */}
                <Skeleton className="h-7 w-48" />

                {/* Description skeleton */}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                {/* Industry badge skeleton */}
                <Skeleton className="h-6 w-32 rounded-full mt-2" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Scraping progress */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-600">Analyzing website content...</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-orange-500 h-2 rounded-full animate-pulse w-2/3" />
              </div>
            </div>

            {/* Competitor previews skeleton */}
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-md" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
