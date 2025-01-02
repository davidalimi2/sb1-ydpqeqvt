import React, { useState } from 'react';
import { Users, UserPlus, Shield } from 'lucide-react';
import { User, Role, Permission } from '../types/auth';
import { DEFAULT_ROLE_PERMISSIONS } from '../utils/auth';

interface EmployeePermission extends Permission {
  enabled: boolean;
}

const mockEmployees: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'manager',
    department: 'Legal',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-03-16')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'employee',
    department: 'Contracts',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2024-02-01')
  }
];

export default function EmployeeAccess() {
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: 'employee' as Role,
    department: '',
    isActive: true,
    isVerified: false
  });
  const [permissions, setPermissions] = useState<EmployeePermission[]>(
    DEFAULT_ROLE_PERMISSIONS
      .find(rp => rp.role === selectedEmployee?.role)
      ?.permissions.map(p => ({ ...p, enabled: true })) || []
  );
  const [portalAccess, setPortalAccess] = useState({
    enabled: false,
    expirationDate: '',
    accessLevel: 'read'
  });

  const handleRoleChange = (employeeId: string, newRole: Role) => {
    // Update employee role and reset permissions to role defaults
    const defaultPermissions = DEFAULT_ROLE_PERMISSIONS
      .find(rp => rp.role === newRole)
      ?.permissions.map(p => ({ ...p, enabled: true })) || [];
    setPermissions(defaultPermissions);
    
    // Reset portal access for non-lawyer/pro-se roles
    if (newRole !== 'lawyer' && newRole !== 'pro_se') {
      setPortalAccess({
        enabled: false,
        expirationDate: '',
        accessLevel: 'read'
      });
    }
  };

  const canManagePortalAccess = selectedEmployee?.role === 'lawyer' || selectedEmployee?.role === 'pro_se';

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Employee Access Management
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage employee roles and permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <UserPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Add Employee Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Employee</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value as Role })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newEmployee.isActive}
                    onChange={(e) => setNewEmployee({ ...newEmployee, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active</label>
                </div>

                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Employee List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">
                  Employees
                </h3>
              </div>
            </div>
            <ul className="divide-y divide-gray-200">
              {mockEmployees.map((employee) => (
                <li
                  key={employee.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedEmployee?.id === employee.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {employee.role}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Permissions Management */}
        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <div className="bg-white shadow rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900">
                      Access Settings
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      value={selectedEmployee.role}
                      onChange={(e) => handleRoleChange(selectedEmployee.id, e.target.value as Role)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                      <option value="lawyer">Lawyer</option>
                      <option value="pro_se">Pro Se</option>
                    </select>
                  </div>

                  {/* Permissions Grid */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Permissions
                    </h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {permissions.map((permission, index) => (
                        <div
                          key={`${permission.action}-${permission.resource}`}
                          className="relative flex items-start"
                        >
                          <div className="flex h-5 items-center">
                            <input
                              type="checkbox"
                              checked={permission.enabled}
                              onChange={(e) => {
                                const newPermissions = [...permissions];
                                newPermissions[index].enabled = e.target.checked;
                                setPermissions(newPermissions);
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              {permission.action} {permission.resource}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portal Access Settings */}
                  {canManagePortalAccess && (
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">
                        Portal Access
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={portalAccess.enabled}
                              onChange={(e) => setPortalAccess({
                                ...portalAccess,
                                enabled: e.target.checked
                              })}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Enable Portal Access
                            </span>
                          </label>
                        </div>

                        {portalAccess.enabled && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Access Level
                              </label>
                              <select
                                value={portalAccess.accessLevel}
                                onChange={(e) => setPortalAccess({
                                  ...portalAccess,
                                  accessLevel: e.target.value
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="read">Read Only</option>
                                <option value="write">Read & Write</option>
                                <option value="full">Full Access</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Access Expiration
                              </label>
                              <input
                                type="date"
                                value={portalAccess.expirationDate}
                                onChange={(e) => setPortalAccess({
                                  ...portalAccess,
                                  expirationDate: e.target.value
                                })}
                                min={new Date().toISOString().split('T')[0]}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Access Restrictions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Access Restrictions
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          IP Restrictions
                        </label>
                        <input
                          type="text"
                          placeholder="Enter allowed IP addresses"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Time Restrictions
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="time"
                            placeholder="Start time"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          <input
                            type="time"
                            placeholder="End time"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No Employee Selected
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Select an employee to manage their access and permissions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}