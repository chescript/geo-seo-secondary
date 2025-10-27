'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
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
  isAuthenticated = false
}: EnhancedPricingTableProps) {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const router = useRouter();
  const { hasProSubscription, subscriptionTier, isLoading: subscriptionLoading } = useSubscription();
  const { attach } = useCustomer();

  const handlePlanAction = async (productId: string) => {
    setLoadingProductId(productId);

    try {
      if (!isAuthenticated) {
        // Redirect to register with plan preselected
        router.push(`/register?plan=${productId}`);
        return;
      }

      // Check if this is the current plan
      if (productId === subscriptionTier) {
        setLoadingProductId(null);
        return; // Do nothing, button should be disabled
      }

      // Handle Pro upgrade
      if (productId === 'pro' && subscriptionTier === 'free') {
        await attach({
          productId: 'pro',
          returnUrl: window.location.origin + '/plans?success=true',
          successUrl: window.location.origin + '/plans?success=true',
          cancelUrl: window.location.origin + '/plans',
        });
      }
      // Handle downgrade to free (if needed)
      else if (productId === 'free' && subscriptionTier === 'pro') {
        // You might want to show a confirmation dialog here
        // For now, we'll just show a message
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
    if (!isAuthenticated) {
      return 'Get Started';
    }

    if (subscriptionLoading) {
      return 'Loading...';
    }

    if (productId === subscriptionTier) {
      return 'Current Plan';
    }

    if (productId === 'pro') {
      return 'Upgrade to Pro';
    }

    if (productId === 'free') {
      return 'Downgrade';
    }

    return 'Select Plan';
  };

  const isCurrentPlan = (productId: string): boolean => {
    return isAuthenticated && productId === subscriptionTier;
  };

  const isButtonDisabled = (productId: string): boolean => {
    return isCurrentPlan(productId) || loadingProductId !== null || subscriptionLoading;
  };

  const hasRecommended = products.some((p) => p.recommendText);

  return (
    <div className="flex items-center flex-col">
      {/* Subscription Status Banner for Authenticated Users */}
      {isAuthenticated && !subscriptionLoading && (
        <div className="w-full mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                {hasProSubscription ? (
                  <Sparkles className="w-6 h-6 text-white" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {hasProSubscription ? 'Pro Plan' : 'Free Plan'}
                </h3>
                <p className="text-sm text-gray-600">
                  {hasProSubscription
                    ? 'You have unlimited access to all features'
                    : 'Upgrade to unlock all premium features'}
                </p>
              </div>
            </div>
            {!hasProSubscription && (
              <button
                onClick={() => handlePlanAction('pro')}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-6",
          hasRecommended && "!py-10"
        )}
      >
        {products.map((product) => {
          const isCurrent = isCurrentPlan(product.id);
          const isRecommended = !!product.recommendText;

          return (
            <div
              key={product.id}
              className={cn(
                "relative w-full h-full py-6 text-foreground border-2 rounded-xl shadow-sm transition-all duration-300 max-w-xl",
                isRecommended && "lg:-translate-y-6 lg:shadow-lg lg:h-[calc(100%+48px)]",
                isCurrent
                  ? "border-green-500 bg-green-50/50 shadow-lg"
                  : "border-gray-200 hover:border-orange-300 hover:shadow-md",
                isRecommended && !isCurrent && "bg-orange-50/30 border-orange-300"
              )}
            >
              {/* Current Plan Badge */}
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Current Plan
                </div>
              )}

              {/* Recommended Badge */}
              {product.recommendText && !isCurrent && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 absolute border-2 border-orange-400 text-white text-sm font-medium lg:rounded-full px-3 lg:py-1 lg:top-4 lg:right-4 top-[-1px] right-[-1px] rounded-bl-lg shadow-md">
                  {product.recommendText}
                </div>
              )}

              <div
                className={cn(
                  "flex flex-col h-full flex-grow",
                  isRecommended && "lg:translate-y-6"
                )}
              >
                <div className="h-full">
                  <div className="flex flex-col">
                    <div className="pb-4 px-6">
                      <h2 className="text-2xl font-bold truncate flex items-center gap-2">
                        {product.name || product.id}
                        {isCurrent && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </h2>
                      {product.description && (
                        <div className="text-sm text-muted-foreground h-8 mt-1">
                          <p className="line-clamp-2">{product.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <h3 className={cn(
                        "font-bold text-3xl h-16 flex px-6 items-center border-y mb-4",
                        isCurrent ? "bg-green-50/50" : "bg-gray-50"
                      )}>
                        <div className="line-clamp-2">
                          {product.price.primaryText}{' '}
                          {product.price.secondaryText && (
                            <span className="font-normal text-base text-muted-foreground mt-1">
                              {product.price.secondaryText}
                            </span>
                          )}
                        </div>
                      </h3>
                    </div>
                  </div>
                  {product.items.length > 0 && (
                    <div className="flex-grow px-6 mb-6">
                      <div className="space-y-3">
                        {product.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <Check className={cn(
                              "h-4 w-4 flex-shrink-0 mt-0.5",
                              isCurrent ? "text-green-600" : "text-orange-500"
                            )} />
                            <div className="flex flex-col">
                              <span className="font-medium">{item.primaryText}</span>
                              {item.secondaryText && (
                                <span className="text-sm text-muted-foreground">
                                  {item.secondaryText}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className={cn("px-6", isRecommended && "lg:-translate-y-12")}>
                  <button
                    onClick={() => handlePlanAction(product.id)}
                    disabled={isButtonDisabled(product.id)}
                    className={cn(
                      "w-full py-3 px-4 group overflow-hidden relative transition-all duration-300 border-2 rounded-xl inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold disabled:cursor-not-allowed",
                      isCurrent
                        ? "bg-green-500 text-white border-green-600 opacity-75"
                        : isRecommended
                        ? "btn-firecrawl-orange border-orange-500"
                        : "btn-firecrawl-default hover:border-orange-400"
                    )}
                  >
                    {loadingProductId === product.id ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full transition-transform duration-300 group-hover:-translate-y-[150%]">
                        <span>{getButtonText(product.id)}</span>
                        {!isCurrent && <span className="text-sm">→</span>}
                      </div>
                    )}
                    {!isCurrent && !loadingProductId && (
                      <div className="flex items-center justify-between w-full absolute inset-x-0 px-4 translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0">
                        <span>{getButtonText(product.id)}</span>
                        <span className="text-sm">→</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
