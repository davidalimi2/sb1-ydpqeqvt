import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

interface GeneralSettingsProps {
  settings: {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'system';
    dateFormat: string;
  };
  onChange: (settings: any) => void;
}

export default function GeneralSettings({ settings, onChange }: GeneralSettingsProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <SettingsIcon className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            General Settings
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => onChange({ ...settings, language: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Zone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => onChange({ ...settings, timezone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <div className="mt-2 space-x-4">
              {['light', 'dark', 'system'].map((theme) => (
                <label key={theme} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={theme}
                    checked={settings.theme === theme}
                    onChange={(e) => onChange({ ...settings, theme: e.target.value as 'light' | 'dark' | 'system' })}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => onChange({ ...settings, dateFormat: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}