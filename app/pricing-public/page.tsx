import { Metadata } from 'next';
import PricingPublicClient from './PricingPublicClient';

export const metadata: Metadata = {
  title: 'Geoscanner Pricing - AI Brand Visibility Solutions',
  description: 'Transparent pricing for AI brand monitoring. Track your brand\'s visibility across leading AI models with flexible plans.',
};

export default function PublicPricingPage() {
  return <PricingPublicClient />;
}
