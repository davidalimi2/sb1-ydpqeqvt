export interface BusinessMetrics {
  revenue: {
    total: number;
    recurring: number;
    oneTime: number;
    growth: number;
  };
  customers: {
    total: number;
    active: number;
    churn: number;
    acquisitionCost: number;
  };
  usage: {
    totalTokens: number;
    averagePerUser: number;
    peakUsage: number;
    utilizationRate: number;
  };
  performance: {
    responseTime: number;
    uptime: number;
    errorRate: number;
    concurrentUsers: number;
  };
}

export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  averageRevenue: number;
  growthRate: number;
  churnRate: number;
  characteristics: string[];
}

export interface UsageTrend {
  period: string;
  tokens: number;
  users: number;
  cost: number;
  efficiency: number;
}

export interface HealthMetrics {
  apiLatency: number;
  errorRate: number;
  successRate: number;
  concurrentRequests: number;
  queueLength: number;
  processingTime: number;
}