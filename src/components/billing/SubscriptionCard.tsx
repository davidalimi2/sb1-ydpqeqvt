import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Star } from 'lucide-react';
import { SubscriptionTier } from '../../types/billing';

interface SubscriptionCardProps {
  tier: SubscriptionTier;
  isCurrentPlan?: boolean;
  onSubscribe: (tier: SubscriptionTier) => void;
}

export default function SubscriptionCard({ tier, isCurrentPlan, onSubscribe }: SubscriptionCardProps) {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(tier.price / 100);

  const handleSubscribe = () => {
    if (!isCurrentPlan) {
      onSubscribe(tier);
      // Navigate to subscriptions page
      navigate('/dashboard/subscriptions');
    }
  };

  return (
    <div className={`relative rounded-2xl ${
      isCurrentPlan ? 'border-2 border-indigo-600' : 'border border-gray-200'
    } bg-white p-8 shadow-sm`}>
      {isCurrentPlan && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
          Current Plan
        </span>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
        <p className="mt-4">
          <span className="text-4xl font-bold tracking-tight text-gray-900">{formattedPrice}</span>
          <span className="text-sm font-semibold text-gray-500">/month</span>
        </p>
      </div>

      <ul className="mt-8 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <Check className="h-5 w-5 flex-shrink-0 text-indigo-600" />
            <span className="ml-3 text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isCurrentPlan}
        className={`mt-8 flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
          isCurrentPlan
            ? 'bg-gray-100 text-gray-500 cursor-default'
            : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        }`}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
      </button>
    </div>
  );
}