import React from 'react';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { CustomerSegment } from '../../types/analytics';

type SortField = 'name' | 'size' | 'revenue' | 'growth' | 'churn';
type SortDirection = 'asc' | 'desc';

interface CustomerSegmentationProps {
  segments: CustomerSegment[];
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
}

export default function CustomerSegmentation({ 
  segments, 
  onSort,
  sortField,
  sortDirection 
}: CustomerSegmentationProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format(amount);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return (
      <span className={`ml-1 inline-block transition-transform duration-200 ${
        sortDirection === 'desc' ? 'transform rotate-180' : ''
      }`}>
        ▲
      </span>
    );
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">
              Customer Segments
            </h3>
          </div>
        </div>

        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        <button
                          onClick={() => onSort('name')}
                          className="flex items-center text-left font-semibold hover:text-gray-700"
                        >
                          Segment {renderSortIcon('name')}
                        </button>
                      </th>
                      <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        <button
                          onClick={() => onSort('size')}
                          className="flex items-center justify-end font-semibold hover:text-gray-700 ml-auto"
                        >
                          Size {renderSortIcon('size')}
                        </button>
                      </th>
                      <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        <button
                          onClick={() => onSort('revenue')}
                          className="flex items-center justify-end font-semibold hover:text-gray-700 ml-auto"
                        >
                          Avg. Revenue {renderSortIcon('revenue')}
                        </button>
                      </th>
                      <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        <button
                          onClick={() => onSort('growth')}
                          className="flex items-center justify-end font-semibold hover:text-gray-700 ml-auto"
                        >
                          Growth {renderSortIcon('growth')}
                        </button>
                      </th>
                      <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                        <button
                          onClick={() => onSort('churn')}
                          className="flex items-center justify-end font-semibold hover:text-gray-700 ml-auto"
                        >
                          Churn {renderSortIcon('churn')}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {segments.map((segment) => (
                      <tr key={segment.id}>
                        <td className="whitespace-nowrap px-3 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {segment.name}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {segment.characteristics.join(' • ')}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {segment.size.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {formatCurrency(segment.averageRevenue)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right">
                          <div className="flex items-center justify-end">
                            {segment.growthRate >= 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${
                              segment.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {Math.abs(segment.growthRate * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                          {(segment.churnRate * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}