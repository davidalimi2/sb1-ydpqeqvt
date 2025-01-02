import React from 'react';
import { Mail } from 'lucide-react';

interface EmailSettingsProps {
  settings: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      user: string;
      password: string;
    };
    defaultFrom: string;
    signature: string;
  };
  onChange: (settings: any) => void;
}

export default function EmailSettings({ settings, onChange }: EmailSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Mail className="h-5 w-5 text-gray-400" />
        <h3 className="ml-2 text-lg font-medium text-gray-900">Email Configuration</h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
          <input
            type="text"
            value={settings.smtp.host}
            onChange={(e) => onChange({
              ...settings,
              smtp: { ...settings.smtp, host: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
          <input
            type="number"
            value={settings.smtp.port}
            onChange={(e) => onChange({
              ...settings,
              smtp: { ...settings.smtp, port: parseInt(e.target.value) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
          <input
            type="text"
            value={settings.smtp.user}
            onChange={(e) => onChange({
              ...settings,
              smtp: { ...settings.smtp, user: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
          <input
            type="password"
            value={settings.smtp.password}
            onChange={(e) => onChange({
              ...settings,
              smtp: { ...settings.smtp, password: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Default From Address</label>
          <input
            type="email"
            value={settings.defaultFrom}
            onChange={(e) => onChange({
              ...settings,
              defaultFrom: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Email Signature</label>
          <textarea
            value={settings.signature}
            onChange={(e) => onChange({
              ...settings,
              signature: e.target.value
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.smtp.secure}
              onChange={(e) => onChange({
                ...settings,
                smtp: { ...settings.smtp, secure: e.target.checked }
              })}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Use SSL/TLS
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}