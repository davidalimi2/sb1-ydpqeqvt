import React, { useState } from 'react';
import { MessageSquare, Code, Settings } from 'lucide-react';

interface ChatSettings {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left';
  theme: {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
  };
  welcomeMessage: string;
  offlineMessage: string;
  businessHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  customCode?: string;
}

export default function ChatSettings() {
  const [settings, setSettings] = useState<ChatSettings>({
    enabled: true,
    position: 'bottom-right',
    theme: {
      primaryColor: '#4F46E5',
      textColor: '#111827',
      backgroundColor: '#FFFFFF'
    },
    welcomeMessage: 'Hello! How can we help you today?',
    offlineMessage: 'We are currently offline. Please leave a message.',
    businessHours: {
      enabled: true,
      start: '09:00',
      end: '17:00',
      timezone: 'America/New_York'
    }
  });

  const handleSave = () => {
    console.log('Saving chat settings:', settings);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Live Chat Settings
            </h3>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-900">Enable Live Chat</label>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Appearance</h4>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <select
                  value={settings.position}
                  onChange={(e) => setSettings({
                    ...settings,
                    position: e.target.value as 'bottom-right' | 'bottom-left'
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primary Color
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => setSettings({
                      ...settings,
                      theme: { ...settings.theme, primaryColor: e.target.value }
                    })}
                    className="h-9 w-full rounded-md border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900">Messages</h4>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Welcome Message
                </label>
                <input
                  type="text"
                  value={settings.welcomeMessage}
                  onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Offline Message
                </label>
                <input
                  type="text"
                  value={settings.offlineMessage}
                  onChange={(e) => setSettings({ ...settings, offlineMessage: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">Business Hours</h4>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.businessHours.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    businessHours: { ...settings.businessHours, enabled: e.target.checked }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-900">Enable</label>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={settings.businessHours.start}
                  onChange={(e) => setSettings({
                    ...settings,
                    businessHours: { ...settings.businessHours, start: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={settings.businessHours.end}
                  onChange={(e) => setSettings({
                    ...settings,
                    businessHours: { ...settings.businessHours, end: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <select
                  value={settings.businessHours.timezone}
                  onChange={(e) => setSettings({
                    ...settings,
                    businessHours: { ...settings.businessHours, timezone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <Code className="h-5 w-5 text-gray-400" />
              <h4 className="ml-2 text-sm font-medium text-gray-900">Custom Code</h4>
            </div>
            <div className="mt-4">
              <textarea
                value={settings.customCode}
                onChange={(e) => setSettings({ ...settings, customCode: e.target.value })}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                placeholder="<!-- Add your custom chat widget code here -->"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          <Settings className="h-4 w-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
}