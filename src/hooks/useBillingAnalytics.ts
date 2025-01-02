import { useState, useEffect } from 'react';
import { TokenUsage, BillingType } from '../types/billing';
import { analyzeUsage } from '../utils/analytics/metrics';
import { UsageAnalytics } from '../utils/analytics/types';

interface BillingAnalytics extends UsageAnalytics {
  isLoading: boolean;
  error?: string;
}

export function useBillingAnalytics(
  usageData: TokenUsage[],
  currentBalance: number
): BillingAnalytics {
  const [analytics, setAnalytics] = useState<BillingAnalytics>({
    metrics: {
      totalUsage: 0,
      dailyAverage: 0,
      weeklyTrend: 0,
      monthlyProjection: 0
    },
    categories: [],
    projectedDeficit: 0,
    isLowBalance: false,
    isLoading: true
  });

  useEffect(() => {
    try {
      const result = analyzeUsage(usageData, currentBalance);
      setAnalytics({
        ...result,
        isLoading: false
      });
    } catch (err) {
      setAnalytics((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to analyze usage data'
      }));
    }
  }, [usageData, currentBalance]);

  return analytics;
}