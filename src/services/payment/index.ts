import { PaymentIntent, PaymentProcessor, PaymentError } from '../../types/payment';
import { createPaymentIntent, processStripePayment } from './stripe';
import { createBraintreeTransaction, processBraintreePayment } from './braintree';

export async function initiatePayment(
  amount: number,
  currency: string = 'USD',
  preferredProcessor: PaymentProcessor = 'stripe'
): Promise<PaymentIntent> {
  try {
    if (preferredProcessor === 'stripe') {
      return await createPaymentIntent(amount, currency);
    }
    return await createBraintreeTransaction(amount, currency);
  } catch (error) {
    // If primary processor fails, try fallback
    if (preferredProcessor === 'stripe') {
      console.warn('Stripe payment failed, falling back to Braintree');
      return await createBraintreeTransaction(amount, currency);
    }
    throw error;
  }
}

export async function processPayment(
  paymentMethodData: string,
  paymentIntent: PaymentIntent
): Promise<PaymentIntent> {
  try {
    if (paymentIntent.processor === 'stripe') {
      return await processStripePayment(paymentMethodData, paymentIntent);
    }
    return await processBraintreePayment(paymentMethodData, paymentIntent);
  } catch (error) {
    // If payment fails with primary processor, could implement retry logic here
    throw error;
  }
}