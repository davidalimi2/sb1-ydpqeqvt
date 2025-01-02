import React from 'react';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import ActivityLog from '../components/dashboard/ActivityLog';
import SystemHealth from '../components/dashboard/SystemHealth';

const metrics = [
  {
    label: 'Total Users',
    value: '12,345',
    change: 12,
    changeLabel: 'vs last month',
    trend: 'up' as const
  },
  {
    label: 'Active Cases',
    value: '843',
    change: 5.4,
    changeLabel: 'vs last month',
    trend: 'up' as const
  },
  {
    label: 'Revenue',
    value: '$45,678',
    change: 8.2,
    changeLabel: 'vs last month',
    trend: 'up' as const
  },
  {
    label: 'Success Rate',
    value: '94%',
    change: 2.1,
    changeLabel: 'vs last month',
    trend: 'up' as const
  },
];

const activities = [
  {
    id: '1',
    user: 'John Doe',
    action: 'Created new case',
    details: 'Case #123 - Contract Review',
    timestamp: new Date(),
    type: 'user' as const
  },
  {
    id: '2',
    user: 'System',
    action: 'Backup completed',
    details: 'Daily backup successful',
    timestamp: new Date(Date.now() - 3600000),
    type: 'system' as const
  },
  {
    id: '3',
    user: 'Security',
    action: 'Login attempt blocked',
    details: 'Multiple failed attempts from IP 192.168.1.1',
    timestamp: new Date(Date.now() - 7200000),
    type: 'security' as const
  }
];

const systemServices = [
  {
    name: 'API Gateway',
    status: 'operational' as const,
    latency: 45,
    uptime: 99.99
  },
  {
    name: 'Authentication Service',
    status: 'operational' as const,
    latency: 87,
    uptime: 99.95
  },
  {
    name: 'Document Processing',
    status: 'degraded' as const,
    latency: 250,
    uptime: 99.5
  },
  {
    name: 'Storage Service',
    status: 'operational' as const,
    latency: 65,
    uptime: 99.99
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Overview of your platform's performance and key metrics
        </p>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ActivityLog activities={activities} />
        <SystemHealth services={systemServices} />
      </div>
    </div>
  );
}