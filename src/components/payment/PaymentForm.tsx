import React, { useState } from 'react';
import { PaymentProcessor, PaymentIntent } from '../../types/payment';
import PaymentMethodSelector from './PaymentMethodSelector';
import StripePaymentForm from './StripePaymentForm';
import { initiatePayment, processPayment } from '../../services/payment';
import { AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export default function PaymentForm({
  amount,
  onSuccess,
  onCancel,
  title = 'Complete Payment',
  description
}: PaymentFormProps) {
  const [processor, setProcessor] = useState<PaymentProcessor>('stripe');
  const [error, setError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  const handlePayment = async (paymentMethodData: string) => {
    try {
      setIsProcessing(true);
      setError(undefined);

      // Create or use existing payment intent
      const intent = paymentIntent || await initiatePayment(amount, 'USD', processor);
      setPaymentIntent(intent);

      // Process the payment
      const result = await processPayment(paymentMethodData, intent);
      onSuccess(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Payment Error
                  </h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          <PaymentMethodSelector
            selectedProcessor={processor}
            onProcessorSelect={setProcessor}
          />

          <StripePaymentForm
            amount={amount}
            onSubmit={handlePayment}
            isProcessing={isProcessing}
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}