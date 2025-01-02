import React, { useState } from 'react';
import { Plus, Edit2, Trash2, DollarSign, Users, Database, X } from 'lucide-react';
import { SubscriptionTier } from '../../types/billing';

interface PlanManagerProps {
  plans: SubscriptionTier[];
  onCreatePlan: (plan: Omit<SubscriptionTier, 'id'>) => void;
  onUpdatePlan: (plan: SubscriptionTier) => void;
  onDeletePlan: (planId: string) => void;
  onClose: () => void;
}

export default function PlanManager({
  plans,
  onCreatePlan,
  onUpdatePlan,
  onDeletePlan,
  onClose
}: PlanManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier | null>(null);
  const [formData, setFormData] = useState<Omit<SubscriptionTier, 'id'>>({
    name: '',
    description: '',
    price: 0,
    interval: 'monthly',
    features: [],
    tokensIncluded: 0,
    maxUsers: 1,
    maxStorage: 5,
    supportLevel: 'basic',
    apiAccess: false,
    customBranding: false,
    advancedAnalytics: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan) {
      onUpdatePlan({ ...selectedPlan, ...formData });
    } else {
      onCreatePlan(formData);
    }
    setShowForm(false);
    setSelectedPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">Subscription Plans</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </button>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Plan List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {plans.map((plan) => (
            <li key={plan.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-lg font-medium text-indigo-600">{plan.name}</h4>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {plan.interval}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    ${(plan.price / 100).toFixed(2)}/month
                    <Users className="flex-shrink-0 mx-1.5 h-4 w-4 text-gray-400" />
                    {plan.maxUsers === Infinity ? 'Unlimited' : plan.maxUsers} users
                    <Database className="flex-shrink-0 mx-1.5 h-4 w-4 text-gray-400" />
                    {plan.tokensIncluded.toLocaleString()} tokens
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setFormData(plan);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeletePlan(plan.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
              </h3>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (in cents)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Billing Interval</label>
                  <select
                    value={formData.interval}
                    onChange={(e) => setFormData({ ...formData, interval: e.target.value as 'monthly' | 'yearly' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Included Tokens</label>
                  <input
                    type="number"
                    value={formData.tokensIncluded}
                    onChange={(e) => setFormData({ ...formData, tokensIncluded: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Users</label>
                  <input
                    type="number"
                    value={formData.maxUsers === Infinity ? '' : formData.maxUsers}
                    onChange={(e) => setFormData({
                      ...formData,
                      maxUsers: e.target.value === '' ? Infinity : parseInt(e.target.value)
                    })}
                    placeholder="Leave empty for unlimited"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Storage (GB)</label>
                  <input
                    type="number"
                    value={formData.maxStorage}
                    onChange={(e) => setFormData({ ...formData, maxStorage: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Support Level</label>
                  <select
                    value={formData.supportLevel}
                    onChange={(e) => setFormData({
                      ...formData,
                      supportLevel: e.target.value as 'basic' | 'priority' | 'dedicated'
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="basic">Basic</option>
                    <option value="priority">Priority</option>
                    <option value="dedicated">Dedicated</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.apiAccess}
                        onChange={(e) => setFormData({ ...formData, apiAccess: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">API Access</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.customBranding}
                        onChange={(e) => setFormData({ ...formData, customBranding: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">Custom Branding</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.advancedAnalytics}
                        onChange={(e) => setFormData({ ...formData, advancedAnalytics: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">Advanced Analytics</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedPlan(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedPlan ? 'Update Plan' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}