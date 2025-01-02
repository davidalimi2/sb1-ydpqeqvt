export type PaymentProcessor = 'stripe' | 'braintree';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  processor: PaymentProcessor;
  processorPaymentId?: string;
}

export interface PaymentError {
  code: string;
  message: string;
  processor?: PaymentProcessor;
}