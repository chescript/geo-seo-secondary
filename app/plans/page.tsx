'use client';

import EnhancedPricingTable from '@/components/enhanced-pricing-table';
import { useSession } from '@/lib/auth-client';

// Static product details for unauthenticated users
const staticProducts = [
  {
    id: "free",
    name: "Free",
    description: "Access to homepage and dashboard",
    price: {
      primaryText: "Free",
      secondaryText: "No credit card required"
    },
    items: [
      {
        primaryText: "Homepage & Dashboard",
        secondaryText: "Rate limited access"
      },
      {
        primaryText: "Community support",
        secondaryText: "Get help from our community"
      },
      {
        primaryText: "Basic features",
        secondaryText: "Essential tools to get started"
      }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Unlimited access to all features",
    recommendText: "Most Popular",
    price: {
      primaryText: "$9.99/month",
      secondaryText: "billed monthly"
    },
    items: [
      {
        primaryText: "Brand Monitoring",
        secondaryText: "Unlimited analyses"
      },
      {
        primaryText: "AI Chat",
        secondaryText: "Unlimited conversations"
      },
      {
        primaryText: "Homepage & Dashboard",
        secondaryText: "Unlimited access"
      },
      {
        primaryText: "Premium support",
        secondaryText: "Priority email support"
      },
      {
        primaryText: "All features included",
        secondaryText: "Access to everything"
      }
    ]
  }
];

export default function PricingPage() {
  const { data: session, isPending } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold border border-orange-200">
              💎 Pricing Plans
            </span>
          </div>
          <h1 className="text-[3rem] lg:text-[4.5rem] font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Simple, transparent pricing
            </span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always flexible to scale up or down.
          </p>
          {session && (
            <p className="text-sm text-zinc-500 mt-4">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          )}
        </div>

        <div className="bg-white rounded-[20px] shadow-xl p-8 border-2 border-zinc-200">
          {isPending ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading pricing information...</p>
              </div>
            </div>
          ) : (
            <EnhancedPricingTable
              products={staticProducts}
              isAuthenticated={!!session}
            />
          )}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Powered by Stripe for safe and secure transactions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Cancel Anytime</h3>
            <p className="text-gray-600 text-sm">No long-term contracts, cancel your subscription anytime</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Get help whenever you need it from our support team</p>
          </div>
        </div>
      </div>
    </div>
  );
}