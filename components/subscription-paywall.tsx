'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionPaywallProps {
  featureName: string;
  description?: string;
  features?: string[];
}

export function SubscriptionPaywall({
  featureName,
  description,
  features = []
}: SubscriptionPaywallProps) {
  const defaultFeatures = features.length > 0 ? features : [
    'Unlimited brand monitoring analyses',
    'Unlimited AI chat conversations',
    'Access to all AI models',
    'Priority support',
    'Advanced analytics and insights'
  ];

  return (
    <div className="flex items-center justify-center min-h-[600px] p-4">
      <Card className="max-w-2xl w-full border-2 border-orange-200 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Upgrade to Pro
          </CardTitle>
          <CardDescription className="text-lg">
            {description || `${featureName} is only available on the Pro plan`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              What you'll get with Pro:
            </h3>
            <ul className="space-y-3">
              {defaultFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Sparkles className="w-3 h-3 text-orange-600" />}
                    {index === 1 && <Zap className="w-3 h-3 text-orange-600" />}
                    {index === 2 && <TrendingUp className="w-3 h-3 text-orange-600" />}
                    {index > 2 && <div className="w-2 h-2 rounded-full bg-orange-600" />}
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-lg font-semibold"
            >
              <Link href="/plans">
                Upgrade to Pro
              </Link>
            </Button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Cancel anytime • No hidden fees
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
