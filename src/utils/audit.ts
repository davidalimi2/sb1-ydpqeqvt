import { AuditLog, AuditAction, ResourceType } from '../types/audit';

interface AuditContext {
  userId: string;
  userEmail: string;
  ipAddress: string;
  userAgent?: string;
  organizationId?: string;
}

interface CreateAuditLogParams {
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  details: string;
  metadata?: Record<string, any>;
}

export async function createAuditLog(
  context: AuditContext,
  params: CreateAuditLogParams
): Promise<AuditLog> {
  const log: AuditLog = {
    id: crypto.randomUUID(),
    userId: context.userId,
    userEmail: context.userEmail,
    action: params.action,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    details: params.details,
    ipAddress: context.ipAddress,
    userAgent: context.userAgent,
    metadata: params.metadata,
    timestamp: new Date(),
    organizationId: context.organizationId,
  };

  // In a real implementation, this would save to a database
  console.log('Audit log created:', log);
  return log;
}

export function getAuditContext(): AuditContext {
  // In a real implementation, this would come from the current request context
  return {
    userId: 'current-user-id',
    userEmail: 'current-user@example.com',
    ipAddress: '127.0.0.1',
    userAgent: navigator.userAgent,
    organizationId: 'current-org-id'
  };
}

export function sanitizeLogDetails(details: string): string {
  // Remove sensitive information like passwords, tokens, etc.
  return details.replace(/password=.*?(&|$)/g, 'password=[REDACTED]$1')
               .replace(/token=.*?(&|$)/g, 'token=[REDACTED]$1')
               .replace(/key=.*?(&|$)/g, 'key=[REDACTED]$1');
}