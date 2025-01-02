import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Zap, Settings, AlertTriangle, Info } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success';
  timestamp: Date;
  read: boolean;
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  categories: {
    security: boolean;
    billing: boolean;
    updates: boolean;
    activity: boolean;
  };
}

export default function Notifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Security Alert',
      message: 'New login detected from unknown device',
      type: 'alert',
      timestamp: new Date('2024-03-16T10:00:00'),
      read: false
    },
    {
      id: '2',
      title: 'Subscription Update',
      message: 'Your subscription will renew in 7 days',
      type: 'info',
      timestamp: new Date('2024-03-15T15:30:00'),
      read: true
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    categories: {
      security: true,
      billing: true,
      updates: true,
      activity: false
    }
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'success':
        return <Zap className="h-5 w-5 text-green-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const markAllAsRead = () => {
    // Implementation for marking all notifications as read
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Notifications
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your notifications and preferences
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={markAllAsRead}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Notification List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
              >
                <div className="flex items-start space-x-4">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {notification.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Dismiss</span>
                      <Bell className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Settings className="h-5 w-5 text-gray-400" />
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
                      checked={preferences.email}
                      onChange={(e) =>
                        setPreferences({ ...preferences, email: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Mail className="ml-2 h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.push}
                      onChange={(e) =>
                        setPreferences({ ...preferences, push: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Bell className="ml-2 h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-700">
                      Push Notifications
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.sms}
                      onChange={(e) =>
                        setPreferences({ ...preferences, sms: e.target.checked })
                      }
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
                      checked={preferences.categories.security}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          categories: {
                            ...preferences.categories,
                            security: e.target.checked
                          }
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Security</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.categories.billing}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          categories: {
                            ...preferences.categories,
                            billing: e.target.checked
                          }
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Billing</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.categories.updates}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          categories: {
                            ...preferences.categories,
                            updates: e.target.checked
                          }
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      System Updates
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.categories.activity}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          categories: {
                            ...preferences.categories,
                            activity: e.target.checked
                          }
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Account Activity
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}