export interface AutumnProduct {
  id: string;
  name: string;
  description?: string;
  type: 'service' | 'physical' | 'addon';
  display?: {
    name?: string;
    description?: string;
    recommend_text?: string;
    button_text?: string;
    button_url?: string;
    everything_from?: string;
  };
  properties?: {
    interval?: 'month' | 'year' | 'one_time';
    interval_group?: 'month' | 'year';
    is_free?: boolean;
  };
  items: Array<{
    id: string;
    type: 'flat' | 'unit' | 'tier';
    display?: {
      primary_text?: string;
      secondary_text?: string;
    };
    flat?: {
      amount: number;
    };
    unit?: {
      amount: number;
      quantity?: number;
    };
  }>;
}

export const AUTUMN_PRODUCTS: AutumnProduct[] = [
  {
    id: 'free',
    name: 'Free Plan',
    description: 'For all your messaging needs',
    type: 'service',
    display: {
      name: 'Free Plan',
      description: 'For all your messaging needs',
      button_text: 'Get Started',
    },
    properties: {
      is_free: true,
    },
    items: [
      {
        id: 'free-analyses',
        type: 'unit',
        display: {
          primary_text: '10 analyses per month',
          secondary_text: 'Perfect for getting started',
        },
        unit: {
          amount: 0,
          quantity: 10,
        },
      },
      {
        id: 'free-support',
        type: 'unit',
        display: {
          primary_text: 'Community support',
          secondary_text: 'Get help from our community',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'free-features',
        type: 'unit',
        display: {
          primary_text: 'Basic features',
          secondary_text: 'Quick AI-readiness check',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'free-seo',
        type: 'unit',
        display: {
          primary_text: 'SEO & metadata score',
          secondary_text: 'Basic optimization insights',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'free-compatibility',
        type: 'unit',
        display: {
          primary_text: 'Basic LLM compatibility check',
          secondary_text: 'Essential compatibility testing',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
    ],
  },
  {
    id: 'pro',
    name: 'FireGEO Brand Monitor',
    description: 'Perfect for trying out our service',
    type: 'service',
    display: {
      name: 'FireGEO Brand Monitor',
      description: 'Perfect for trying out our service',
      button_text: 'Get started',
      recommend_text: 'POPULAR',
    },
    properties: {
      interval: 'month',
      interval_group: 'month',
    },
    items: [
      {
        id: 'pro-price',
        type: 'flat',
        display: {
          primary_text: '$10/m',
          secondary_text: '*Billed monthly',
        },
        flat: {
          amount: 1000, // Amount in cents ($10.00)
        },
      },
      {
        id: 'pro-analyses',
        type: 'unit',
        display: {
          primary_text: '100 analyses per month',
          secondary_text: 'More than enough for most businesses',
        },
        unit: {
          amount: 0,
          quantity: 100,
        },
      },
      {
        id: 'pro-support',
        type: 'unit',
        display: {
          primary_text: 'Premium support',
          secondary_text: 'Priority email and chat support',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'pro-priority',
        type: 'unit',
        display: {
          primary_text: 'Priority access',
          secondary_text: 'Skip the queue for faster results',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'pro-tracking',
        type: 'unit',
        display: {
          primary_text: 'Real-time brand tracking across all AI models',
          secondary_text: 'Monitor your visibility everywhere',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'pro-competitor',
        type: 'unit',
        display: {
          primary_text: 'Competitor analysis and ranking',
          secondary_text: 'See how you stack up',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'pro-insights',
        type: 'unit',
        display: {
          primary_text: 'Actionable insights & recommendations',
          secondary_text: 'Get specific steps to improve',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
      {
        id: 'pro-alerts',
        type: 'unit',
        display: {
          primary_text: 'Email alerts for visibility changes',
          secondary_text: 'Stay informed automatically',
        },
        unit: {
          amount: 0,
          quantity: 1,
        },
      },
    ],
  },
];

export const AUTUMN_ADDONS: AutumnProduct[] = [];