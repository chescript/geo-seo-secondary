import { Metadata } from 'next';
import RegisterPageClient from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Sign Up - Geoscanner AI Brand Monitoring',
  description: 'Create your Geoscanner account to start monitoring your brand\'s visibility across AI models. Free tier available.',
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}
