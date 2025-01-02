import React, { useState } from 'react';
import { Court, CourtType, CourtLevel, CourtBranch } from '../../types/court';

interface CourtFormProps {
  court?: Court;
  onSubmit: (court: Court) => void;
  onCancel: () => void;
}

export default function CourtForm({ court, onSubmit, onCancel }: CourtFormProps) {
  const [formData, setFormData] = useState<Partial<Court>>(court || {
    type: 'federal',
    level: 'trial',
    branch: 'main',
    filingInfo: {
      electronicFiling: false,
      fees: { civil: 0, criminal: 0, appeal: 0 }
    },
    rules: [],
    judges: [],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Court);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Court Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as CourtType })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="federal">Federal</option>
              <option value="state">State</option>
              <option value="appellate">Appellate</option>
              <option value="district">District</option>
              <option value="bankruptcy">Bankruptcy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <select
              value={formData.level || ''}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as CourtLevel })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="trial">Trial</option>
              <option value="appellate">Appellate</option>
              <option value="supreme">Supreme</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              value={formData.branch || ''}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value as CourtBranch })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="main">Main</option>
              <option value="division">Division</option>
              <option value="satellite">Satellite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              value={formData.state || ''}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              E-Filing
            </label>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={formData.filingInfo?.electronicFiling || false}
                onChange={(e) => setFormData({
                  ...formData,
                  filingInfo: {
                    ...formData.filingInfo!,
                    electronicFiling: e.target.checked
                  }
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-500">Enable electronic filing</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
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
            Save Court
          </button>
        </div>
      </div>
    </form>
  );
}