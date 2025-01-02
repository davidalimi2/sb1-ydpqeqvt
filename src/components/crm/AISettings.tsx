import React from 'react';
import { Bot } from 'lucide-react';

interface AISettingsProps {
  settings: {
    enabled: boolean;
    model: string;
    maxResponseTime: number;
    transferThreshold: number;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
      daysOfWeek: number[];
    };
  };
  onChange: (settings: any) => void;
}

export default function AISettings({ settings, onChange }: AISettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Bot className="h-5 w-5 text-gray-400" />
        <h3 className="ml-2 text-lg font-medium text-gray-900">AI Agent Configuration</h3>
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
          <label className="ml-2 block text-sm text-gray-900">
            Enable AI Agent
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <select
              value={settings.model}
              onChange={(e) => onChange({
                ...settings,
                model: e.target.value
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
              value={settings.maxResponseTime}
              onChange={(e) => onChange({
                ...settings,
                maxResponseTime: parseInt(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transfer Threshold
            </label>
            <input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={settings.transferThreshold}
              onChange={(e) => onChange({
                ...settings,
                transferThreshold: parseFloat(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Working Hours</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                value={settings.workingHours.start}
                onChange={(e) => onChange({
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
                onChange={(e) => onChange({
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
                onChange={(e) => onChange({
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
          </div>
        </div>
      </div>
    </div>
  );
}