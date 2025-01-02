export type CourtType = 'federal' | 'state' | 'appellate' | 'district' | 'bankruptcy';
export type CourtLevel = 'trial' | 'appellate' | 'supreme';
export type CourtBranch = 'main' | 'division' | 'satellite';

export interface Court {
  id: string;
  name: string;
  type: CourtType;
  level: CourtLevel;
  branch: CourtBranch;
  state: string;
  city: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    fax?: string;
    hours?: string;
  };
  filingInfo: {
    electronicFiling: boolean;
    efspProvider?: string;
    fees: {
      civil: number;
      criminal: number;
      appeal: number;
      other?: Record<string, number>;
    };
    acceptedPaymentMethods?: string[];
    filingInstructions?: string;
  };
  rules: {
    title: string;
    url: string;
    lastUpdated: Date;
    effectiveDate?: Date;
  }[];
  judges: {
    name: string;
    title: string;
    appointedDate?: Date;
  }[];
  departments?: {
    name: string;
    phone?: string;
    email?: string;
  }[];
  metadata: Record<string, any>;
  lastUpdated: Date;
  isActive: boolean;
}

export interface JurisdictionSettings {
  id: string;
  name: string;
  code: string;
  type: 'federal' | 'state' | 'international';
  statutes: {
    title: string;
    url: string;
    lastUpdated: Date;
  }[];
  rules: {
    title: string;
    url: string;
    lastUpdated: Date;
  }[];
  limitations: {
    civil: string;
    criminal: string;
  };
  holidays: {
    date: Date;
    name: string;
  }[];
  enabled: boolean;
}