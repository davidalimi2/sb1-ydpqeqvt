import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentProcessor } from '../../types/payment';

interface PaymentMethodSelectorProps {
  onProcessorSelect: (processor: PaymentProcessor) => void;
  selectedProcessor: PaymentProcessor;
}

export default function PaymentMethodSelector({
  onProcessorSelect,
  selectedProcessor
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onProcessorSelect('stripe')}
          className={`flex items-center justify-center rounded-lg border p-4 ${
            selectedProcessor === 'stripe'
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200'
          }`}
        >
          <CreditCard className={`h-6 w-6 ${
            selectedProcessor === 'stripe' ? 'text-indigo-600' : 'text-gray-400'
          }`} />
          <span className="ml-2">Pay with Card</span>
        </button>
      </div>
    </div>
  );
}