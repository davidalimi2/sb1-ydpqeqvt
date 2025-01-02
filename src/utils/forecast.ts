import { TokenUsage } from '../types/billing';

export function calculateUsageTrend(usageData: TokenUsage[]): number {
  if (usageData.length < 2) return 0;
  
  const sortedData = [...usageData].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  const firstWeek = sortedData.slice(0, 7);
  const lastWeek = sortedData.slice(-7);
  
  const firstWeekAvg = firstWeek.reduce((sum, item) => sum + item.amount, 0) / firstWeek.length;
  const lastWeekAvg = lastWeek.reduce((sum, item) => sum + item.amount, 0) / lastWeek.length;
  
  return ((lastWeekAvg - firstWeekAvg) / firstWeekAvg) * 100;
}

export function predictUsage(usageData: TokenUsage[]): number {
  if (usageData.length < 7) return 0;
  
  const dailyAverages = usageData.slice(-7).map(item => item.amount);
  const averageUsage = dailyAverages.reduce((sum, amount) => sum + amount, 0) / 7;
  const trend = calculateUsageTrend(usageData);
  
  // Apply trend factor to predict next month's usage
  const predictedDaily = averageUsage * (1 + trend / 100);
  return Math.round(predictedDaily * 30);
}