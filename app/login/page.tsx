import { Metadata } from 'next';
import LoginPageClient from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Login - Geoscanner Platform',
  description: 'Access your Geoscanner dashboard to track your brand\'s AI visibility and analytics.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}
