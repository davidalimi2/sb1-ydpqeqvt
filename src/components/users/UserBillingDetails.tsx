import React from 'react';
import { CreditCard, Clock, AlertTriangle } from 'lucide-react';
import { BillingDetails } from '../../types/billing';
import { formatCurrency } from '../../utils/currency';

interface UserBillingDetailsProps {
  billingDetails: BillingDetails;
}

export default function UserBillingDetails({ billingDetails }: UserBillingDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {billingDetails.currentPlan?.name || 'No active plan'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              billingDetails.status === 'active' ? 'bg-green-100 text-green-800' :
              billingDetails.status === 'past_due' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {billingDetails.status.replace('_', ' ').toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Billing Period</p>
            <p className="mt-1 text-sm text-gray-900">
              {billingDetails.currentPeriodStart.toLocaleDateString()} - {billingDetails.currentPeriodEnd.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Bill</p>
            <p className="mt-1 text-sm text-gray-900">
              {formatCurrency(billingDetails.currentPlan?.price || 0)}
            </p>
          </div>
        </div>

        {billingDetails.status === 'past_due' && (
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Payment Required</h3>
                <div className="mt-2 text-sm text-red-700">
                  This account has an overdue payment. Please update the payment method to avoid service interruption.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token Usage */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Token Usage</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {billingDetails.tokenBalance.toLocaleString()} tokens
            </p>
          </div>
          {billingDetails.autoRecharge && (
            <div>
              <p className="text-sm text-gray-500">Auto-recharge</p>
              <p className="mt-1 text-sm text-gray-900">
                Recharge {billingDetails.autoRechargeAmount?.toLocaleString()} tokens when balance falls below {billingDetails.autoRechargeThreshold?.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="space-y-4">
          {billingDetails.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              {method.isDefault && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      {billingDetails.billingAddress && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
          <address className="text-sm text-gray-600 not-italic">
            {billingDetails.billingAddress.line1}<br />
            {billingDetails.billingAddress.line2 && <>{billingDetails.billingAddress.line2}<br /></>}
            {billingDetails.billingAddress.city}, {billingDetails.billingAddress.state} {billingDetails.billingAddress.postalCode}<br />
            {billingDetails.billingAddress.country}
          </address>
        </div>
      )}
    </div>
  );
}