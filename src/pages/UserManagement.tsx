import React, { useState } from 'react';
import { User } from '../types/auth';
import { UserFilters } from '../types/user';
import { AuditLog, AuditFilters } from '../types/audit';
import { BillingDetails } from '../types/billing';
import { subscriptionTiers } from '../data/billingPlans';
import UserTable from '../components/users/UserTable';
import UserFiltersComponent from '../components/users/UserFilters';
import UserForm from '../components/users/UserForm';
import UserPortalAccess from '../components/users/UserPortalAccess';
import AuditLogComponent from '../components/users/AuditLog';
import UserBillingForm from '../components/users/UserBillingForm';
import { Plus, X } from 'lucide-react';

// Mock data - replace with actual API calls
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-03-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'lawyer',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'prose',
    isVerified: false,
    isActive: false,
    createdAt: new Date('2024-03-01'),
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userEmail: 'john@example.com',
    action: 'login',
    resourceType: 'auth',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.1',
    timestamp: new Date()
  },
  {
    id: '2',
    userId: '2',
    userEmail: 'jane@example.com',
    action: 'portal_access',
    resourceType: 'portal',
    details: 'Generated portal access link',
    ipAddress: '192.168.1.2',
    timestamp: new Date(Date.now() - 3600000)
  }
];

// Mock billing details
const mockBillingDetails: BillingDetails = {
  customerId: 'cus_123',
  subscriptionId: 'sub_123',
  currentPlan: subscriptionTiers[0],
  tokenBalance: 1000,
  billingType: 'subscription',
  status: 'active',
  currentPeriodStart: new Date('2024-03-01'),
  currentPeriodEnd: new Date('2024-03-31'),
  cancelAtPeriodEnd: false,
  paymentMethods: [
    {
      id: 'pm_123',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ],
  autoRecharge: true,
  autoRechargeThreshold: 100,
  autoRechargeAmount: 1000
};

export default function UserManagement() {
  const [filters, setFilters] = useState<UserFilters>({});
  const [auditFilters, setAuditFilters] = useState<AuditFilters>({});
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showPortalAccess, setShowPortalAccess] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);

  const handleBillingUpdate = async (userId: string, billingData: any) => {
    try {
      // Implementation for updating user billing settings
      console.log('Update billing for user:', userId, billingData);
      setShowBillingModal(false);
    } catch (error) {
      console.error('Failed to update billing:', error);
    }
  };

  const handleCancelSubscription = async (userId: string, immediate: boolean) => {
    try {
      // Implementation for canceling user subscription
      console.log('Cancel subscription for user:', userId, { immediate });
      setShowBillingModal(false);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleManageBilling = (user: User) => {
    setSelectedUser(user);
    setShowBillingModal(true);
  };

  const handleDelete = (user: User) => {
    console.log('Delete user:', user);
  };

  const handleGeneratePortalAccess = async (userId: string): Promise<string> => {
    // In a real implementation, this would call an API
    return `https://portal.example.com/access/${userId}/${Date.now()}`;
  };

  const handleFormSubmit = (data: Partial<User>) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    setSelectedUser(undefined);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedUser(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            User Management
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-3"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add User
          </button>
        </div>
      </div>

      {selectedUser && showPortalAccess && (
        <UserPortalAccess
          user={selectedUser}
          onGenerateAccess={handleGeneratePortalAccess}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <UserFiltersComponent filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="lg:col-span-9">
          <div className="bg-white shadow rounded-lg">
            <UserTable
              users={mockUsers}
              onEdit={handleEdit}
              onManageBilling={handleManageBilling}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg">
        <AuditLogComponent
          logs={mockAuditLogs}
          filters={auditFilters}
          onFilterChange={setAuditFilters}
        />
      </div>

      {/* Billing Modal */}
      {showBillingModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Billing Management - {selectedUser.name}
                </h3>
                <button
                  onClick={() => setShowBillingModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <UserBillingForm
                user={selectedUser}
                billingDetails={mockBillingDetails}
                onSave={handleBillingUpdate}
                onCancelSubscription={handleCancelSubscription}
                onCancel={() => setShowBillingModal(false)}
              />
            </div>
          </div>
        </div>
      )}
      
      {isFormOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {showBillingModal && selectedUser && (
        <UserBillingForm
          user={selectedUser}
          billingDetails={mockBillingDetails}
          onSave={handleBillingUpdate}
          onCancelSubscription={handleCancelSubscription}
          onCancel={() => setShowBillingModal(false)}
        />
      )}
    </div>
  );
}