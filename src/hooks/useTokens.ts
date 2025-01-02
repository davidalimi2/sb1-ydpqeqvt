import { useState, useCallback } from 'react';
import { TokenUsage } from '../types/billing';
import * as tokenService from '../services/billing/tokens';

interface UseTokensResult {
  balance: number;
  usage: TokenUsage[];
  isLoading: boolean;
  error: string | null;
  purchaseTokens: (amount: number, paymentMethodId: string) => Promise<void>;
  getUsage: (startDate: Date, endDate: Date) => Promise<void>;
  updateAutoRecharge: (settings: {
    enabled: boolean;
    threshold: number;
    amount: number;
  }) => Promise<void>;
  transferTokens: (userId: string, amount: number) => Promise<void>;
}

export function useTokens(): UseTokensResult {
  const [balance, setBalance] = useState(0);
  const [usage, setUsage] = useState<TokenUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    try {
      const balance = await tokenService.getTokenBalance();
      setBalance(balance);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token balance');
    }
  }, []);

  const purchaseTokens = useCallback(async (amount: number, paymentMethodId: string) => {
    try {
      setIsLoading(true);
      await tokenService.purchaseTokens(amount, paymentMethodId);
      await fetchBalance();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to purchase tokens');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBalance]);

  const getUsage = useCallback(async (startDate: Date, endDate: Date) => {
    try {
      setIsLoading(true);
      const usage = await tokenService.getTokenUsage(startDate, endDate);
      setUsage(usage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token usage');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAutoRecharge = useCallback(async (settings: {
    enabled: boolean;
    threshold: number;
    amount: number;
  }) => {
    try {
      setIsLoading(true);
      await tokenService.updateAutoRecharge(settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update auto-recharge settings');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const transferTokens = useCallback(async (userId: string, amount: number) => {
    try {
      setIsLoading(true);
      await tokenService.transferTokens(userId, amount);
      await fetchBalance();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transfer tokens');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBalance]);

  return {
    balance,
    usage,
    isLoading,
    error,
    purchaseTokens,
    getUsage,
    updateAutoRecharge,
    transferTokens
  };
}