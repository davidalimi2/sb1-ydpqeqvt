import { TokenUsage } from '../../types/billing';
import { tokenUsageCosts } from '../../data/billingPlans';

export async function purchaseTokens(amount: number, paymentMethodId: string): Promise<void> {
  const response = await fetch('/api/billing/tokens/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, paymentMethodId })
  });

  if (!response.ok) {
    throw new Error('Failed to purchase tokens');
  }
}

export async function getTokenBalance(): Promise<number> {
  const response = await fetch('/api/billing/tokens/balance');
  if (!response.ok) {
    throw new Error('Failed to fetch token balance');
  }
  const data = await response.json();
  return data.balance;
}

export async function getTokenUsage(startDate: Date, endDate: Date): Promise<TokenUsage[]> {
  const response = await fetch(
    `/api/billing/tokens/usage?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch token usage');
  }
  return response.json();
}

export async function calculateTokenCost(action: keyof typeof tokenUsageCosts): Promise<number> {
  return tokenUsageCosts[action] || 0;
}

export async function updateAutoRecharge(settings: {
  enabled: boolean;
  threshold: number;
  amount: number;
}): Promise<void> {
  const response = await fetch('/api/billing/tokens/auto-recharge', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  });

  if (!response.ok) {
    throw new Error('Failed to update auto-recharge settings');
  }
}

export async function getTokenExpirationDate(): Promise<Date | null> {
  const response = await fetch('/api/billing/tokens/expiration');
  if (!response.ok) {
    throw new Error('Failed to fetch token expiration');
  }
  const data = await response.json();
  return data.expirationDate ? new Date(data.expirationDate) : null;
}

export async function transferTokens(userId: string, amount: number): Promise<void> {
  const response = await fetch('/api/billing/tokens/transfer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount })
  });

  if (!response.ok) {
    throw new Error('Failed to transfer tokens');
  }
}

export async function getTokenUsageAnalytics(): Promise<{
  dailyAverage: number;
  monthlyProjection: number;
  topActions: Array<{ action: string; usage: number }>;
}> {
  const response = await fetch('/api/billing/tokens/analytics');
  if (!response.ok) {
    throw new Error('Failed to fetch token analytics');
  }
  return response.json();
}