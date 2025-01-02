export type FeatureEnvironment = 'development' | 'staging' | 'production';
export type FeatureStatus = 'enabled' | 'disabled' | 'percentage';

export interface Feature {
  id: string;
  name: string;
  key: string;
  description: string;
  status: Record<FeatureEnvironment, FeatureStatus>;
  rolloutPercentage?: Record<FeatureEnvironment, number>;
  dependencies?: string[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface FeatureGroup {
  id: string;
  name: string;
  description: string;
  features: string[];
}