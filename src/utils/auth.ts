import { Role, Permission, RolePermissions } from '../types/auth';

// Define default permissions for each role
export const DEFAULT_ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: 'super_admin',
    webPhone: {
      canMakeOutboundCalls: true,
      canReceiveInboundCalls: true,
      canTransferCalls: true,
      canAccessVoicemail: true,
      canConfigureExtensions: true,
      canViewCallHistory: true,
      canRecordCalls: true
    },
    aiAgent: {
      canConfigure: true,
      canMonitor: true,
      canOverride: true
    },
    permissions: [
      { action: 'manage', resource: 'users' },
      { action: 'manage', resource: 'content' },
      { action: 'manage', resource: 'billing' },
      { action: 'manage', resource: 'analytics' },
      { action: 'manage', resource: 'settings' },
      { action: 'manage', resource: 'ai' },
      { action: 'manage', resource: 'security' },
      { action: 'manage', resource: 'portal' }
    ]
  },
  {
    role: 'admin',
    webPhone: {
      canMakeOutboundCalls: true,
      canReceiveInboundCalls: true,
      canTransferCalls: true,
      canAccessVoicemail: true,
      canConfigureExtensions: false,
      canViewCallHistory: true,
      canRecordCalls: true
    },
    aiAgent: {
      canConfigure: true,
      canMonitor: true,
      canOverride: true
    },
    permissions: [
      { action: 'manage', resource: 'users' },
      { action: 'manage', resource: 'content' },
      { action: 'view', resource: 'billing' },
      { action: 'view', resource: 'analytics' },
      { action: 'manage', resource: 'settings' },
      { action: 'manage', resource: 'ai' },
      { action: 'manage', resource: 'portal' }
    ]
  },
  {
    role: 'manager',
    webPhone: {
      canMakeOutboundCalls: true,
      canReceiveInboundCalls: true,
      canTransferCalls: true,
      canAccessVoicemail: true,
      canConfigureExtensions: false,
      canViewCallHistory: true,
      canRecordCalls: false
    },
    aiAgent: {
      canConfigure: false,
      canMonitor: true,
      canOverride: true
    },
    permissions: [
      { action: 'view', resource: 'users' },
      { action: 'manage', resource: 'content' },
      { action: 'view', resource: 'analytics' },
      { action: 'view', resource: 'ai' },
      { action: 'view', resource: 'portal' }
    ]
  },
  {
    role: 'employee',
    webPhone: {
      canMakeOutboundCalls: true,
      canReceiveInboundCalls: true,
      canTransferCalls: false,
      canAccessVoicemail: true,
      canConfigureExtensions: false,
      canViewCallHistory: false,
      canRecordCalls: false
    },
    aiAgent: {
      canConfigure: false,
      canMonitor: false,
      canOverride: false
    },
    permissions: [
      { action: 'view', resource: 'content' },
      { action: 'create', resource: 'content' },
      { action: 'edit', resource: 'content' },
      { action: 'view', resource: 'ai' },
      { action: 'view', resource: 'portal' }
    ]
  },
];

export function hasPermission(
  userPermissions: Permission[],
  requiredAction: Permission['action'],
  requiredResource: Permission['resource']
): boolean {
  return userPermissions.some(
    permission =>
      (permission.action === requiredAction || permission.action === 'manage') &&
      permission.resource === requiredResource
  );
}

export function getPermissionsForRole(role: Role): Permission[] {
  return DEFAULT_ROLE_PERMISSIONS.find(rp => rp.role === role)?.permissions || [];
}

export function canAccessRoute(
  permissions: Permission[],
  route: string
): boolean {
  const routePermissions: Record<string, { action: Permission['action']; resource: Permission['resource'] }> = {
    '/dashboard/users': { action: 'view', resource: 'users' },
    '/dashboard/employee-access': { action: 'manage', resource: 'users' },
    '/dashboard/content': { action: 'view', resource: 'content' },
    '/dashboard/analytics': { action: 'view', resource: 'analytics' },
    '/dashboard/billing': { action: 'view', resource: 'billing' },
    '/dashboard/settings': { action: 'view', resource: 'settings' },
    '/dashboard/security': { action: 'view', resource: 'security' },
    '/dashboard/ai-playground': { action: 'view', resource: 'ai' }
  };

  const requiredPermission = routePermissions[route];
  if (!requiredPermission) return true; // Allow access to routes without specific permissions

  return hasPermission(permissions, requiredPermission.action, requiredPermission.resource);
}