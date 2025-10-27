'use client';

import { useCustomer } from '@/hooks/useAutumnCustomer';
import { SUBSCRIPTION_TIERS } from '@/config/constants';

export function useSubscription() {
  const { customer, isLoading, error } = useCustomer();

  const hasProSubscription = () => {
    if (!customer || !customer.products) {
      return false;
    }

    // Check if user has the Pro product attached
    return customer.products.some(
      (product: any) => product.id === SUBSCRIPTION_TIERS.PRO
    );
  };

  const subscriptionTier = hasProSubscription()
    ? SUBSCRIPTION_TIERS.PRO
    : SUBSCRIPTION_TIERS.FREE;

  return {
    customer,
    hasProSubscription: hasProSubscription(),
    subscriptionTier,
    isLoading,
    error,
  };
}
