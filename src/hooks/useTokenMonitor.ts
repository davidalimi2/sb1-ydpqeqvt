import { useState, useEffect } from 'react';
import { TokenUsage } from '../types/billing';

interface TokenMonitorState {
  currentRate: number;
  averageRate: number;
  recentUsage: TokenUsage[];
  isLoading: boolean;
  error?: string;
}

export function useTokenMonitor(
  usageData: TokenUsage[],
  updateInterval: number = 5000 // 5 seconds
) {
  const [state, setState] = useState<TokenMonitorState>({
    currentRate: 0,
    averageRate: 0,
    recentUsage: [],
    isLoading: true
  });

  useEffect(() => {
    const calculateRates = () => {
      try {
        // Get last hour's usage
        const hourAgo = new Date(Date.now() - 3600000);
        const recentUsage = usageData.filter(
          usage => usage.timestamp > hourAgo
        );

        // Calculate current rate (tokens per hour)
        const currentTotal = recentUsage.reduce(
          (sum, usage) => sum + usage.amount,
          0
        );
        const currentRate = currentTotal;

        // Calculate average rate
        const dayAgo = new Date(Date.now() - 86400000);
        const dayUsage = usageData.filter(
          usage => usage.timestamp > dayAgo
        );
        const averageTotal = dayUsage.reduce(
          (sum, usage) => sum + usage.amount,
          0
        );
        const averageRate = averageTotal / 24;

        setState({
          currentRate,
          averageRate,
          recentUsage: usageData.slice(-12), // Last 12 data points
          isLoading: false
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to calculate usage rates'
        }));
      }
    };

    calculateRates();
    const interval = setInterval(calculateRates, updateInterval);

    return () => clearInterval(interval);
  }, [usageData, updateInterval]);

  return state;
}