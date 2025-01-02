import React, { useState } from 'react';
import { CreditCard, Download, AlertTriangle, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { proseSubscriptionTiers, firmSubscriptionTiers } from '../data/billingPlans';
import SubscriptionCard from '../components/billing/SubscriptionCard';
import PlanManager from '../components/subscriptions/PlanManager';
import SubscriptionUsage from '../components/subscriptions/SubscriptionUsage';
import SubscriptionFeatures from '../components/subscriptions/SubscriptionFeatures';
import UpgradePrompt from '../components/subscriptions/UpgradePrompt';
import BillingHistory from '../components/billing/BillingHistory';
import { useBilling } from '../hooks/useBilling';
import { formatCurrency } from '../utils/currency';

export default function Subscriptions() {
  const [userType, setUserType] = useState<'prose' | 'firm'>('prose');
  const { user } = useAuth();
  const availablePlans = user?.role === 'prose' ? proseSubscriptionTiers : firmSubscriptionTiers;
  const currentPlan = availablePlans[0];
  const recommendedPlan = availablePlans[1];

  const {
    billingDetails,
    invoices,
    isLoading,
    error,
    updateSubscription,
    cancelSubscription,
    previewUpgrade
  } = useBilling();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradePreview, setShowUpgradePreview] = useState(false);
  const [showPlanManager, setShowPlanManager] = useState(false);
  const [upgradePreview, setUpgradePreview] = useState<{
    prorated_amount: number;
    next_billing_date: Date;
    changes: Array<{ feature: string; from: string | number; to: string | number }>;
  } | null>(null);

  const handleSubscribe = async (tier: typeof availablePlans[0]) => {
    try {
      const preview = await previewUpgrade(tier.id);
      setUpgradePreview(preview);
      setShowUpgradePreview(true);
    } catch (err) {
      console.error('Failed to preview upgrade:', err);
    }
  };

  const confirmUpgrade = async (tierId: string) => {
    try {
      await updateSubscription(tierId);
      setShowUpgradePreview(false);
    } catch (err) {
      console.error('Failed to upgrade subscription:', err);
    }
  };

  const handleCancelSubscription = async (immediate: boolean) => {
    try {
      await cancelSubscription(immediate);
      setShowCancelModal(false);
    } catch (err) {
      console.error('Failed to cancel subscription:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {userType === 'prose' ? 'ProSe' : 'Law Firm'} Plans
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your subscription plan and billing preferences
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-4 sm:ml-4 sm:mt-0">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'prose' | 'firm')}
            className="mr-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="prose">ProSe Plans</option>
            <option value="firm">Law Firm Plans</option>
          </select>
          <button
            type="button"
            onClick={() => setShowPlanManager(true)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manage Plans
          </button>
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Billing
          </button>
        </div>
      </div>

      {/* Plan Manager Modal */}
      {showPlanManager && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <PlanManager
              plans={userType === 'prose' ? proseSubscriptionTiers : firmSubscriptionTiers}
              onCreatePlan={(plan) => {
                console.log('Create plan:', plan);
                setShowPlanManager(false);
              }}
              onUpdatePlan={(plan) => {
                console.log('Update plan:', plan);
                setShowPlanManager(false);
              }}
              onDeletePlan={(planId) => {
                console.log('Delete plan:', planId);
                setShowPlanManager(false);
              }}
              onClose={() => setShowPlanManager(false)}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {billingDetails?.status === 'past_due' && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Payment Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                Your subscription payment is past due. Please update your payment method to avoid service interruption.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Current Plan Usage */}
          <SubscriptionUsage
            currentPlan={billingDetails?.currentPlan || availablePlans[0]}
            usage={{
              tokens: billingDetails?.tokenBalance || 0,
              users: 2 // Replace with actual user count
            }}
          />

          {/* Available Plans */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {availablePlans.map((tier) => (
              <SubscriptionCard
                key={tier.id}
                tier={tier}
                isCurrentPlan={tier.id === billingDetails?.currentPlan?.id}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Upgrade Prompt */}
          {billingDetails?.currentPlan && (
            <UpgradePrompt
              currentPlan={billingDetails.currentPlan}
              recommendedPlan={availablePlans[1]}
              onUpgrade={handleSubscribe}
            />
          )}

          {/* Current Plan Features */}
          {billingDetails?.currentPlan && (
            <SubscriptionFeatures tier={billingDetails.currentPlan} />
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-8">
        <BillingHistory transactions={invoices} />
      </div>

      {/* Upgrade Preview Modal */}
      {showUpgradePreview && upgradePreview && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Subscription Change</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Your subscription will be upgraded immediately. You'll be charged a prorated amount of {formatCurrency(upgradePreview.prorated_amount)} for the remainder of your billing cycle.
              </p>
              
              <div className="border-t border-b border-gray-200 py-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Changes:</h4>
                <ul className="space-y-2">
                  {upgradePreview.changes.map((change, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {change.feature}: {change.from} → {change.to}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-500">
                Next billing date: {new Date(upgradePreview.next_billing_date).toLocaleDateString()}
              </p>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUpgradePreview(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmUpgrade(billingDetails?.currentPlan?.id || '')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Confirm Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Subscription</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <p className="ml-2 text-sm text-yellow-700">
                  Your subscription will remain active until {billingDetails?.currentPeriodEnd.toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => handleCancelSubscription(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}