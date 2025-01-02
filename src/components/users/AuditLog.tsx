import React from 'react';
import { AuditLog, AuditFilters } from '../../types/audit';
import { formatDate } from '../../utils/date';
import {
  Eye, Plus, Edit, Trash, LogIn, LogOut,
  Link, UserPlus, UserMinus, Settings,
  CreditCard, Wallet
} from 'lucide-react';

interface AuditLogProps {
  logs: AuditLog[];
  filters: AuditFilters;
  onFilterChange: (filters: AuditFilters) => void;
}

export default function AuditLogComponent({ logs, filters, onFilterChange }: AuditLogProps) {
  const getActionIcon = (action: AuditLog['action']) => {
    switch (action) {
      case 'view': return Eye;
      case 'create': return Plus;
      case 'update': return Edit;
      case 'delete': return Trash;
      case 'login': return LogIn;
      case 'logout': return LogOut;
      case 'portal_access': return Link;
      case 'invite_member': return UserPlus;
      case 'remove_member': return UserMinus;
      case 'settings_change': return Settings;
      case 'token_purchase': return Wallet;
      case 'subscription_change': return CreditCard;
      default: return Eye;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Audit Log
            </h3>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <select
              value={filters.action || ''}
              onChange={(e) => onFilterChange({ ...filters, action: e.target.value as AuditLog['action'] || undefined })}
              className="block rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Actions</option>
              <option value="view">View</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="portal_access">Portal Access</option>
              <option value="invite_member">Invite Member</option>
              <option value="remove_member">Remove Member</option>
              <option value="settings_change">Settings Change</option>
              <option value="token_purchase">Token Purchase</option>
              <option value="subscription_change">Subscription Change</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      User
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Details
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Organization
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => {
                    const Icon = getActionIcon(log.action);
                    return (
                      <tr key={log.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {log.userEmail}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Icon className="h-4 w-4 mr-2" />
                            {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {log.details}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.organizationId}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {log.ipAddress}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}