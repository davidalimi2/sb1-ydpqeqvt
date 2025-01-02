import React from 'react';
import { Printer, Plus, Trash2 } from 'lucide-react';

interface FaxSettingsProps {
  settings: {
    provider: 'voipms' | 'twilio';
    settings: {
      faxNumbers?: string[];
      accountSid?: string;
      authToken?: string;
      emailToFax?: string;
      defaultCoverPage?: string;
      notificationEmail?: string;
    };
  };
  onChange: (settings: any) => void;
}

export default function FaxSettings({ settings, onChange }: FaxSettingsProps) {
  const addFaxNumber = () => {
    const newNumbers = [...(settings.settings.faxNumbers || []), ''];
    onChange({
      ...settings,
      settings: { ...settings.settings, faxNumbers: newNumbers }
    });
  };

  const removeFaxNumber = (index: number) => {
    const newNumbers = settings.settings.faxNumbers?.filter((_, i) => i !== index);
    onChange({
      ...settings,
      settings: { ...settings.settings, faxNumbers: newNumbers }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Printer className="h-5 w-5 text-gray-400" />
        <h3 className="ml-2 text-lg font-medium text-gray-900">Fax Configuration</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Provider</label>
          <select
            value={settings.provider}
            onChange={(e) => onChange({
              ...settings,
              provider: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="voipms">VoIP.ms</option>
            <option value="twilio">Twilio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notification Email</label>
          <input
            type="email"
            value={settings.settings.notificationEmail || ''}
            onChange={(e) => onChange({
              ...settings,
              settings: { ...settings.settings, notificationEmail: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Fax Numbers</label>
          <div className="mt-2 space-y-2">
            {settings.settings.faxNumbers?.map((number, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={number}
                  onChange={(e) => {
                    const newNumbers = [...(settings.settings.faxNumbers || [])];
                    newNumbers[index] = e.target.value;
                    onChange({
                      ...settings,
                      settings: { ...settings.settings, faxNumbers: newNumbers }
                    });
                  }}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeFaxNumber(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaxNumber}
              className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Fax Number
            </button>
          </div>
        </div>

        {settings.provider === 'voipms' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email-to-Fax Address</label>
              <input
                type="email"
                value={settings.settings.emailToFax || ''}
                onChange={(e) => onChange({
                  ...settings,
                  settings: { ...settings.settings, emailToFax: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="fax@voipms.com"
              />
            </div>
          </>
        )}

        {settings.provider === 'twilio' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account SID</label>
              <input
                type="text"
                value={settings.settings.accountSid || ''}
                onChange={(e) => onChange({
                  ...settings,
                  settings: { ...settings.settings, accountSid: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Auth Token</label>
              <input
                type="password"
                value={settings.settings.authToken || ''}
                onChange={(e) => onChange({
                  ...settings,
                  settings: { ...settings.settings, authToken: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Default Cover Page</label>
          <textarea
            value={settings.settings.defaultCoverPage || ''}
            onChange={(e) => onChange({
              ...settings,
              settings: { ...settings.settings, defaultCoverPage: e.target.value }
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Default cover page template..."
          />
        </div>
      </div>
    </div>
  );
}