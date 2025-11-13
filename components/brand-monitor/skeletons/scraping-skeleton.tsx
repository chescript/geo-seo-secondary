import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ScrapingSkeleton() {
  return (
    <div className="flex items-center justify-center animate-in fade-in duration-500">
      <div className="max-w-4xl w-full">
        <Card className="analysis-card p-6 text-[#111111] gap-6">
          <CardHeader className="pb-6 font-apercu">
            <div className="flex items-start gap-4">
              {/* Logo skeleton */}
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0 bg-[#ece8dd]" />

              <div className="flex-1 space-y-3">
                {/* Company name skeleton */}
                <Skeleton className="h-7 w-48 bg-[#ece8dd]" />

                {/* Description skeleton */}
                <Skeleton className="h-4 w-full bg-[#ece8dd]" />
                <Skeleton className="h-4 w-3/4 bg-[#ece8dd]" />

                {/* Industry badge skeleton */}
                <Skeleton className="h-6 w-32 rounded-full mt-2 bg-[#ece8dd]" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Scraping progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                  <span className="font-sans text-[14px] text-[#4a473f]">Analyzing website content...</span>
                </div>
                <span className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#8b867c]">~30-60s</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#e8e1d5] rounded-full h-2 overflow-hidden">
                <div className="bg-[#111111] h-2 rounded-full animate-pulse w-2/3" />
              </div>
            </div>

            {/* Competitor previews skeleton */}
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-32 bg-[#ece8dd]" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-md bg-[#ece8dd]" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
