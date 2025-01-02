import React from 'react';
import { tokenUsageCosts } from '../../data/billingPlans';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface TokenUsageBreakdownProps {
  usage: {
    action: keyof typeof tokenUsageCosts;
    amount: number;
    cost: number;
  }[];
  period: 'daily' | 'weekly' | 'monthly';
}

export default function TokenUsageBreakdown({ usage, period }: TokenUsageBreakdownProps) {
  const totalTokens = usage.reduce((sum, item) => sum + item.amount, 0);
  const totalCost = usage.reduce((sum, item) => sum + item.cost, 0);

  const chartData = usage.map(item => ({
    name: item.action.replace('_', ' '),
    tokens: item.amount,
    cost: item.cost
  }));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Token Usage Breakdown</h3>
        </div>
        <div className="text-sm text-gray-500">
          {period.charAt(0).toUpperCase() + period.slice(1)} Overview
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Tokens Used</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {totalTokens.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              ${(totalCost / 100).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tokens" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {usage.map((item) => (
            <div key={item.action} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.action.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-500">
                  {tokenUsageCosts[item.action]} tokens per use
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {item.amount.toLocaleString()} tokens
                </p>
                <p className="text-xs text-gray-500">
                  ${(item.cost / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}