import { Role } from './auth';

export interface UserFilters {
  role?: Role;
  isVerified?: boolean;
  isActive?: boolean;
  search?: string;
}

export interface UserStats {
  total: number;
  active: number;
  pending: number;
  suspended: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: 'login' | 'logout' | 'update' | 'create' | 'delete';
  details: string;
  timestamp: Date;
  ipAddress: string;
}