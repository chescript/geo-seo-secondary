import { Metadata } from 'next';
import PlansPageClient from './PlansPageClient';

export const metadata: Metadata = {
  title: 'Pricing Plans - Geoscanner AI Brand Monitoring',
  description: 'Choose the perfect plan for your brand monitoring needs. From free AI-readiness checks to enterprise-level brand tracking across AI models.',
};

export default function PricingPage() {
  return <PlansPageClient />;
}
