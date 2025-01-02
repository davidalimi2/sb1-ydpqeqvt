import React from 'react';
import { TrendingUp, AlertTriangle, Lightbulb, DollarSign } from 'lucide-react';

interface BusinessIntelligenceProps {
  insights: {
    usagePatterns: Array<{
      pattern: string;
      significance: number;
      trend: 'up' | 'down' | 'stable';
      recommendation?: string;
    }>;
    consumptionTrends: Array<{
      metric: string;
      current: number;
      previous: number;
      change: number;
      forecast: number;
    }>;
    revenueForecast: {
      nextMonth: number;
      nextQuarter: number;
      nextYear: number;
      confidence: number;
    };
    churnPrediction: Array<{
      segment: string;
      riskLevel: 'low' | 'medium' | 'high';
      probability: number;
      indicators: string[];
    }>;
    optimizationSuggestions: Array<{
      area: string;
      potential: number;
      impact: 'low' | 'medium' | 'high';
      suggestion: string;
    }>;
    upsellOpportunities: Array<{
      customerId: string;
      currentPlan: string;
      recommendedPlan: string;
      potentialRevenue: number;
      reason: string;
    }>;
  };
}

export default function BusinessIntelligence({ insights }: BusinessIntelligenceProps) {
  return (
    <div className="space-y-6">
      {/* Usage Patterns */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Usage Patterns</h3>
        </div>
        <div className="space-y-4">
          {insights.usagePatterns.map((pattern, index) => (
            <div key={index} className="border-l-4 border-indigo-400 bg-indigo-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <TrendingUp className={`h-5 w-5 ${
                    pattern.trend === 'up' ? 'text-green-400' :
                    pattern.trend === 'down' ? 'text-red-400' :
                    'text-gray-400'
                  }`} />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">{pattern.pattern}</p>
                  {pattern.recommendation && (
                    <p className="mt-2 text-sm text-gray-600">{pattern.recommendation}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Forecast */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Revenue Forecast</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Next Month</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${insights.revenueForecast.nextMonth.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Next Quarter</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${insights.revenueForecast.nextQuarter.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Next Year</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ${insights.revenueForecast.nextYear.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Forecast confidence: {(insights.revenueForecast.confidence * 100).toFixed(1)}%
        </p>
      </div>

      {/* Churn Prediction */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Churn Risk Analysis</h3>
        </div>
        <div className="space-y-4">
          {insights.churnPrediction.map((prediction, index) => (
            <div key={index} className={`rounded-lg p-4 ${
              prediction.riskLevel === 'high' ? 'bg-red-50' :
              prediction.riskLevel === 'medium' ? 'bg-yellow-50' :
              'bg-green-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{prediction.segment}</h4>
                  <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                    {prediction.indicators.map((indicator, i) => (
                      <li key={i}>{indicator}</li>
                    ))}
                  </ul>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  prediction.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  prediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {(prediction.probability * 100).toFixed(1)}% risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Lightbulb className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Optimization Opportunities</h3>
        </div>
        <div className="space-y-4">
          {insights.optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{suggestion.area}</h4>
                  <p className="mt-1 text-sm text-gray-600">{suggestion.suggestion}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  suggestion.impact === 'high' ? 'bg-green-100 text-green-800' :
                  suggestion.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {suggestion.potential}% potential
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell Opportunities */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Upsell Opportunities</h3>
        </div>
        <div className="space-y-4">
          {insights.upsellOpportunities.map((opportunity, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Upgrade: {opportunity.currentPlan} → {opportunity.recommendedPlan}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">{opportunity.reason}</p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  +${opportunity.potentialRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}