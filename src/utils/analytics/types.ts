import { TokenUsage } from '../../types/billing';

export interface UsageMetrics {
  totalUsage: number;
  dailyAverage: number;
  weeklyTrend: number;
  monthlyProjection: number;
}

export interface CategoryMetrics {
  category: string;
  amount: number;
  percentage: number;
}

export interface UsageAnalytics {
  metrics: UsageMetrics;
  categories: CategoryMetrics[];
  projectedDeficit: number;
  isLowBalance: boolean;
}