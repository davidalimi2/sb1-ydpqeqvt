import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    requireMFA: true,
    sessionTimeout: 30,
    passwordExpiration: 90,
    minPasswordLength: 12,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    allowedDomains: ''
  });

  const handleSave = () => {
    // Implementation for saving security settings
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Security Policies
          </h3>
          
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400" />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Require Two-Factor Authentication
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireMFA}
                  onChange={(e) => setSettings({ ...settings, requireMFA: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Expiration (days)
              </label>
              <input
                type="number"
                value={settings.passwordExpiration}
                onChange={(e) => setSettings({ ...settings, passwordExpiration: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={settings.minPasswordLength}
                onChange={(e) => setSettings({ ...settings, minPasswordLength: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-400" />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Require Special Characters
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireSpecialChars}
                  onChange={(e) => setSettings({ ...settings, requireSpecialChars: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Login Attempts
              </label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IP Whitelist
              </label>
              <input
                type="text"
                value={settings.ipWhitelist}
                onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Comma-separated IP addresses"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty to allow all IP addresses
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allowed Email Domains
              </label>
              <input
                type="text"
                value={settings.allowedDomains}
                onChange={(e) => setSettings({ ...settings, allowedDomains: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Comma-separated domains"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave empty to allow all email domains
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Some settings may require users to re-authenticate or update their credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}