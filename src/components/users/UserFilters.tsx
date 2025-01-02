import React from 'react';
import { Role } from '../../types/auth';
import { UserFilters } from '../../types/user';
import { Filter } from 'lucide-react';

interface UserFiltersProps {
  filters: UserFilters;
  onFilterChange: (filters: UserFilters) => void;
}

export default function UserFiltersComponent({ filters, onFilterChange }: UserFiltersProps) {
  const roles: Role[] = ['super_admin', 'admin', 'lawyer', 'prose'];

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4 w-full">
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Filter className="h-4 w-4" />
        <span className="font-medium">Filters</span>
      </div>
      
      <div className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={filters.role || ''}
            onChange={(e) => onFilterChange({ ...filters, role: e.target.value as Role || undefined })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-w-[200px]"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={filters.isActive}
                onChange={(e) => onFilterChange({ ...filters, isActive: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={filters.isVerified}
                onChange={(e) => onFilterChange({ ...filters, isVerified: e.target.checked })}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Verified</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}