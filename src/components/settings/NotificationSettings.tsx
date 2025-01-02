import React from 'react';
import { Bell, Mail, Smartphone } from 'lucide-react';

interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    notificationCategories: {
      billing: boolean;
      security: boolean;
      updates: boolean;
      marketing: boolean;
    };
  };
  onChange: (settings: any) => void;
}

export default function NotificationSettings({ settings, onChange }: NotificationSettingsProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            Notification Settings
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Delivery Methods
            </h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => onChange({
                    ...settings,
                    emailNotifications: e.target.checked
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Mail className="ml-2 h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => onChange({
                    ...settings,
                    pushNotifications: e.target.checked
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Bell className="ml-2 h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => onChange({
                    ...settings,
                    smsNotifications: e.target.checked
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Smartphone className="ml-2 h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-700">SMS</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Notification Categories
            </h4>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notificationCategories.billing}
                  onChange={(e) => onChange({
                    ...settings,
                    notificationCategories: {
                      ...settings.notificationCategories,
                      billing: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Billing</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notificationCategories.security}
                  onChange={(e) => onChange({
                    ...settings,
                    notificationCategories: {
                      ...settings.notificationCategories,
                      security: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Security</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notificationCategories.updates}
                  onChange={(e) => onChange({
                    ...settings,
                    notificationCategories: {
                      ...settings.notificationCategories,
                      updates: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">System Updates</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notificationCategories.marketing}
                  onChange={(e) => onChange({
                    ...settings,
                    notificationCategories: {
                      ...settings.notificationCategories,
                      marketing: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Marketing</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}