import { SubscriptionTier, TokenPrice } from '../types/billing';

// ProSe Plans
export const proseSubscriptionTiers: SubscriptionTier[] = [
  {
    id: 'prose-basic',
    name: 'Basic',
    description: 'Perfect for individuals getting started',
    price: 2900, // $29/month
    interval: 'monthly',
    features: [
      '1,000 tokens included',
      'Basic document templates',
      'Email support',
      '5 documents/month',
      'Basic AI features'
    ],
    tokensIncluded: 1000,
    maxUsers: 1,
    maxStorage: 5, // 5GB
    supportLevel: 'basic',
    apiAccess: false,
    customBranding: false,
    advancedAnalytics: false
  },
  {
    id: 'prose-professional',
    name: 'Professional',
    description: 'For individuals who need more power',
    price: 7900, // $79/month
    interval: 'monthly',
    features: [
      '5,000 tokens included',
      'Advanced document templates',
      'Priority support',
      'Unlimited documents',
      'Advanced AI features',
      'Document analytics'
    ],
    tokensIncluded: 5000,
    maxUsers: 1,
    maxStorage: 20, // 20GB
    supportLevel: 'priority',
    apiAccess: true,
    customBranding: false,
    advancedAnalytics: true
  },
  {
    id: 'prose-payg',
    name: 'Pay As You Go',
    description: 'Perfect for occasional use',
    price: 0, // No base fee
    interval: 'monthly',
    features: [
      'Pay per token used',
      'Pay per document',
      'Basic features',
      'Email support',
      'No monthly commitment'
    ],
    tokensIncluded: 0,
    maxUsers: 1,
    maxStorage: 1, // 1GB
    supportLevel: 'basic',
    apiAccess: false,
    customBranding: false,
    advancedAnalytics: false
  }
];

// Law Firm Plans
export const firmSubscriptionTiers: SubscriptionTier[] = [
  {
    id: 'firm-starter',
    name: 'Starter',
    description: 'Essential tools for small law firms',
    price: 19900, // $199/month
    interval: 'monthly',
    features: [
      '15,000 tokens included',
      'Up to 5 team members',
      '50GB storage',
      'Basic team features',
      'Standard support',
      'Basic analytics'
    ],
    tokensIncluded: 15000,
    maxUsers: 5,
    maxStorage: 50, // 50GB
    supportLevel: 'basic',
    apiAccess: true,
    customBranding: false,
    advancedAnalytics: false
  },
  {
    id: 'firm-business',
    name: 'Business',
    description: 'Advanced features for growing firms',
    price: 49900, // $499/month
    interval: 'monthly',
    features: [
      '50,000 tokens included',
      'Up to 20 team members',
      '200GB storage',
      'Advanced team features',
      'Priority support',
      'Advanced analytics',
      'Custom branding'
    ],
    tokensIncluded: 50000,
    maxUsers: 20,
    maxStorage: 200, // 200GB
    supportLevel: 'priority',
    apiAccess: true,
    customBranding: true,
    advancedAnalytics: true
  },
  {
    id: 'firm-enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large firms',
    price: 99900, // $999/month base
    interval: 'monthly',
    features: [
      'Custom token allocation',
      'Unlimited team members',
      'Unlimited storage',
      'Enterprise features',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantees'
    ],
    tokensIncluded: 150000,
    maxUsers: Infinity,
    maxStorage: Infinity,
    supportLevel: 'dedicated',
    apiAccess: true,
    customBranding: true,
    advancedAnalytics: true
  }
];

// Token Packages
export const tokenPrices: TokenPrice[] = [
  { amount: 1000, price: 999 },    // $9.99 for 1k tokens
  { amount: 5000, price: 3999 },   // $39.99 for 5k tokens
  { amount: 10000, price: 6999 },  // $69.99 for 10k tokens
  { amount: 25000, price: 14999 }, // $149.99 for 25k tokens
  { amount: 50000, price: 24999 }, // $249.99 for 50k tokens
  { amount: 100000, price: 39999 } // $399.99 for 100k tokens
];

// Token Usage Costs
export const tokenUsageCosts = {
  document_generation: 10,
  ai_analysis: 5,
  legal_research: 15,
  document_review: 8,
  court_filing: 20,
  case_analytics: 12,
  document_storage: 1,
  api_access: 2
};

export const volumeDiscounts = [
  { threshold: 10000, discount: 0.05 },  // 5% off for 10k+ tokens
  { threshold: 50000, discount: 0.10 },  // 10% off for 50k+ tokens
  { threshold: 100000, discount: 0.15 }, // 15% off for 100k+ tokens
  { threshold: 500000, discount: 0.20 }  // 20% off for 500k+ tokens
];

export const payPerDocumentPricing = {
  basic_contract: 50,    // 50 tokens
  complex_contract: 100, // 100 tokens
  legal_brief: 150,      // 150 tokens
  court_filing: 200,     // 200 tokens
  legal_research: 250    // 250 tokens
};

// Combined subscription tiers for easy access
export const subscriptionTiers = [...proseSubscriptionTiers, ...firmSubscriptionTiers];