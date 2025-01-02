import React, { useState } from 'react';
import { DollarSign, Calendar, CheckCircle, XCircle, Plus, Edit2, Trash2 } from 'lucide-react';
import { Deal } from '../../types/crm';

interface DealManagerProps {
  deals: Deal[];
  onAddDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateDeal: (deal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
}

export default function DealManager({
  deals,
  onAddDeal,
  onUpdateDeal,
  onDeleteDeal
}: DealManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    value: 0,
    stage: 'lead' as Deal['stage'],
    probability: 0,
    expectedCloseDate: new Date().toISOString().split('T')[0],
    assignedTo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDeal) {
      onUpdateDeal({
        ...selectedDeal,
        ...formData,
        updatedAt: new Date()
      });
    } else {
      onAddDeal({
        ...formData,
        notes: [],
        tasks: []
      });
    }
    setShowForm(false);
    setSelectedDeal(null);
    setFormData({
      title: '',
      value: 0,
      stage: 'lead',
      probability: 0,
      expectedCloseDate: new Date().toISOString().split('T')[0],
      assignedTo: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Deals</h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedDeal ? 'Edit Deal' : 'New Deal'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Value</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Stage</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value as Deal['stage'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="lead">Lead</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="proposal">Proposal</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Probability (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => setFormData({ ...formData, probability: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Close Date</label>
                <input
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedDeal(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {selectedDeal ? 'Update Deal' : 'Create Deal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {deals.map((deal) => (
            <li key={deal.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 truncate">{deal.title}</p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                        in {deal.stage}
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>${deal.value.toLocaleString()}</p>
                      </div>
                      <div className="ml-6 flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
                      </div>
                      <div className="ml-6 flex items-center text-sm text-gray-500">
                        {deal.stage === 'won' ? (
                          <CheckCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-400" />
                        ) : deal.stage === 'lost' ? (
                          <XCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-red-400" />
                        ) : (
                          <span className="flex-shrink-0 mr-1.5">{deal.probability}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedDeal(deal);
                      setFormData({
                        title: deal.title,
                        value: deal.value,
                        stage: deal.stage,
                        probability: deal.probability,
                        expectedCloseDate: new Date(deal.expectedCloseDate).toISOString().split('T')[0],
                        assignedTo: deal.assignedTo
                      });
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteDeal(deal.id)}
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
    </div>
  );
}