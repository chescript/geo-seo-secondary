'use client';

import { BrandMonitor } from '@/components/brand-monitor/brand-monitor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useBrandAnalyses, useBrandAnalysis, useDeleteBrandAnalysis } from '@/hooks/useBrandAnalyses';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useSession } from '@/lib/auth-client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Separate component that uses subscription hooks
function BrandMonitorContent({ session }: { session: any }) {
  const router = useRouter();
  const { isLoading: subscriptionLoading } = useSubscription();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);

  // Queries and mutations
  const { data: analyses, isLoading: analysesLoading } = useBrandAnalyses();
  const { data: currentAnalysis } = useBrandAnalysis(selectedAnalysisId);
  const deleteAnalysis = useDeleteBrandAnalysis();

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

      <div className="flex relative overflow-hidden">
        {/* Sidebar Toggle Button - Always visible */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-8 z-20 p-2 rounded-full border border-landing-border bg-landing-card shadow-sm transition-all duration-200 ${
            sidebarOpen ? 'left-[324px]' : 'left-6'
          }`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="h-4 w-4 text-landing-body" />
          ) : (
            <Menu className="h-4 w-4 text-landing-body" />
          )}
        </button>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-landing-card border-r border-landing-border flex flex-col transition-all duration-300 overflow-hidden`}>
          <div className="p-3 border-b border-landing-border flex-shrink-0">
            <Button
              onClick={handleNewAnalysis}
              className="w-full rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] text-white text-sm font-medium hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          <div className="overflow-y-auto overflow-x-hidden flex-1 p-2 scrollbar-thin">
            {analysesLoading ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-2">
                <Loader2 className="h-6 w-6 animate-spin text-landing-muted" />
                <p className="text-sm text-landing-muted">Loading...</p>
              </div>
            ) : analyses?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-sm text-landing-muted">
                No analyses yet
              </div>
            ) : (
              <div className="space-y-1">
                {analyses?.map((analysis) => {
                  const isSelected = selectedAnalysisId === analysis.id;
                  const numCompetitors = analysis.competitors?.length || 0;

                  return (
                    <div
                      key={analysis.id}
                      className={cn(
                        'relative rounded-[18px] px-4 py-3 cursor-pointer transition-all duration-150 group border border-transparent',
                        isSelected ? 'bg-landing-card border-landing-base' : 'hover:border-landing-border'
                      )}
                      onClick={() => setSelectedAnalysisId(analysis.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-neueBit text-sm truncate">{analysis.companyName || 'Untitled analysis'}</h3>
                          <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-landing-muted truncate mt-1">
                            {analysis.url}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-landing-muted">
                            {analysis.createdAt && format(new Date(analysis.createdAt), 'MMM d, yyyy')}
                            {numCompetitors > 0 && <span>{numCompetitors} competitors</span>}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAnalysis(analysis.id);
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-landing-muted hover:text-red-600" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
            <BrandMonitor
              selectedAnalysis={selectedAnalysisId ? currentAnalysis : null}
              onSaveAnalysis={(analysis) => {
                // This will be called when analysis completes
                // We'll implement this in the next step
              }}
            />
          </div>
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



