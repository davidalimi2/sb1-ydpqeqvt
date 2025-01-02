import { PaymentIntent, PaymentError } from '../../types/payment';

export async function createBraintreeTransaction(amount: number, currency: string = 'USD'): Promise<PaymentIntent> {
  try {
    const response = await fetch('/api/payments/braintree/client-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      throw new Error('Failed to initialize Braintree payment');
    }

    const data = await response.json();
    return {
      id: data.id,
      amount,
      currency,
      status: 'pending',
      processor: 'braintree',
      processorPaymentId: data.clientToken
    };
  } catch (error) {
    throw {
      code: 'braintree_init_failed',
      message: 'Failed to initialize Braintree payment',
      processor: 'braintree'
    } as PaymentError;
  }
}

export async function processBraintreePayment(
  nonce: string,
  paymentIntent: PaymentIntent
): Promise<PaymentIntent> {
  try {
    const response = await fetch('/api/payments/braintree/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodNonce: nonce,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }),
    });

    if (!response.ok) {
      throw new Error('Payment processing failed');
    }

    const result = await response.json();
    return {
      ...paymentIntent,
      status: result.status,
      processorPaymentId: result.transactionId
    };
  } catch (error) {
    throw {
      code: 'braintree_processing_failed',
      message: 'Failed to process Braintree payment',
      processor: 'braintree'
    } as PaymentError;
  }
}