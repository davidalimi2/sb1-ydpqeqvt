import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface AutoRechargeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: {
    enabled: boolean;
    threshold: number;
    amount: number;
  };
  onSave: (settings: { enabled: boolean; threshold: number; amount: number }) => void;
}

export default function AutoRechargeSettings({
  isOpen,
  onClose,
  currentSettings,
  onSave
}: AutoRechargeSettingsProps) {
  const [settings, setSettings] = useState(currentSettings);
  const [error, setError] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (settings.threshold >= settings.amount) {
      setError('Threshold must be less than recharge amount');
      return;
    }
    setError(undefined);
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Auto-recharge Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-900">
              Enable automatic token recharge
            </label>
          </div>

          <div>
            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
              Recharge when balance falls below
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="threshold"
                value={settings.threshold}
                onChange={(e) => setSettings({ ...settings, threshold: parseInt(e.target.value) })}
                disabled={!settings.enabled}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Recharge amount (tokens)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="amount"
                value={settings.amount}
                onChange={(e) => setSettings({ ...settings, amount: parseInt(e.target.value) })}
                disabled={!settings.enabled}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}