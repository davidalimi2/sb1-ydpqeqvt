import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Activity } from 'lucide-react';
import { BusinessMetrics } from '../../types/analytics';

interface BusinessMetricsCardProps {
  metrics: BusinessMetrics;
}

export default function BusinessMetricsCard({ metrics }: BusinessMetricsCardProps) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format(amount);

  const formatPercentage = (value: number) =>
    `${(value * 100).toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg h-full">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <DollarSign className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Monthly Revenue
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(metrics.revenue.total)}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              {metrics.revenue.growth >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`ml-2 text-sm ${metrics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(Math.abs(metrics.revenue.growth))}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Active Users</dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {metrics.customers.active}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Customer Churn
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {formatPercentage(metrics.customers.churn)}
                  </div>
                  <div className="ml-2">
                    <span className="text-sm text-gray-500">
                      {metrics.customers.active} active
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Zap className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Token Usage
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.usage.totalTokens.toLocaleString()}
                  </div>
                  <div className="ml-2">
                    <span className="text-sm text-gray-500">
                      {metrics.usage.averagePerUser.toLocaleString()} avg/user
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-6 w-6 text-gray-400" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  System Health
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {formatPercentage(metrics.performance.uptime)}
                  </div>
                  <div className="ml-2">
                    <span className="text-sm text-gray-500">
                      {metrics.performance.errorRate.toFixed(2)}% errors
                    </span>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}