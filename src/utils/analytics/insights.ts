import { BusinessMetrics, UsageTrend, CustomerSegment } from '../../types/analytics';

interface Insight {
  type: 'positive' | 'negative' | 'neutral';
  metric: string;
  message: string;
  recommendation?: string;
  priority: 'high' | 'medium' | 'low';
}

export function generateInsights(
  metrics: BusinessMetrics,
  trends: UsageTrend[],
  segments: CustomerSegment[]
): Insight[] {
  const insights: Insight[] = [];

  // Revenue insights
  if (metrics.revenue.growth < -0.1) {
    insights.push({
      type: 'negative',
      metric: 'revenue',
      message: 'Revenue decreased by more than 10%',
      recommendation: 'Review pricing strategy and customer retention programs',
      priority: 'high'
    });
  }

  // Churn insights
  if (metrics.customers.churn > 0.1) {
    insights.push({
      type: 'negative',
      metric: 'churn',
      message: 'Customer churn rate is above 10%',
      recommendation: 'Implement customer success program and exit surveys',
      priority: 'high'
    });
  }

  // Usage efficiency
  const utilizationThreshold = 0.7;
  if (metrics.usage.utilizationRate < utilizationThreshold) {
    insights.push({
      type: 'neutral',
      metric: 'usage',
      message: 'Token utilization rate is below optimal levels',
      recommendation: 'Consider implementing usage optimization features',
      priority: 'medium'
    });
  }

  // Performance issues
  if (metrics.performance.errorRate > 0.02) {
    insights.push({
      type: 'negative',
      metric: 'performance',
      message: 'Error rate is above acceptable threshold',
      recommendation: 'Review error logs and implement fixes',
      priority: 'high'
    });
  }

  // Growth opportunities
  const highValueSegments = segments.filter(s => s.growthRate > 0.2);
  if (highValueSegments.length > 0) {
    insights.push({
      type: 'positive',
      metric: 'growth',
      message: `${highValueSegments.length} segments show high growth potential`,
      recommendation: 'Focus marketing efforts on these segments',
      priority: 'medium'
    });
  }

  return insights.sort((a, b) => 
    a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
  );
}