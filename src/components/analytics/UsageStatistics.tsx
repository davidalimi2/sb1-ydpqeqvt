import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, FileText, Brain, Clock } from 'lucide-react';

interface UsageStatisticsProps {
  statistics: {
    tokenConsumption: {
      daily: Array<{ date: string; amount: number }>;
      total: number;
      trend: number;
    };
    featureUsage: Array<{
      feature: string;
      usage: number;
      trend: number;
    }>;
    seatUtilization: {
      total: number;
      active: number;
      inactive: number;
      utilizationRate: number;
    };
    documentGeneration: {
      total: number;
      byType: Array<{ type: string; count: number }>;
      trend: number;
    };
    aiUsage: {
      totalRequests: number;
      averageTokens: number;
      successRate: number;
      topModels: Array<{ model: string; usage: number }>;
    };
    peakTimes: Array<{
      hour: number;
      usage: number;
      day: string;
    }>;
  };
}

export default function UsageStatistics({ statistics }: UsageStatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Token Consumption */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Token Consumption</h3>
          </div>
          <div className="text-sm text-gray-500">
            Total: {statistics.tokenConsumption.total.toLocaleString()} tokens
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.tokenConsumption.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Usage */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Feature Usage</h3>
        </div>
        <div className="space-y-4">
          {statistics.featureUsage.map((feature) => (
            <div key={feature.feature}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">{feature.feature}</span>
                <span className="text-sm text-gray-500">
                  {feature.usage.toLocaleString()} uses
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{
                    width: `${(feature.usage / Math.max(...statistics.featureUsage.map(f => f.usage))) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Utilization */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Users className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Seat Utilization</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {statistics.seatUtilization.active}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Seats</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {statistics.seatUtilization.total}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Utilization Rate</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {(statistics.seatUtilization.utilizationRate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* AI Usage */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Brain className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">AI Usage</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dl className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Total Requests</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {statistics.aiUsage.totalRequests.toLocaleString()}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <dt className="text-sm font-medium text-gray-500">Success Rate</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {(statistics.aiUsage.successRate * 100).toFixed(1)}%
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">Top Models</h4>
            <div className="space-y-4">
              {statistics.aiUsage.topModels.map((model) => (
                <div key={model.model}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{model.model}</span>
                    <span className="text-sm text-gray-900">{model.usage.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(model.usage / Math.max(...statistics.aiUsage.topModels.map(m => m.usage))) * 100}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Peak Times */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Clock className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Peak Usage Times</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statistics.peakTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}