import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
}

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {metric.label}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : metric.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : null}
                <span className={`ml-2 text-sm ${
                  metric.trend === 'up' ? 'text-green-500' : 
                  metric.trend === 'down' ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {metric.changeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}