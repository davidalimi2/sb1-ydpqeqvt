import { TokenUsage } from '../../types/billing';
import { calculateTrend } from './trends';
import { PROJECTION_DAYS, LOW_BALANCE_THRESHOLD } from './constants';

export function projectUsage(usageData: TokenUsage[]): number {
  const trend = calculateTrend(usageData);
  const recentData = usageData.slice(-7);
  const dailyAverage = recentData.reduce((sum, item) => sum + item.amount, 0) / recentData.length;
  
  const projectedDaily = dailyAverage * (1 + trend / 100);
  return Math.round(projectedDaily * PROJECTION_DAYS);
}

export function calculateDeficit(
  currentBalance: number,
  projectedUsage: number
): { deficit: number; isLowBalance: boolean } {
  const deficit = currentBalance - projectedUsage;
  const isLowBalance = currentBalance < projectedUsage * LOW_BALANCE_THRESHOLD;
  
  return { deficit, isLowBalance };
}