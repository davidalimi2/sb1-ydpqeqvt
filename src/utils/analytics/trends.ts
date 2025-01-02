import { TokenUsage } from '../../types/billing';
import { TREND_CALCULATION_DAYS, MIN_DATA_POINTS } from './constants';

export function calculateMovingAverage(data: number[], window: number): number[] {
  if (data.length < window) return [];
  
  const result: number[] = [];
  for (let i = 0; i <= data.length - window; i++) {
    const slice = data.slice(i, i + window);
    const average = slice.reduce((sum, val) => sum + val, 0) / window;
    result.push(average);
  }
  return result;
}

export function calculateTrend(usageData: TokenUsage[]): number {
  if (usageData.length < TREND_CALCULATION_DAYS) return 0;

  const sortedData = [...usageData]
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    .slice(-TREND_CALCULATION_DAYS);

  const dailyAmounts = sortedData.map(d => d.amount);
  const movingAverages = calculateMovingAverage(dailyAmounts, MIN_DATA_POINTS);

  if (movingAverages.length < 2) return 0;

  const firstAvg = movingAverages[0];
  const lastAvg = movingAverages[movingAverages.length - 1];

  return ((lastAvg - firstAvg) / firstAvg) * 100;
}