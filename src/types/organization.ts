export type OrganizationType = 'law_firm' | 'solo_practice' | 'legal_department';
export type MemberRole = 'owner' | 'admin' | 'member';

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  plan: string;
  maxMembers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: MemberRole;
  title?: string;
  department?: string;
  joinedAt: Date;
}

export interface OrganizationInvite {
  id: string;
  organizationId: string;
  email: string;
  role: MemberRole;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface OrganizationStats {
  totalMembers: number;
  activeMembers: number;
  totalCases: number;
  storageUsed: number;
  tokenUsage: number;
}