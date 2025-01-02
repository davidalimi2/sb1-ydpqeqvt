import React from 'react';
import { DocumentFilter, DocumentType, DocumentStatus, AccessLevel } from '../../types/content';
import { Filter, Tag, Calendar } from 'lucide-react';

interface DocumentFiltersProps {
  filters: DocumentFilter;
  onFilterChange: (filters: DocumentFilter) => void;
}

export default function DocumentFilters({ filters, onFilterChange }: DocumentFiltersProps) {
  const documentTypes: DocumentType[] = ['template', 'contract', 'brief', 'memo', 'research', 'form'];
  const statuses: DocumentStatus[] = ['draft', 'review', 'approved', 'archived'];
  const accessLevels: AccessLevel[] = ['private', 'team', 'organization', 'public'];

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <span className="font-medium text-gray-900">Filters</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Document Type</label>
          <select
            value={filters.type || ''}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value as DocumentType || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value as DocumentStatus || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Access Level</label>
          <select
            value={filters.accessLevel || ''}
            onChange={(e) => onFilterChange({ ...filters, accessLevel: e.target.value as AccessLevel || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Access Levels</option>
            {accessLevels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="mt-1 flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by tags..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.tags?.join(', ') || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                tags: e.target.value ? e.target.value.split(',').map(t => t.trim()) : undefined
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <div className="mt-1 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.dateRange?.start.toISOString().split('T')[0] || ''}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: {
                    start: new Date(e.target.value),
                    end: filters.dateRange?.end || new Date()
                  }
                })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filters.dateRange?.end.toISOString().split('T')[0] || ''}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: {
                    start: filters.dateRange?.start || new Date(),
                    end: new Date(e.target.value)
                  }
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}