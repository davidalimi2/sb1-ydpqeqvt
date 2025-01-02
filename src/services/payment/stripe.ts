import { loadStripe } from '@stripe/stripe-js';
import { PaymentIntent, PaymentError } from '../../types/payment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createPaymentIntent(amount: number, currency: string = 'usd'): Promise<PaymentIntent> {
  try {
    const response = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return {
      id: data.id,
      amount,
      currency,
      status: 'pending',
      processor: 'stripe',
      processorPaymentId: data.clientSecret
    };
  } catch (error) {
    throw {
      code: 'stripe_intent_creation_failed',
      message: 'Failed to create Stripe payment intent',
      processor: 'stripe'
    } as PaymentError;
  }
}

export async function processStripePayment(
  paymentMethodId: string,
  paymentIntent: PaymentIntent
): Promise<PaymentIntent> {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { error, paymentIntent: result } = await stripe.confirmCardPayment(
      paymentIntent.processorPaymentId!,
      { payment_method: paymentMethodId }
    );

    if (error) {
      throw {
        code: error.code || 'payment_failed',
        message: error.message || 'Payment failed',
        processor: 'stripe'
      } as PaymentError;
    }

    return {
      ...paymentIntent,
      status: result.status as PaymentIntent['status'],
      processorPaymentId: result.id
    };
  } catch (error) {
    if ((error as PaymentError).code) throw error;
    throw {
      code: 'stripe_processing_failed',
      message: 'Failed to process Stripe payment',
      processor: 'stripe'
    } as PaymentError;
  }
}