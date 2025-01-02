import React from 'react';
import { BarChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { SubscriptionTier } from '../../types/billing';

interface SubscriptionUsageProps {
  currentPlan: SubscriptionTier;
  usage: {
    tokens: number;
    users: number;
  };
}

export default function SubscriptionUsage({ currentPlan, usage }: SubscriptionUsageProps) {
  const tokenPercentage = (usage.tokens / currentPlan.tokensIncluded) * 100;
  const userPercentage = (usage.users / currentPlan.maxUsers) * 100;
  const isTokenWarning = tokenPercentage > 80;
  const isUserWarning = userPercentage > 80;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Plan Usage</h3>
        </div>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Token Usage</span>
            <span className="text-sm text-gray-500">
              {usage.tokens.toLocaleString()} / {currentPlan.tokensIncluded.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isTokenWarning ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(tokenPercentage, 100)}%` }}
            />
          </div>
          {isTokenWarning && (
            <div className="mt-2 flex items-center text-sm text-yellow-700">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Approaching token limit
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Team Members</span>
            <span className="text-sm text-gray-500">
              {usage.users} / {currentPlan.maxUsers === Infinity ? 'Unlimited' : currentPlan.maxUsers}
            </span>
          </div>
          {currentPlan.maxUsers !== Infinity && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    isUserWarning ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(userPercentage, 100)}%` }}
                />
              </div>
              {isUserWarning && (
                <div className="mt-2 flex items-center text-sm text-yellow-700">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Approaching user limit
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}