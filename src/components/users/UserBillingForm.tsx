import React, { useState } from 'react';
import { CreditCard, DollarSign, AlertTriangle, X } from 'lucide-react';
import { User } from '../../types/auth';
import { BillingDetails } from '../../types/billing';
import { proseSubscriptionTiers, firmSubscriptionTiers } from '../../data/billingPlans';
import UserBillingDetails from './UserBillingDetails';

interface UserBillingFormProps {
  user: User;
  billingDetails: BillingDetails;
  onSave: (userId: string, billingData: {
    planId: string;
    billingType: 'subscription' | 'token';
    customPricing?: {
      tokenRate?: number;
      monthlyFee?: number;
    };
  }) => void;
  onCancelSubscription: (userId: string, immediate: boolean) => void;
  onCancel: () => void;
}

export default function UserBillingForm({ user, billingDetails, onSave, onCancelSubscription, onCancel }: UserBillingFormProps) {
  const [billingType, setBillingType] = useState<'subscription' | 'token'>('subscription');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [customPricing, setCustomPricing] = useState({
    tokenRate: 0,
    monthlyFee: 0
  });
  const [userType, setUserType] = useState<'prose' | 'firm'>('prose');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [immediateCancel, setImmediateCancel] = useState(false);

  const plans = userType === 'prose' ? proseSubscriptionTiers : firmSubscriptionTiers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user.id, {
      planId: selectedPlan,
      billingType,
      customPricing: billingType === 'token' ? customPricing : undefined
    });
  };

  const handleCancelSubscription = () => {
    onCancelSubscription(user.id, immediateCancel);
    onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Current Billing Details */}
      <UserBillingDetails billingDetails={billingDetails} />

      {/* Billing Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Actions</h3>
        <div className="space-y-4">
          {billingDetails.currentPlan && (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {!showCancelConfirm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as 'prose' | 'firm')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="prose">ProSe User</option>
                  <option value="firm">Law Firm</option>
                </select>
              </div>

              {/* Billing Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Billing Type</label>
                <select
                  value={billingType}
                  onChange={(e) => setBillingType(e.target.value as 'subscription' | 'token')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="subscription">Subscription Based</option>
                  <option value="token">Token Based</option>
                </select>
              </div>

              {billingType === 'subscription' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - ${(plan.price / 100).toFixed(2)}/month
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {billingType === 'token' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Token Rate (per token)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        step="0.001"
                        value={customPricing.tokenRate}
                        onChange={(e) => setCustomPricing({
                          ...customPricing,
                          tokenRate: parseFloat(e.target.value)
                        })}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monthly Base Fee</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={customPricing.monthlyFee}
                        onChange={(e) => setCustomPricing({
                          ...customPricing,
                          monthlyFee: parseFloat(e.target.value)
                        })}
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

          <div className="mt-6 border-t pt-6">
            <button
              type="button"
              onClick={() => {
                if (billingDetails.currentPlan) {
                  setShowCancelConfirm(true);
                }
              }}
              disabled={!billingDetails.currentPlan}
              className="w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Cancel Subscription
            </button>
          </div>

          <div className="mt-5 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Cancel Subscription
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Are you sure you want to cancel this subscription?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={immediateCancel}
              onChange={(e) => setImmediateCancel(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Cancel immediately (otherwise at end of billing period)
            </label>
          </div>

          <div className="mt-5 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowCancelConfirm(false)}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={handleCancelSubscription}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}