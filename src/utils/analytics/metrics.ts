import { TokenUsage } from '../../types/billing';
import { UsageMetrics, CategoryMetrics, UsageAnalytics } from './types';
import { calculateTrend } from './trends';
import { projectUsage, calculateDeficit } from './projections';
import { MIN_DATA_POINTS } from './constants';

export function calculateDailyAverage(usageData: TokenUsage[]): number {
  if (usageData.length === 0) return 0;
  const total = usageData.reduce((sum, item) => sum + item.amount, 0);
  return Math.round(total / usageData.length);
}

export function calculateCategoryMetrics(usageData: TokenUsage[]): CategoryMetrics[] {
  const categoryTotals = new Map<string, number>();
  const totalUsage = usageData.reduce((sum, item) => {
    categoryTotals.set(item.action, (categoryTotals.get(item.action) || 0) + item.amount);
    return sum + item.amount;
  }, 0);

  return Array.from(categoryTotals.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalUsage) * 100
  }));
}

export function analyzeUsage(usageData: TokenUsage[], currentBalance: number): UsageAnalytics {
  if (usageData.length < MIN_DATA_POINTS) {
    throw new Error(`Insufficient data points. Need at least ${MIN_DATA_POINTS} days of data.`);
  }

  const metrics: UsageMetrics = {
    totalUsage: usageData.reduce((sum, item) => sum + item.amount, 0),
    dailyAverage: calculateDailyAverage(usageData),
    weeklyTrend: calculateTrend(usageData),
    monthlyProjection: projectUsage(usageData)
  };

  const categories = calculateCategoryMetrics(usageData);
  const { deficit, isLowBalance } = calculateDeficit(currentBalance, metrics.monthlyProjection);

  return {
    metrics,
    categories,
    projectedDeficit: deficit,
    isLowBalance
  };
}