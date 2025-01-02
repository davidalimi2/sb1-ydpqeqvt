import { useState, useCallback, useEffect } from 'react';
import { BillingDetails, BillingInvoice } from '../types/billing';
import * as billingService from '../services/billing';

interface UseBillingResult {
  billingDetails: BillingDetails | null;
  invoices: BillingInvoice[];
  isLoading: boolean;
  error: string | null;
  updateSubscription: (tierId: string) => Promise<void>;
  cancelSubscription: (immediate?: boolean) => Promise<void>;
  previewUpgrade: (tierId: string) => Promise<{
    prorated_amount: number;
    next_billing_date: Date;
    changes: Array<{
      feature: string;
      from: string | number;
      to: string | number;
    }>;
  }>;
}

export function useBilling(): UseBillingResult {
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [invoices, setInvoices] = useState<BillingInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBillingDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const details = await billingService.getCurrentSubscription();
      setBillingDetails(details);
      
      const recentInvoices = await billingService.getInvoices({ limit: 10 });
      setInvoices(recentInvoices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch billing details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSubscription = useCallback(async (tierId: string) => {
    try {
      setIsLoading(true);
      const updatedDetails = await billingService.updateSubscription(tierId);
      setBillingDetails(updatedDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(async (immediate: boolean = false) => {
    try {
      setIsLoading(true);
      await billingService.cancelSubscription(immediate);
      await fetchBillingDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBillingDetails]);

  const previewUpgrade = useCallback(async (tierId: string) => {
    try {
      return await billingService.previewUpgrade(tierId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to preview upgrade');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchBillingDetails();
  }, [fetchBillingDetails]);

  return {
    billingDetails,
    invoices,
    isLoading,
    error,
    updateSubscription,
    cancelSubscription,
    previewUpgrade
  };
}