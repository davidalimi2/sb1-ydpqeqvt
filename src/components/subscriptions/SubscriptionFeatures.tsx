import React from 'react';
import { Check, HelpCircle } from 'lucide-react';
import { SubscriptionTier } from '../../types/billing';

interface SubscriptionFeaturesProps {
  tier: SubscriptionTier;
}

export default function SubscriptionFeatures({ tier }: SubscriptionFeaturesProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Plan Features</h3>
      <ul className="space-y-4">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <HelpCircle className="h-4 w-4 mr-1" />
          Compare all features
        </button>
      </div>
    </div>
  );
}