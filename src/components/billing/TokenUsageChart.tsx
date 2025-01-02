import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface TokenUsageData {
  date: string;
  amount: number;
  category: string;
}

interface TokenUsageChartProps {
  data: TokenUsageData[];
  totalUsage: number;
  trend: number;
}

export default function TokenUsageChart({ data, totalUsage, trend }: TokenUsageChartProps) {
  const maxUsage = Math.max(...data.map(d => d.amount));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Token Usage</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">30-day trend:</span>
          <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="ml-1 text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">{totalUsage.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total tokens used this month</p>
          </div>
        </div>

        <div className="relative h-48">
          <div className="absolute inset-0 flex items-end justify-between">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-8 bg-indigo-600 rounded-t"
                style={{
                  height: `${(item.amount / maxUsage) * 100}%`,
                  opacity: 0.7 + (index / data.length) * 0.3
                }}
                title={`${item.date}: ${item.amount} tokens`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-gray-500">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              {item.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}