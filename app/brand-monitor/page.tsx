'use client';

import { BrandMonitor } from '@/components/brand-monitor/brand-monitor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Menu, X, Plus, Trash2, Loader2, Globe, Calendar, TrendingUp, Users } from 'lucide-react';
import { useCustomer, useRefreshCustomer } from '@/hooks/useAutumnCustomer';
import { useBrandAnalyses, useBrandAnalysis, useDeleteBrandAnalysis } from '@/hooks/useBrandAnalyses';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useSession } from '@/lib/auth-client';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import Image from 'next/image';

// Separate component that uses Autumn hooks
function BrandMonitorContent({ session }: { session: any }) {
  const router = useRouter();
  const { customer, isLoading, error } = useCustomer();
  const refreshCustomer = useRefreshCustomer();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [analysisToDelete, setAnalysisToDelete] = useState<string | null>(null);
  
  // Queries and mutations
  const { data: analyses, isLoading: analysesLoading } = useBrandAnalyses();
  const { data: currentAnalysis } = useBrandAnalysis(selectedAnalysisId);
  const deleteAnalysis = useDeleteBrandAnalysis();
  
  // Get credits from customer data
  const messageUsage = customer?.features?.messages;
  const credits = messageUsage ? (messageUsage.balance || 0) : 0;

  useEffect(() => {
    // If there's an auth error, redirect to login
    if (error?.code === 'UNAUTHORIZED' || error?.code === 'AUTH_ERROR') {
      router.push('/login');
    }
  }, [error, router]);

  const handleCreditsUpdate = async () => {
    // Use the global refresh to update customer data everywhere
    await refreshCustomer();
  };
  
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 border-b border-gray-200">
        {/* Animated background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center">
              {/* Badge */}
              <div className="mb-6 animate-fade-in-up">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium border border-orange-200">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Brand Analysis
                </span>
              </div>

              <div className="text-center flex-1">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <span className="block text-gray-900">FireGEO Monitor</span>
                  <span className="block bg-gradient-to-r from-orange-600 via-red-500 to-red-600 bg-clip-text text-transparent mt-2">
                    AI Brand Visibility
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Track how ChatGPT, Claude, and other AI platforms rank your brand
                </p>
                <p className="text-base text-gray-500 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  Real-time insights into your brand visibility across AI models
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative overflow-hidden">
        {/* Sidebar Toggle Button - Always visible */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-4 z-20 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition-all duration-200 border border-gray-200 ${
            sidebarOpen ? 'left-[324px]' : 'left-4'
          }`}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X className="h-4 w-4 text-gray-600" />
          ) : (
            <Menu className="h-4 w-4 text-gray-600" />
          )}
        </button>

        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}>
          <div className="p-3 border-b border-gray-200 flex-shrink-0">
            <Button
              onClick={handleNewAnalysis}
              className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          <div className="overflow-y-auto overflow-x-hidden flex-1 p-2 scrollbar-thin">
            {analysesLoading ? (
              <div className="flex flex-col items-center justify-center p-8 space-y-2">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <p className="text-sm text-gray-500">Loading...</p>
              </div>
            ) : analyses?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-sm text-gray-400">No analyses yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {analyses?.map((analysis) => {
                  const isSelected = selectedAnalysisId === analysis.id;
                  const numCompetitors = analysis.competitors?.length || 0;
                  const numProviders = analysis.analysisData?.selectedProviders?.length || 0;

                  return (
                    <div
                      key={analysis.id}
                      className={`relative px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 group ${
                        isSelected
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedAnalysisId(analysis.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate text-gray-900">
                            {analysis.companyName || 'Untitled Analysis'}
                          </h3>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {analysis.url}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-400">
                              {analysis.createdAt && format(new Date(analysis.createdAt), 'MMM d, yyyy')}
                            </span>
                            {numCompetitors > 0 && (
                              <span className="text-xs text-gray-400">
                                {numCompetitors} competitors
                              </span>
                            )}
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
                          <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-600" />
                        </Button>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gray-900 rounded-r" />
                      )}
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
              creditsAvailable={credits} 
              onCreditsUpdate={handleCreditsUpdate}
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access the brand monitor</p>
        </div>
      </div>
    );
  }

  return <BrandMonitorContent session={session} />;
}