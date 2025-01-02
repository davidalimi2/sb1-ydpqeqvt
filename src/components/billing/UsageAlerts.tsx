import React from 'react';
import { Bell, AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info';
  message: string;
  date: Date;
}

interface UsageAlertsProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export default function UsageAlerts({ alerts, onDismiss }: UsageAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-md p-4 ${
            alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
          }`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {alert.type === 'warning' ? (
                <AlertTriangle className={`h-5 w-5 ${
                  alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                }`} />
              ) : (
                <Info className="h-5 w-5 text-blue-400" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm ${
                alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
              }`}>
                {alert.message}
              </p>
            </div>
            <div className="ml-3">
              <button
                type="button"
                onClick={() => onDismiss(alert.id)}
                className={`inline-flex rounded-md p-1.5 ${
                  alert.type === 'warning'
                    ? 'text-yellow-500 hover:bg-yellow-100'
                    : 'text-blue-500 hover:bg-blue-100'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}