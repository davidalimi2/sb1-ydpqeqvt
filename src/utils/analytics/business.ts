import { BusinessMetrics, CustomerSegment, UsageTrend } from '../../types/analytics';

export function calculateCustomerLifetimeValue(
  monthlyRevenue: number,
  churnRate: number,
  acquisitionCost: number
): number {
  const averageLifespan = 1 / churnRate; // in months
  return (monthlyRevenue * averageLifespan) - acquisitionCost;
}

export function calculatePaybackPeriod(
  acquisitionCost: number,
  monthlyRevenue: number
): number {
  return acquisitionCost / monthlyRevenue;
}

export function analyzeCustomerSegments(
  segments: CustomerSegment[]
): { highValue: CustomerSegment[]; atRisk: CustomerSegment[] } {
  return {
    highValue: segments.filter(s => 
      s.averageRevenue > 1000 && s.churnRate < 0.1 && s.growthRate > 0
    ),
    atRisk: segments.filter(s => 
      s.churnRate > 0.2 || (s.growthRate < 0 && s.averageRevenue > 500)
    )
  };
}

export function predictRevenue(
  currentRevenue: number,
  growthRate: number,
  churnRate: number,
  months: number
): number[] {
  const predictions: number[] = [currentRevenue];
  
  for (let i = 1; i < months; i++) {
    const previousRevenue = predictions[i - 1];
    const growth = previousRevenue * growthRate;
    const churn = previousRevenue * churnRate;
    predictions.push(previousRevenue + growth - churn);
  }
  
  return predictions;
}

export function calculateEfficiencyMetrics(
  revenue: number,
  costs: number,
  activeUsers: number,
  totalTokens: number
): {
  revenuePerUser: number;
  costPerToken: number;
  margin: number;
  efficiency: number;
} {
  return {
    revenuePerUser: revenue / activeUsers,
    costPerToken: costs / totalTokens,
    margin: (revenue - costs) / revenue,
    efficiency: revenue / (costs * activeUsers)
  };
}