import React from 'react';
import { TrendingUp, Download, AlertTriangle } from 'lucide-react';
import { TokenUsage } from '../../types/billing';
import { analyzeUsage } from '../../utils/analytics/metrics';
import { exportUsageData } from '../../utils/export';

interface UsageForecastProps {
  usageData: TokenUsage[];
  tokenBalance: number;
}

export default function UsageForecast({ usageData, tokenBalance }: UsageForecastProps) {
  const analytics = analyzeUsage(usageData, tokenBalance);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Usage Forecast</h3>
        </div>
        <button
          onClick={() => exportUsageData(usageData)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <Download className="h-4 w-4 mr-1" />
          Export Data
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {analytics.metrics.monthlyProjection.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Predicted token usage next month</p>
          <p className="mt-1 text-xs text-gray-500">
            Based on {analytics.metrics.dailyAverage.toLocaleString()} daily average
            {analytics.metrics.weeklyTrend !== 0 && (
              <span> with {analytics.metrics.weeklyTrend > 0 ? '+' : ''}{analytics.metrics.weeklyTrend.toFixed(1)}% weekly trend</span>
            )}
          </p>
        </div>

        {analytics.isLowBalance && (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your current token balance ({tokenBalance.toLocaleString()}) may not be sufficient for next month's predicted usage.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Current Balance</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {tokenBalance.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-500">Projected Surplus/Deficit</p>
            <p className={`mt-2 text-xl font-semibold ${
              analytics.projectedDeficit >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.projectedDeficit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}