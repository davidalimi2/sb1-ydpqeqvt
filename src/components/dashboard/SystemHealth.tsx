import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency?: number;
  uptime: number;
}

interface SystemHealthProps {
  services: SystemStatus[];
}

export default function SystemHealth({ services }: SystemHealthProps) {
  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'degraded':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'down':
        return 'bg-red-50 text-red-700 ring-red-600/20';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">System Health</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(service.status)}
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {service.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {service.latency && (
                  <span className="text-sm text-gray-500">
                    {service.latency}ms
                  </span>
                )}
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(service.status)}`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}