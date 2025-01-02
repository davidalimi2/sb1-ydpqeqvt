import React from 'react';
import { MessageSquare } from 'lucide-react';

interface SMSSettingsProps {
  settings: {
    enabled: boolean;
    provider: 'twilio';
    phoneNumber: string;
    templates: Record<string, string>;
  };
  onChange: (settings: any) => void;
}

export default function SMSSettings({ settings, onChange }: SMSSettingsProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <MessageSquare className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">SMS Settings</h3>
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
            <label className="ml-2 text-sm text-gray-700">Enable SMS Service</label>
          </div>

          {settings.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">SMS Phone Number</label>
                <input
                  type="text"
                  value={settings.phoneNumber}
                  onChange={(e) => onChange({
                    ...settings,
                    phoneNumber: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message Templates</label>
                <div className="mt-2 space-y-4">
                  {Object.entries(settings.templates).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-500">{key}</label>
                      <textarea
                        value={value}
                        onChange={(e) => onChange({
                          ...settings,
                          templates: {
                            ...settings.templates,
                            [key]: e.target.value
                          }
                        })}
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}