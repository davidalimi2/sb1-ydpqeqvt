import React from 'react';
import { DollarSign, Users, CreditCard, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

interface FinancialMetricsProps {
  metrics: {
    monthlyRecurringRevenue: number;
    averageRevenuePerUser: number;
    customerLifetimeValue: number;
    tokenRevenue: number;
    seatRevenue: number;
    churnRate: number;
    trends: {
      mrrGrowth: number;
      arpuGrowth: number;
      clvGrowth: number;
    };
  };
  onExport: () => void;
}

export default function FinancialMetrics({ metrics, onExport }: FinancialMetricsProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Financial Metrics</h3>
        <button
          onClick={onExport}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* MRR */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Recurring Revenue
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(metrics.monthlyRecurringRevenue)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.trends.mrrGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.trends.mrrGrowth >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(metrics.trends.mrrGrowth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* ARPU */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Revenue Per User
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(metrics.averageRevenuePerUser)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.trends.arpuGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.trends.arpuGrowth >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(metrics.trends.arpuGrowth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* CLV */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Customer Lifetime Value
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(metrics.customerLifetimeValue)}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metrics.trends.clvGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metrics.trends.clvGrowth >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(metrics.trends.clvGrowth)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white overflow-hidden shadow rounded-lg sm:col-span-2 lg:col-span-3">
          <div className="p-5">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Revenue Breakdown</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Token Revenue</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(metrics.tokenRevenue)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${(metrics.tokenRevenue / (metrics.tokenRevenue + metrics.seatRevenue)) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Seat Revenue</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(metrics.seatRevenue)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(metrics.seatRevenue / (metrics.tokenRevenue + metrics.seatRevenue)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Churn Rate */}
        <div className="bg-white overflow-hidden shadow rounded-lg sm:col-span-2 lg:col-span-3">
          <div className="p-5">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Churn Analysis</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {(metrics.churnRate * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Monthly Churn Rate</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Average customer lifetime: {(1 / metrics.churnRate).toFixed(1)} months</p>
                <p>Projected annual churn: {((1 - Math.pow(1 - metrics.churnRate, 12)) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}