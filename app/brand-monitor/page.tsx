'use client';

import { BrandMonitor } from '@/components/brand-monitor/brand-monitor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useBrandAnalyses, useBrandAnalysis, useDeleteBrandAnalysis } from '@/hooks/useBrandAnalyses';
import { useSession } from '@/lib/auth-client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AnalysisHistoryBar } from '@/components/brand-monitor/analysis-history-bar';

// Separate component that uses subscription hooks
function BrandMonitorContent({ session }: { session: any }) {
  const router = useRouter();
  const { isLoading: subscriptionLoading } = useSubscription();
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);

  // Queries and mutations
  const { data: analyses, isLoading: analysesLoading, error: analysesError } = useBrandAnalyses();
  const { data: currentAnalysis } = useBrandAnalysis(selectedAnalysisId);
  const deleteAnalysis = useDeleteBrandAnalysis();

  // Debug logging
  console.log('Brand Monitor Debug:', {
    analyses,
    analysesLoading,
    analysesError,
    analysesLength: analyses?.length,
    userId: session?.user?.id
  });

  // Show loading state
  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-landing-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-landing-muted" />
      </div>
    );
  }

  // Free users can now access brand monitor with usage limits (10/month)
  // Usage limits are enforced at the API level
  
  const handleDeleteAnalysis = async (analysisId: string) => {
    setAnalysisToDelete(analysisId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (analysisToDelete) {
      await deleteAnalysis.mutateAsync(analysisToDelete);
      if (selectedAnalysisId === analysisToDelete) {
        setSelectedAnalysisId(null);
      }
      setAnalysisToDelete(null);
    }
  };
  
  const handleNewAnalysis = () => {
    setSelectedAnalysisId(null);
  };

  return (
    <div className="min-h-screen bg-landing-background text-landing-base">
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-landing-border bg-landing-card px-4 py-2 font-apercu text-[11px] uppercase tracking-[0.4em] text-landing-muted">
            AI Brand Visibility
          </span>
          <div className="space-y-4">
            <h1 className="font-neueBit text-[56px] leading-[0.9]">Monitor how AI introduces your brand.</h1>
            <p className="font-apercu text-[14px] uppercase tracking-[0.32em] text-landing-body max-w-3xl mx-auto">
              Compare ChatGPT, Claude, Perplexity, and more from a single workspace. Capture deltas, gather competitors, and push fixes faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'LLM surfaces watched', value: '6' },
              { label: 'Historical crawls', value: analyses?.length || 0 },
              { label: 'Avg. crawl time', value: '~90s' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-landing-border bg-landing-card px-6 py-4 text-left">
                <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">{stat.label}</p>
                <p className="font-neueBit text-[32px] leading-[0.9] mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full">
        {/* Analysis History Bar */}
        <AnalysisHistoryBar
          analyses={analyses || []}
          currentAnalysisId={selectedAnalysisId}
          onSelectAnalysis={setSelectedAnalysisId}
          onDeleteAnalysis={handleDeleteAnalysis}
          isLoading={analysesLoading}
        />

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <BrandMonitor
            selectedAnalysis={selectedAnalysisId ? currentAnalysis : null}
            onSaveAnalysis={(analysis) => {
              // Automatically select the newly saved analysis
              setSelectedAnalysisId(analysis.id);
            }}
          />
        </div>
      </div>
      
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Analysis"
        description="Are you sure you want to delete this analysis? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        isLoading={deleteAnalysis.isPending}
      />
    </div>
  );
}

export default function BrandMonitorPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-landing-background flex items-center justify-center text-landing-base">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-landing-background flex items-center justify-center text-landing-base">
        <div className="text-center space-y-2">
          <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted">Authentication required</p>
          <p>Please log in to access the brand monitor.</p>
        </div>
      </div>
    );
  }

  return <BrandMonitorContent session={session} />;
}



