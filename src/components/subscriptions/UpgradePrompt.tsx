import React from 'react';
import { TrendingUp, Zap } from 'lucide-react';
import { SubscriptionTier } from '../../types/billing';

interface UpgradePromptProps {
  currentPlan: SubscriptionTier;
  recommendedPlan: SubscriptionTier;
  onUpgrade: (tier: SubscriptionTier) => void;
}

export default function UpgradePrompt({
  currentPlan,
  recommendedPlan,
  onUpgrade
}: UpgradePromptProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg text-white p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-6 w-6 mr-2" />
        <h3 className="text-lg font-semibold">Upgrade Recommended</h3>
      </div>
      
      <p className="mb-6">
        Based on your usage patterns, upgrading to the {recommendedPlan.name} plan
        could save you up to 25% on token costs.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-sm opacity-75">Current Plan</div>
          <div className="text-xl font-bold">{currentPlan.name}</div>
          <div className="text-sm">
            {currentPlan.tokensIncluded.toLocaleString()} tokens/month
          </div>
        </div>
        <div>
          <div className="text-sm opacity-75">Recommended Plan</div>
          <div className="text-xl font-bold">{recommendedPlan.name}</div>
          <div className="text-sm">
            {recommendedPlan.tokensIncluded.toLocaleString()} tokens/month
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium flex items-center">
          <Zap className="h-4 w-4 mr-1" />
          Key Benefits
        </h4>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Higher token allocation</li>
          <li>Lower cost per token</li>
          <li>Additional team members</li>
          <li>Advanced features</li>
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={() => onUpgrade(recommendedPlan)}
          className="w-full bg-white text-indigo-600 rounded-md px-4 py-2 font-medium hover:bg-opacity-90 transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}