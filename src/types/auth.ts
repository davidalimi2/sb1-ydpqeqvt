export type Role = 'super_admin' | 'admin' | 'manager' | 'employee';

export interface WebPhonePermissions {
  canMakeOutboundCalls: boolean;
  canReceiveInboundCalls: boolean;
  canTransferCalls: boolean;
  canAccessVoicemail: boolean;
  canConfigureExtensions: boolean;
  canViewCallHistory: boolean;
  canRecordCalls: boolean;
}

export interface Permission {
  action: 'view' | 'create' | 'edit' | 'delete' | 'manage';
  resource: 'users' | 'content' | 'billing' | 'analytics' | 'settings' | 'ai' | 'security' | 'portal';
}

export interface RolePermissions {
  role: Role;
  permissions: Permission[];
  webPhone: WebPhonePermissions;
  aiAgent: {
    canConfigure: boolean;
    canMonitor: boolean;
    canOverride: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  department?: string;
  permissions?: Permission[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Session {
  user: User;
  expiresAt: Date;
}