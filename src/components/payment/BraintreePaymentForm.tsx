import React from 'react';
import DropIn from 'braintree-web-drop-in-react';

interface BraintreePaymentFormProps {
  amount: number;
  onSubmit: (paymentMethodNonce: string) => Promise<void>;
  isProcessing: boolean;
}

export default function BraintreePaymentForm({
  amount,
  onSubmit,
  isProcessing
}: BraintreePaymentFormProps) {
  const handlePayment = async (instance: any) => {
    const { nonce } = await instance.requestPaymentMethod();
    await onSubmit(nonce);
  };

  return (
    <div className="space-y-4">
      <DropIn
        options={{
          authorization: 'sandbox_token_here', // Replace with actual token
          paypal: {
            flow: 'vault'
          }
        }}
        onInstance={(instance) => {
          // Store instance if needed
        }}
      />

      <button
        onClick={() => handlePayment}
        disabled={isProcessing}
        className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing...' : `Pay ${(amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
      </button>
    </div>
  );
}