import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Download, Printer } from 'lucide-react';
import MetricsGrid from '../components/dashboard/MetricsGrid';
import BusinessMetricsCard from '../components/analytics/BusinessMetricsCard';
import CustomerSegmentation from '../components/analytics/CustomerSegmentation';
import { useState, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type SortField = 'name' | 'size' | 'revenue' | 'growth' | 'churn';
type SortDirection = 'asc' | 'desc';

const metrics = [
  {
    label: 'Monthly Revenue',
    value: '$45,678',
    change: 12.5,
    changeLabel: 'vs. last month',
    trend: 'up' as const
  },
  {
    label: 'Active Users',
    value: '2,345',
    change: 8.1,
    changeLabel: 'vs. last month',
    trend: 'up' as const
  },
  {
    label: 'Token Usage',
    value: '1.2M',
    change: 15.3,
    changeLabel: 'vs. last month',
    trend: 'up' as const
  },
  {
    label: 'Avg. Response Time',
    value: '245ms',
    change: -5.2,
    changeLabel: 'vs. last month',
    trend: 'down' as const
  }
];

const businessMetrics = {
  revenue: {
    total: 45678,
    recurring: 38000,
    oneTime: 7678,
    growth: 0.125
  },
  customers: {
    total: 2345,
    active: 1890,
    churn: 0.05,
    acquisitionCost: 150
  },
  usage: {
    totalTokens: 1200000,
    averagePerUser: 512,
    peakUsage: 150000,
    utilizationRate: 0.85
  },
  performance: {
    responseTime: 245,
    uptime: 0.9995,
    errorRate: 0.002,
    concurrentUsers: 150
  }
};

const customerSegments = [
  {
    id: '1',
    name: 'Enterprise',
    size: 50,
    averageRevenue: 5000,
    growthRate: 0.15,
    churnRate: 0.02,
    characteristics: ['High volume', 'Custom features', 'Priority support']
  },
  {
    id: '2',
    name: 'Mid-Market',
    size: 150,
    averageRevenue: 1000,
    growthRate: 0.25,
    churnRate: 0.05,
    characteristics: ['Growing teams', 'Standard features', 'Regular support']
  },
  {
    id: '3',
    name: 'Small Business',
    size: 500,
    averageRevenue: 200,
    growthRate: 0.35,
    churnRate: 0.08,
    characteristics: ['Cost-conscious', 'Basic features', 'Self-service']
  }
];

export default function Analytics() {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const printRef = useRef<HTMLDivElement>(null);

  const handleExportData = () => {
    const data = {
      metrics,
      businessMetrics,
      customerSegments
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSegments = [...customerSegments].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    switch (sortField) {
      case 'name':
        return direction * a.name.localeCompare(b.name);
      case 'size':
        return direction * (a.size - b.size);
      case 'revenue':
        return direction * (a.averageRevenue - b.averageRevenue);
      case 'growth':
        return direction * (a.growthRate - b.growthRate);
      case 'churn':
        return direction * (a.churnRate - b.churnRate);
      default:
        return 0;
    }
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" ref={printRef}>
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Analytics Dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Track key metrics and business performance
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleExportData}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </button>
        </div>
      </div>

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', revenue: 30000 },
                { month: 'Feb', revenue: 35000 },
                { month: 'Mar', revenue: 45678 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', users: 1800 },
                { month: 'Feb', users: 2100 },
                { month: 'Mar', users: 2345 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <BusinessMetricsCard metrics={businessMetrics} />
        </div>
        <div className="lg:col-span-8 bg-white shadow rounded-lg">
          <CustomerSegmentation 
          segments={sortedSegments}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          />
        </div>
      </div>      
      <style>
        {`
          @media print {
            .bg-white {
              background-color: white !important;
              box-shadow: none !important;
            }
            .bg-gray-50 {
              background-color: #f9fafb !important;
            }
            .text-gray-900 {
              color: black !important;
            }
            .text-gray-500 {
              color: #6b7280 !important;
            }
            button {
              display: none !important;
            }
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}