import { useState, useCallback } from 'react';
import { User, Permission } from '../types/auth';
import { getPermissionsForRole, hasPermission } from '../utils/auth';

interface UseAuthResult {
  user: User | null;
  permissions: Permission[];
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (action: Permission['action'], resource: Permission['resource']) => boolean;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'employee',
        department: 'Legal',
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      // Get default permissions for the user's role
      const userPermissions = getPermissionsForRole(mockUser.role);
      
      setUser(mockUser);
      setPermissions(userPermissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPermissions([]);
  }, []);

  const checkPermission = useCallback(
    (action: Permission['action'], resource: Permission['resource']) => {
      return hasPermission(permissions, action, resource);
    },
    [permissions]
  );

  return {
    user,
    permissions,
    isLoading,
    error,
    login,
    logout,
    checkPermission
  };
}