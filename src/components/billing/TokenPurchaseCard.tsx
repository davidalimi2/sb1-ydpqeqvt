import React from 'react';
import { CreditCard, Zap, AlertCircle } from 'lucide-react';
import { TokenPrice } from '../../types/billing';
import { useTokenPurchase } from '../../hooks/useTokenPurchase';

interface TokenPurchaseCardProps {
  tokenPrice: TokenPrice;
  onPurchaseSuccess?: () => void;
  onPurchaseError?: (error: string) => void;
}

export default function TokenPurchaseCard({
  tokenPrice,
  onPurchaseSuccess,
  onPurchaseError
}: TokenPurchaseCardProps) {
  const {
    isProcessing,
    error,
    lastPurchase,
    purchaseTokens,
    clearError
  } = useTokenPurchase(onPurchaseSuccess, onPurchaseError);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(tokenPrice.price / 100);

  return (
    <div className={`relative rounded-lg border ${
      error ? 'border-red-200' : 'border-gray-200'
    } bg-white p-6 shadow-sm`}>
      <div className="flex items-center space-x-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
          <Zap className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{tokenPrice.amount.toLocaleString()} Tokens</h3>
          <p className="mt-1 text-sm text-gray-500">
            {(tokenPrice.price / tokenPrice.amount).toFixed(2)}¢ per token
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{formattedPrice}</p>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {lastPurchase && (
        <div className="mt-4 text-sm text-gray-500">
          Last purchase: {lastPurchase.amount.toLocaleString()} tokens
          <br />
          {lastPurchase.date.toLocaleDateString()}
        </div>
      )}

      <button
        onClick={() => {
          clearError();
          purchaseTokens(tokenPrice);
        }}
        disabled={isProcessing}
        className={`mt-4 flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        } text-white`}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isProcessing ? 'Processing...' : 'Purchase Tokens'}
      </button>
    </div>
  );
}