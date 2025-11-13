'use client';

import { BrandMonitor } from '@/components/brand-monitor/brand-monitor';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useBrandAnalyses, useBrandAnalysis, useDeleteBrandAnalysis } from '@/hooks/useBrandAnalyses';
import { useSession } from '@/lib/auth-client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AnalysisDropdown } from '@/components/brand-monitor/analysis-dropdown';
import { AnalysisHistoryModal } from '@/components/brand-monitor/analysis-history-modal';
import { UsageCounter } from '@/components/brand-monitor/usage-counter';

// Separate component that uses subscription hooks
function BrandMonitorContent({ session }: { session: any }) {
  const router = useRouter();
  const { isLoading: subscriptionLoading } = useSubscription();
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  // Queries and mutations
  const { data: analyses, isLoading: analysesLoading, error: analysesError } = useBrandAnalyses();
  const { data: currentAnalysis } = useBrandAnalysis(selectedAnalysisId);
  const deleteAnalysis = useDeleteBrandAnalysis();

  const historyItems = useMemo(
    () =>
      (analyses ?? []).map(analysis => ({
        id: analysis.id,
        companyName: analysis.companyName ?? null,
        url: analysis.url,
        createdAt: analysis.createdAt,
        competitors: Array.isArray(analysis.competitors) ? analysis.competitors : undefined
      })),
    [analyses]
  );

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
      {/* Header with Usage Counter and Analysis Dropdown */}
      <div className="flex items-center justify-end gap-3 px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <UsageCounter />
        {analyses && analyses.length > 0 && (
          <AnalysisDropdown
            analyses={historyItems}
            currentAnalysisId={selectedAnalysisId}
            onSelectAnalysis={setSelectedAnalysisId}
            onDeleteAnalysis={handleDeleteAnalysis}
            onViewAll={() => setHistoryModalOpen(true)}
            isLoading={analysesLoading}
          />
        )}
      </div>

      {/* Main Content */}
      <BrandMonitor
        selectedAnalysis={selectedAnalysisId ? currentAnalysis : null}
        onSaveAnalysis={(analysis) => {
          // Automatically select the newly saved analysis
          setSelectedAnalysisId(analysis.id);
        }}
      />

      {/* History Modal for View All */}
      <AnalysisHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        analyses={historyItems}
        currentAnalysisId={selectedAnalysisId}
        onSelectAnalysis={(id) => {
          setSelectedAnalysisId(id);
          setHistoryModalOpen(false);
        }}
        onDeleteAnalysis={handleDeleteAnalysis}
      />

      {/* Delete Confirmation Dialog */}
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

export default function DashboardPage() {
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
          <p>Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return <BrandMonitorContent session={session} />;
}
