import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { NetworkMetrics, PracticeArea } from '../../types/lawyer';
import { Download, Printer, ArrowUpDown } from 'lucide-react';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#6366F1'];

interface NetworkAnalyticsProps {
  metrics: NetworkMetrics;
}

export default function NetworkAnalytics({ metrics }: NetworkAnalyticsProps) {
  const [sortBy, setSortBy] = React.useState<'count' | 'name'>('count');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const handleExportData = () => {
    const data = {
      practiceAreaDistribution: metrics.practiceAreaDistribution,
      jurisdictionDistribution: metrics.jurisdictionDistribution,
      metrics: {
        totalLawyers: metrics.totalLawyers,
        activeLawyers: metrics.activeLawyers,
        monthlyGrowth: metrics.monthlyGrowth,
        clientSatisfaction: metrics.clientSatisfaction
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'network-analytics.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSort = (field: 'count' | 'name') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const practiceAreaData = Object.entries(metrics.practiceAreaDistribution)
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      return sortBy === 'count' ? direction * (a[1] - b[1]) : direction * a[0].localeCompare(b[0]);
    }).map(
    ([area, count]) => ({
      area: area.replace('_', ' '),
      count
    })
  );

  const jurisdictionData = Object.entries(metrics.jurisdictionDistribution).map(
    ([jurisdiction, count]) => ({
      jurisdiction,
      count
    })
  );

  const pieData = Object.entries(metrics.practiceAreaDistribution).map(([area, count]) => ({
    name: area.replace('_', ' '),
    value: count
  }));

  const totalCases = Object.values(metrics.practiceAreaDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 mb-4">
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
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Network Analytics</h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-500">Practice Area Distribution</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSort('count')}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort by {sortBy === 'count' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={practiceAreaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-4">Jurisdiction Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jurisdictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jurisdiction" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-medium text-gray-500">Growth Metrics</h4>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.monthlyGrowth}%
              </p>
              <p className="text-sm text-gray-500">Monthly growth rate</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-medium text-gray-500">Client Satisfaction</h4>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.clientSatisfaction}%
              </p>
              <p className="text-sm text-gray-500">Overall satisfaction rate</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-medium text-gray-500">Response Rate</h4>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.averageResponseRate}%
               </p>
              <p className="text-sm text-gray-500">Average response rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Performance Insights</h3>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-4">Practice Area Breakdown</h4>
            <div className="space-y-4">
              {Object.entries(metrics.practiceAreaDistribution).map(([area, count]) => (
                <div key={area} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {area.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {count} cases ({((count / totalCases) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ 
                          width: `${(count / metrics.totalCases) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Visual Distribution</h4>
            <div className="h-80 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name} (${((value / totalCases) * 100).toFixed(1)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Jurisdiction Coverage</h4>
            <div className="space-y-4">
              {Object.entries(metrics.jurisdictionDistribution).map(([jurisdiction, count]) => (
                <div key={jurisdiction} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {jurisdiction}
                      </span>
                      <span className="text-sm text-gray-500">
                        {count} lawyers ({((count / metrics.totalLawyers) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(count / metrics.totalLawyers) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            .shadow {
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}