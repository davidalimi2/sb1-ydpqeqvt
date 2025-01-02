import { BillingDetails, SubscriptionTier, TokenPrice, BillingInvoice } from '../../types/billing';
import { createPaymentIntent, processStripePayment } from './stripe';

export async function getCurrentSubscription(): Promise<BillingDetails> {
  const response = await fetch('/api/billing/subscription');
  if (!response.ok) {
    throw new Error('Failed to fetch subscription details');
  }
  return response.json();
}

export async function updateSubscription(tierId: string): Promise<BillingDetails> {
  const response = await fetch('/api/billing/subscription', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tierId })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update subscription');
  }
  return response.json();
}

export async function cancelSubscription(immediate: boolean = false): Promise<void> {
  try {
    // Mock implementation since we don't have a real API
    console.log('Cancelling subscription:', { immediate });
    return Promise.resolve();
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw new Error('Failed to cancel subscription. Please try again later.');
  }
}

export async function getInvoices(params?: {
  limit?: number;
  startDate?: Date;
  endDate?: Date;
}): Promise<BillingInvoice[]> {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.startDate) queryParams.set('startDate', params.startDate.toISOString());
  if (params?.endDate) queryParams.set('endDate', params.endDate.toISOString());

  const response = await fetch(`/api/billing/invoices?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return response.json();
}

export async function updatePaymentMethod(paymentMethodId: string): Promise<void> {
  const response = await fetch('/api/billing/payment-method', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paymentMethodId })
  });
  
  if (!response.ok) {
    throw new Error('Failed to update payment method');
  }
}

export async function updateBillingAddress(address: BillingDetails['billingAddress']): Promise<void> {
  const response = await fetch('/api/billing/address', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(address)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update billing address');
  }
}

export async function updateTaxId(taxId: BillingDetails['taxId']): Promise<void> {
  const response = await fetch('/api/billing/tax-id', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taxId)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update tax ID');
  }
}

export async function getUsageReport(startDate: Date, endDate: Date): Promise<any> {
  const response = await fetch(`/api/billing/usage-report?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch usage report');
  }
  return response.json();
}

export async function updateAutoRecharge(settings: {
  enabled: boolean;
  threshold?: number;
  amount?: number;
}): Promise<void> {
  const response = await fetch('/api/billing/auto-recharge', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update auto-recharge settings');
  }
}

export async function downloadInvoice(invoiceId: string): Promise<Blob> {
  const response = await fetch(`/api/billing/invoices/${invoiceId}/pdf`);
  if (!response.ok) {
    throw new Error('Failed to download invoice');
  }
  return response.blob();
}

export async function previewUpgrade(tierId: string): Promise<{
  prorated_amount: number;
  next_billing_date: Date;
  changes: {
    feature: string;
    from: string | number;
    to: string | number;
  }[];
}> {
  const response = await fetch(`/api/billing/preview-upgrade?tierId=${tierId}`);
  if (!response.ok) {
    throw new Error('Failed to preview upgrade');
  }
  return response.json();
}