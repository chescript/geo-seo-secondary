'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Loader2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { useCustomer } from '@/hooks/useAutumnCustomer';

interface PricingProduct {
  id: string;
  name?: string;
  description?: string;
  recommendText?: string;
  price: {
    primaryText: string;
    secondaryText?: string;
  };
  items: Array<{
    primaryText: string;
    secondaryText?: string;
  }>;
}

interface EnhancedPricingTableProps {
  products: PricingProduct[];
  isAuthenticated?: boolean;
}

export default function EnhancedPricingTable({
  products,
  isAuthenticated = false,
}: EnhancedPricingTableProps) {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const router = useRouter();
  const { hasProSubscription, subscriptionTier, isLoading: subscriptionLoading } = useSubscription();
  const { attach } = useCustomer();

  const handlePlanAction = async (productId: string) => {
    setLoadingProductId(productId);

    try {
      if (!isAuthenticated) {
        router.push(`/register?plan=${productId}`);
        return;
      }

      if (productId === subscriptionTier) {
        setLoadingProductId(null);
        return;
      }

      if (productId === 'pro' && subscriptionTier === 'free') {
        await attach({
          productId: 'pro',
          returnUrl: `${window.location.origin}/plans?success=true`,
          successUrl: `${window.location.origin}/plans?success=true`,
          cancelUrl: `${window.location.origin}/plans`,
        });
      } else if (productId === 'free' && subscriptionTier === 'pro') {
        alert('To downgrade, please contact support or cancel your subscription from the dashboard.');
      }
    } catch (error) {
      console.error('Error handling plan action:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoadingProductId(null);
    }
  };

  const getButtonText = (productId: string): string => {
    if (!isAuthenticated) return 'Get started';
    if (subscriptionLoading) return 'Loading...';
    if (productId === subscriptionTier) return 'Current plan';
    if (productId === 'pro') return 'Upgrade to FireGEO Brand Monitor';
    if (productId === 'free') return 'Downgrade';
    return 'Select plan';
  };

  const isCurrentPlan = (productId: string) => isAuthenticated && productId === subscriptionTier;
  const isButtonDisabled = (productId: string) =>
    isCurrentPlan(productId) || loadingProductId !== null || subscriptionLoading;

  return (
    <div className="space-y-8 w-full">
      {isAuthenticated && !subscriptionLoading && (
        <div className="rounded-[32px] border border-[#ece8dd] bg-white/95 px-6 py-5 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#2b2b2b] to-[#050505] text-white flex items-center justify-center">
                {hasProSubscription ? <Sparkles className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <p className="font-neueBit text-[20px]">
                  {hasProSubscription ? 'FireGEO Brand Monitor active' : 'Free Plan'}
                </p>
                <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#6a665d]">
                  {hasProSubscription ? '100 analyses per month' : 'Upgrade for 100 analyses per month'}
                </p>
              </div>
            </div>
            {!hasProSubscription && (
              <button
                onClick={() => handlePlanAction('pro')}
                className="inline-flex items-center gap-2 rounded-full border border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] px-5 py-2 text-sm font-medium text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
              >
                Upgrade now <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => {
          const isCurrent = isCurrentPlan(product.id);
          const isRecommended = !!product.recommendText;

          return (
            <div
              key={product.id}
              className={cn(
                'relative rounded-[32px] border border-[#ece8dd] bg-white/95 p-8 shadow-[0_35px_80px_rgba(0,0,0,0.06)] transition-all',
                isRecommended && 'md:-translate-y-4 md:shadow-[0_45px_110px_rgba(0,0,0,0.12)] border-[#111111]'
              )}
            >
              {isCurrent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#111111] px-4 py-1 text-xs font-medium text-white">
                  Current plan
                </div>
              )}
              {isRecommended && !isCurrent && (
                <div className="absolute -top-4 right-8 rounded-full border border-[#111111]/30 bg-[#111111] px-3 py-1 text-xs font-medium text-white">
                  {product.recommendText}
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="font-apercu text-[11px] uppercase tracking-[0.3em] text-[#6a665d]">
                    {product.description}
                  </p>
                  <h3 className="font-neueBit text-[36px] leading-[0.9]">{product.name || product.id}</h3>
                  <div className="flex flex-wrap items-baseline gap-2 text-[#4a473f]">
                    <span className="font-neueBit text-[32px] leading-none">{product.price.primaryText}</span>
                    {product.price.secondaryText && (
                      <span className="text-sm text-[#6a665d]">{product.price.secondaryText}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4">
                  {product.items.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="mt-1 h-4 w-4 rounded-[6px] border border-[#d7d0c3] flex items-center justify-center">
                        <Check className="h-3 w-3 text-[#111111]" />
                      </div>
                      <div className="font-apercu text-sm text-[#4a473f]">
                        <p className="font-medium text-[#111111]">{item.primaryText}</p>
                        {item.secondaryText && (
                          <p className="text-xs text-[#6a665d]">{item.secondaryText}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanAction(product.id)}
                  disabled={isButtonDisabled(product.id)}
                  className={cn(
                    'w-full rounded-full border px-4 py-3 text-sm font-medium transition-all disabled:opacity-60',
                    isCurrent
                      ? 'border-[#d7d0c3] bg-[#f5f1e8] text-[#4a473f]'
                      : isRecommended
                      ? 'border-[#0f0f0f] bg-gradient-to-b from-[#2b2b2b] to-[#050505] text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)]'
                      : 'border-[#d7d0c3] text-[#111111] hover:border-[#111111]'
                  )}
                >
                  {loadingProductId === product.id ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {getButtonText(product.id)}
                      {!isCurrent && <ArrowRight className="w-4 h-4" />}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

