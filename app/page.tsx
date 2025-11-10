import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Geoscanner - AI Brand Visibility Platform | Free AI-Readiness Checker',
  description: 'Future-proof your brand in the AI web. Get a free AI-readiness analysis and track how leading AI models rank your brand visibility.',
};

export default function HomePage() {
  return <HomePageClient />;
}
