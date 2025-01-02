export type BillingInterval = 'monthly' | 'yearly';
export type BillingType = 'subscription' | 'token';
export type BillingStatus = 'active' | 'past_due' | 'canceled' | 'trialing';
export type PaymentMethod = 'card' | 'bank_transfer' | 'paypal';

export interface TokenPrice {
  amount: number;  // Number of tokens
  price: number;   // Price in cents
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethod;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  price: number;   // Price in cents
  interval: BillingInterval;
  features: string[];
  tokensIncluded: number;
  maxUsers: number;
  maxStorage?: number; // Storage limit in GB
  supportLevel: 'basic' | 'priority' | 'dedicated';
  apiAccess: boolean;
  customBranding: boolean;
  advancedAnalytics: boolean;
}

export interface TokenUsage {
  userId: string;
  amount: number;
  timestamp: Date;
  action: string;
  cost: number;
}

export interface BillingInvoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'void';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  paymentMethod?: PaymentMethod;
  paidAt?: Date;
}

export interface BillingDetails {
  customerId: string;
  subscriptionId?: string;
  currentPlan?: SubscriptionTier;
  tokenBalance: number;
  tokenUsage: TokenUsage[];
  billingType: BillingType;
  status: BillingStatus;
  trialEndsAt?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod?: string;
  autoRecharge: boolean;
  autoRechargeThreshold?: number;
  autoRechargeAmount?: number;
  billingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxId?: {
    type: 'vat' | 'ein';
    value: string;
  };
}