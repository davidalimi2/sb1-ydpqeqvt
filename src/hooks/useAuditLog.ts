import { useState, useCallback } from 'react';
import { AuditLog, AuditAction, ResourceType } from '../types/audit';
import { createAuditLog, getAuditContext } from '../utils/audit';

interface UseAuditLogResult {
  logAction: (params: {
    action: AuditAction;
    resourceType: ResourceType;
    resourceId?: string;
    details: string;
    metadata?: Record<string, any>;
  }) => Promise<void>;
  isLogging: boolean;
  error?: Error;
}

export function useAuditLog(): UseAuditLogResult {
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState<Error>();

  const logAction = useCallback(async (params: {
    action: AuditAction;
    resourceType: ResourceType;
    resourceId?: string;
    details: string;
    metadata?: Record<string, any>;
  }) => {
    setIsLogging(true);
    setError(undefined);

    try {
      const context = getAuditContext();
      await createAuditLog(context, params);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create audit log');
      setError(error);
      throw error;
    } finally {
      setIsLogging(false);
    }
  }, []);

  return { logAction, isLogging, error };
}