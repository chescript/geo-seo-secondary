import { Metadata } from 'next';
import PricingDynamicClient from './PricingDynamicClient';

export const metadata: Metadata = {
  title: 'Get Started with Geoscanner - AI Brand Monitoring Pricing',
  description: 'View real-time pricing for Geoscanner\'s AI brand monitoring platform. Start with a free check or upgrade for comprehensive analytics.',
};

export default function DynamicPricingPage() {
  return <PricingDynamicClient />;
}
