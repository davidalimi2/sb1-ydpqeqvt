import React from 'react';
import { Phone } from 'lucide-react';

interface VoIPSettingsProps {
  settings: {
    provider: 'voipms' | 'twilio';
    accountSid: string;
    authToken: string;
    defaultNumber: string;
    webRTCEnabled: boolean;
    recordCalls: boolean;
    transcribeVoicemail: boolean;
  };
  onChange: (settings: any) => void;
}

export default function VoIPSettings({ settings, onChange }: VoIPSettingsProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <Phone className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">VoIP Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider</label>
            <select
              value={settings.provider}
              onChange={(e) => onChange({
                ...settings,
                provider: e.target.value as 'voipms' | 'twilio'
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="voipms">VoIP.ms</option>
              <option value="twilio">Twilio</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account SID</label>
              <input
                type="text"
                value={settings.accountSid}
                onChange={(e) => onChange({
                  ...settings,
                  accountSid: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Auth Token</label>
              <input
                type="password"
                value={settings.authToken}
                onChange={(e) => onChange({
                  ...settings,
                  authToken: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Default Number</label>
            <input
              type="text"
              value={settings.defaultNumber}
              onChange={(e) => onChange({
                ...settings,
                defaultNumber: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.webRTCEnabled}
                onChange={(e) => onChange({
                  ...settings,
                  webRTCEnabled: e.target.checked
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Enable WebRTC</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.recordCalls}
                onChange={(e) => onChange({
                  ...settings,
                  recordCalls: e.target.checked
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Record Calls</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.transcribeVoicemail}
                onChange={(e) => onChange({
                  ...settings,
                  transcribeVoicemail: e.target.checked
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">Transcribe Voicemail</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}