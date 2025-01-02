import React, { createContext, useContext, useState } from 'react';
import { User, Permission } from '../types/auth';
import { getPermissionsForRole } from '../utils/auth';

interface AuthContextType {
  user: User | null;
  permissions: Permission[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date()
  });
  const [permissions, setPermissions] = useState<Permission[]>(
    getPermissionsForRole('admin')
  );

  const login = async (email: string, password: string) => {
    // Simulate API login
    const mockUser: User = {
      id: '1',
      email,
      name: 'Admin User',
      role: 'admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    setUser(mockUser);
    setPermissions(getPermissionsForRole(mockUser.role));
  };

  const logout = () => {
    setUser(null);
    setPermissions([]);
  };

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}