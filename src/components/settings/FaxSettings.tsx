import React from 'react';
import { Printer, Plus, Trash2 } from 'lucide-react';

interface FaxSettingsProps {
  settings: {
    enabled: boolean;
    provider: 'twilio' | 'srfax';
    faxNumber: string;
    defaultCoverPage: string;
    notificationEmail: string;
  };
  onChange: (settings: any) => void;
}

export default function FaxSettings({ settings, onChange }: FaxSettingsProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <Printer className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Fax Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => onChange({
                ...settings,
                enabled: e.target.checked
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">Enable Fax Service</label>
          </div>

          {settings.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select
                  value={settings.provider}
                  onChange={(e) => onChange({
                    ...settings,
                    provider: e.target.value as 'twilio' | 'srfax'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="twilio">Twilio</option>
                  <option value="srfax">SRFax</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fax Number</label>
                <input
                  type="text"
                  value={settings.faxNumber}
                  onChange={(e) => onChange({
                    ...settings,
                    faxNumber: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notification Email</label>
                <input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => onChange({
                    ...settings,
                    notificationEmail: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="notifications@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Default Cover Page</label>
                <textarea
                  value={settings.defaultCoverPage}
                  onChange={(e) => onChange({
                    ...settings,
                    defaultCoverPage: e.target.value
                  })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your default cover page template..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  Available variables: {'{recipient_name}'}, {'{sender_name}'}, {'{date}'}, {'{time}'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}