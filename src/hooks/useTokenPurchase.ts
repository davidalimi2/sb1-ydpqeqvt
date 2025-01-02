import { useState, useCallback } from 'react';
import { TokenPrice } from '../types/billing';
import { PaymentProcessor } from '../types/payment';
import { initiatePayment, processPayment } from '../services/payment';

interface PurchaseState {
  isProcessing: boolean;
  error?: string;
  lastPurchase?: {
    amount: number;
    date: Date;
  };
}

interface TokenPurchaseHook {
  isProcessing: boolean;
  error?: string;
  lastPurchase?: {
    amount: number;
    date: Date;
  };
  purchaseTokens: (price: TokenPrice, processor?: PaymentProcessor) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const INITIAL_STATE: PurchaseState = {
  isProcessing: false,
  error: undefined,
  lastPurchase: undefined
};

export function useTokenPurchase(
  onSuccess?: (amount: number) => void,
  onError?: (error: string) => void
): TokenPurchaseHook {
  const [state, setState] = useState<PurchaseState>(INITIAL_STATE);

  const purchaseTokens = useCallback(async (
    price: TokenPrice,
    processor: PaymentProcessor = 'stripe'
  ) => {
    try {
      setState(prev => ({
        ...prev,
        isProcessing: true,
        error: undefined
      }));

      const paymentIntent = await initiatePayment(price.price, 'USD', processor);
      await processPayment('pm_simulated_payment_method', paymentIntent);
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        lastPurchase: {
          amount: price.amount,
          date: new Date()
        }
      }));

      onSuccess?.(price.amount);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process payment';
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorMessage
      }));
      onError?.(errorMessage);
    }
  }, [onSuccess, onError]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: undefined }));
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    isProcessing: state.isProcessing,
    error: state.error,
    lastPurchase: state.lastPurchase,
    purchaseTokens,
    clearError,
    reset
  };
}