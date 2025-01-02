import React, { useState } from 'react';
import { Settings, Phone, MessageSquare, Mail, Printer, Bot } from 'lucide-react';
import { CRMConfig } from '../../types/crm';

interface CRMSettingsProps {
  config: CRMConfig;
  onSave: (config: CRMConfig) => void;
}

export default function CRMSettings({ config, onSave }: CRMSettingsProps) {
  const [settings, setSettings] = useState(config);

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="space-y-6">
      {/* VoIP Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Phone className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">VoIP Settings</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>
              <select
                value={settings.voip.provider}
                onChange={(e) => setSettings({
                  ...settings,
                  voip: { ...settings.voip, provider: e.target.value as 'voipms' | 'twilio' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="voipms">VoIP.ms</option>
                <option value="twilio">Twilio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Account SID/Username</label>
              <input
                type="text"
                value={settings.voip.settings.accountSid}
                onChange={(e) => setSettings({
                  ...settings,
                  voip: {
                    ...settings.voip,
                    settings: { ...settings.voip.settings, accountSid: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Auth Token/Password</label>
              <input
                type="password"
                value={settings.voip.settings.authToken}
                onChange={(e) => setSettings({
                  ...settings,
                  voip: {
                    ...settings.voip,
                    settings: { ...settings.voip.settings, authToken: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Default Caller ID</label>
              <input
                type="text"
                value={settings.voip.settings.defaultCallerId}
                onChange={(e) => setSettings({
                  ...settings,
                  voip: {
                    ...settings.voip,
                    settings: { ...settings.voip.settings, defaultCallerId: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.voip.settings.webRTCEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    voip: {
                      ...settings.voip,
                      settings: { ...settings.voip.settings, webRTCEnabled: e.target.checked }
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Enable WebRTC (Browser-based calling)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Mail className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">Email Settings</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
              <input
                type="text"
                value={settings.email.smtp.host}
                onChange={(e) => setSettings({
                  ...settings,
                  email: {
                    ...settings.email,
                    smtp: { ...settings.email.smtp, host: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
              <input
                type="number"
                value={settings.email.smtp.port}
                onChange={(e) => setSettings({
                  ...settings,
                  email: {
                    ...settings.email,
                    smtp: { ...settings.email.smtp, port: parseInt(e.target.value) }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
              <input
                type="text"
                value={settings.email.smtp.user}
                onChange={(e) => setSettings({
                  ...settings,
                  email: {
                    ...settings.email,
                    smtp: { ...settings.email.smtp, user: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
              <input
                type="password"
                value={settings.email.smtp.password}
                onChange={(e) => setSettings({
                  ...settings,
                  email: {
                    ...settings.email,
                    smtp: { ...settings.email.smtp, password: e.target.value }
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email Signature</label>
              <textarea
                value={settings.email.signature}
                onChange={(e) => setSettings({
                  ...settings,
                  email: { ...settings.email, signature: e.target.value }
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Bot className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">AI Agent Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.aiAgent.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  aiAgent: { ...settings.aiAgent, enabled: e.target.checked }
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable AI Agent
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <select
                  value={settings.aiAgent.model}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiAgent: { ...settings.aiAgent, model: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Response Time (seconds)
                </label>
                <input
                  type="number"
                  value={settings.aiAgent.maxResponseTime}
                  onChange={(e) => setSettings({
                    ...settings,
                    aiAgent: { ...settings.aiAgent, maxResponseTime: parseInt(e.target.value) }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}