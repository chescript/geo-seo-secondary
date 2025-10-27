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
    name: 'Free',
    description: 'Access to homepage and dashboard',
    type: 'service',
    display: {
      name: 'Free',
      description: 'Access to homepage and dashboard with rate limits',
      button_text: 'Get Started',
    },
    properties: {
      is_free: true,
    },
    items: [
      {
        id: 'free-dashboard',
        type: 'unit',
        display: {
          primary_text: 'Homepage & Dashboard',
          secondary_text: 'Rate limited access',
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
    name: 'Pro',
    description: 'Unlimited access to all features',
    type: 'service',
    display: {
      name: 'Pro',
      description: 'Full access to brand monitoring, AI chat, and all features',
      button_text: 'Subscribe Now',
      recommend_text: 'Most Popular',
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
          primary_text: '$9.99',
          secondary_text: 'per month',
        },
        flat: {
          amount: 999, // Amount in cents
        },
      },
      {
        id: 'pro-brand-monitoring',
        type: 'unit',
        display: {
          primary_text: 'Brand Monitoring',
          secondary_text: 'Unlimited analyses',
        },
        unit: {
          amount: 0,
          quantity: 0, // 0 means unlimited
        },
      },
      {
        id: 'pro-ai-chat',
        type: 'unit',
        display: {
          primary_text: 'AI Chat',
          secondary_text: 'Unlimited conversations',
        },
        unit: {
          amount: 0,
          quantity: 0, // 0 means unlimited
        },
      },
      {
        id: 'pro-dashboard',
        type: 'unit',
        display: {
          primary_text: 'Homepage & Dashboard',
          secondary_text: 'Unlimited access',
        },
        unit: {
          amount: 0,
          quantity: 0, // 0 means unlimited
        },
      },
    ],
  },
];

export const AUTUMN_ADDONS: AutumnProduct[] = [];