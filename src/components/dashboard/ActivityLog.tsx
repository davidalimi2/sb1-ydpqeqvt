import React from 'react';
import { Clock, User, Shield } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface Activity {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: Date;
  type: 'user' | 'security' | 'system';
}

interface ActivityLogProps {
  activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user': return User;
      case 'security': return Shield;
      default: return Clock;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            return (
              <li key={activity.id} className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.details}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(activity.timestamp)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}