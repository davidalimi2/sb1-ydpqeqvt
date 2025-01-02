export type DocumentType = 'template' | 'contract' | 'brief' | 'memo' | 'research' | 'form';
export type DocumentStatus = 'draft' | 'review' | 'approved' | 'archived';
export type AccessLevel = 'private' | 'team' | 'organization' | 'public';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  content: string;
  version: number;
  accessLevel: AccessLevel;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt?: Date;
  metadata: {
    jurisdiction?: string;
    practice_area?: string;
    client_matter?: string;
    custom_fields?: Record<string, string>;
  };
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string;
  changes: string;
  createdBy: string;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  category: string;
  usage_count: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface DocumentFilter {
  type?: DocumentType;
  status?: DocumentStatus;
  accessLevel?: AccessLevel;
  tags?: string[];
  createdBy?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}