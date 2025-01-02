import React, { useState } from 'react';
import { Bot, Key, Zap, Clock, AlertTriangle } from 'lucide-react';

interface AISettingsProps {
  config: {
    openai?: {
      apiKey: string;
      organization?: string;
    };
    anthropic?: {
      apiKey: string;
    };
    google?: {
      apiKey: string;
      projectId?: string;
    };
    mistral?: {
      apiKey: string;
    };
    defaultProvider: 'openai' | 'anthropic' | 'google' | 'mistral';
    model: string;
    temperature: number;
    maxTokens: number;
    responseTimeout: number;
    retryAttempts: number;
    confidenceThreshold: number;
    workingHours: {
      enabled: boolean;
      start: string;
      end: string;
      timezone: string;
      daysOfWeek: number[];
    };
  };
  onSave: (config: any) => void;
}

export default function AISettings({ config, onSave }: AISettingsProps) {
  const [settings, setSettings] = useState(config);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [initialized, setInitialized] = useState(false);

  React.useEffect(() => {
    if (!initialized) {
      setSettings(config);
      setInitialized(true);
    }
  }, [config, initialized]);

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="space-y-6 bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-indigo-600" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">AI Configuration</h3>
        </div>
        <button
          onClick={() => setShowApiKeys(!showApiKeys)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {showApiKeys ? 'Hide API Keys' : 'Show API Keys'}
        </button>
      </div>

      <div className="space-y-6">
        {/* API Configuration */}
        {showApiKeys && (
          <div className="border-b border-gray-200 pb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
              <Key className="h-4 w-4 mr-2" />
              API Configuration
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
                <input
                  type="password"
                  value={settings.openai?.apiKey || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    openai: { ...settings.openai, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Anthropic API Key</label>
                <input
                  type="password"
                  value={settings.anthropic?.apiKey || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    anthropic: { ...settings.anthropic, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Google AI API Key</label>
                <input
                  type="password"
                  value={settings.google?.apiKey || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    google: { ...settings.google, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mistral API Key</label>
                <input
                  type="password"
                  value={settings.mistral?.apiKey || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    mistral: { ...settings.mistral, apiKey: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Model Settings */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Model Settings
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Provider</label>
              <select
                value={settings.defaultProvider}
                onChange={(e) => setSettings({
                  ...settings,
                  defaultProvider: e.target.value
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google AI</option>
                <option value="mistral">Mistral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Model</label>
              <select
                value={settings.model}
                onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-2">Claude 2</option>
                <option value="gemini-pro">Gemini Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Temperature</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => setSettings({
                  ...settings,
                  temperature: parseFloat(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings({
                  ...settings,
                  maxTokens: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Response Settings */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Response Settings
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Response Timeout (ms)</label>
              <input
                type="number"
                value={settings.responseTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  responseTimeout: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Retry Attempts</label>
              <input
                type="number"
                value={settings.retryAttempts}
                onChange={(e) => setSettings({
                  ...settings,
                  retryAttempts: parseInt(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confidence Threshold</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={settings.confidenceThreshold}
                onChange={(e) => setSettings({
                  ...settings,
                  confidenceThreshold: parseFloat(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Working Hours</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.workingHours.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  workingHours: { ...settings.workingHours, enabled: e.target.checked }
                })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Enable working hours
              </label>
            </div>

            {settings.workingHours.enabled && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={settings.workingHours.start}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, start: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={settings.workingHours.end}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, end: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Timezone</label>
                  <select
                    value={settings.workingHours.timezone}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: { ...settings.workingHours, timezone: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Working Days</label>
                  <div className="mt-2 space-x-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <label key={day} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.workingHours.daysOfWeek.includes(index)}
                          onChange={(e) => {
                            const days = e.target.checked
                              ? [...settings.workingHours.daysOfWeek, index]
                              : settings.workingHours.daysOfWeek.filter(d => d !== index);
                            setSettings({
                              ...settings,
                              workingHours: { ...settings.workingHours, daysOfWeek: days }
                            });
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-1 text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}