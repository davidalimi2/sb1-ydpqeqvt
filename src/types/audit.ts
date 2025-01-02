export type AuditAction =
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'portal_access'
  | 'invite_member'
  | 'remove_member'
  | 'update_member_role'
  | 'token_purchase'
  | 'subscription_change'
  | 'billing_update'
  | 'settings_change';

export type ResourceType =
  | 'user'
  | 'organization'
  | 'member'
  | 'document'
  | 'billing'
  | 'subscription'
  | 'portal'
  | 'auth'
  | 'settings';

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  organizationId?: string;
}

export interface AuditFilters {
  userId?: string;
  action?: AuditAction;
  resourceType?: ResourceType;
  startDate?: Date;
  endDate?: Date;
  organizationId?: string;
  searchTerm?: string;
}