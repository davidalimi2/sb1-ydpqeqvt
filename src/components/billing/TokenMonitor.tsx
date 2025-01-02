import React from 'react';
import { Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { TokenUsage } from '../../types/billing';

interface TokenMonitorProps {
  currentRate: number;     // Current tokens/hour
  averageRate: number;     // Average tokens/hour
  recentUsage: TokenUsage[];
  anomalyThreshold?: number; // % difference to trigger warning
}

export default function TokenMonitor({
  currentRate,
  averageRate,
  recentUsage,
  anomalyThreshold = 50
}: TokenMonitorProps) {
  const rateChange = ((currentRate - averageRate) / averageRate) * 100;
  const isAnomalous = Math.abs(rateChange) > anomalyThreshold;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Usage Monitor</h3>
        </div>
        {isAnomalous && (
          <div className="flex items-center text-yellow-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Unusual Activity</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Current Usage Rate</p>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(currentRate)}
            </span>
            <span className="ml-2 text-sm text-gray-500">tokens/hour</span>
          </div>
          <div className="mt-2 flex items-center">
            {rateChange !== 0 && (
              <>
                {rateChange > 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm ${
                  rateChange > 0 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {Math.abs(Math.round(rateChange))}% vs average
                </span>
              </>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">24h Usage Pattern</p>
          <div className="h-16 mt-2 flex items-end space-x-1">
            {recentUsage.slice(-12).map((usage, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-100 rounded-t"
                style={{
                  height: `${(usage.amount / Math.max(...recentUsage.map(u => u.amount))) * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {isAnomalous && (
        <div className="mt-6 rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Unusual Usage Pattern Detected
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Current usage is {Math.abs(Math.round(rateChange))}% 
                  {rateChange > 0 ? ' higher' : ' lower'} than average.
                  This might indicate:
                </p>
                <ul className="list-disc list-inside mt-1">
                  {rateChange > 0 ? (
                    <>
                      <li>Potential unauthorized usage</li>
                      <li>A spike in legitimate activity</li>
                      <li>Possible system misconfiguration</li>
                    </>
                  ) : (
                    <>
                      <li>System downtime or errors</li>
                      <li>API integration issues</li>
                      <li>Normal usage pattern change</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}