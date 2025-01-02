export type ContactStatus = 'lead' | 'active' | 'inactive' | 'archived';
export type CommunicationType = 'call' | 'sms' | 'email' | 'fax';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: ContactStatus;
  notes: string;
  tags: string[];
  lastContact?: Date;
  nextFollowUp?: Date;
  assignedTo?: string;
  communicationPreference: CommunicationType[];
  createdAt: Date;
  updatedAt: Date;
  addresses: {
    type: 'billing' | 'shipping' | 'home' | 'work';
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isPrimary: boolean;
  }[];
  customFields: Record<string, string>;
  source: string;
  leadScore?: number;
  timezone: string;
  notes: Note[];
  deals: Deal[];
}

export interface Note {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  type: 'general' | 'meeting' | 'call' | 'email';
  isPrivate: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'lead' | 'negotiation' | 'proposal' | 'won' | 'lost';
  probability: number;
  expectedCloseDate: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  tasks: {
    id: string;
    title: string;
    dueDate: Date;
    completed: boolean;
  }[];
}

export interface Communication {
  id: string;
  contactId: string;
  type: CommunicationType;
  direction: 'inbound' | 'outbound';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  content: string;
  timestamp: Date;
  duration?: number; // For calls
  recordingUrl?: string; // For calls
  metadata: Record<string, any>;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  isActive: boolean;
  settings: {
    greeting?: string;
    maxResponseTime?: number;
    transferThreshold?: number;
    allowedActions: string[];
  };
}

export interface CRMConfig {
  voip: {
    provider: 'voipms' | 'twilio';
    settings: {
      accountSid: string;
      authToken: string;
      subAccountSid?: string;
      defaultCallerId: string;
      dids?: string[];
      twilioNumbers?: string[];
      sipUsername?: string;
      sipPassword?: string;
      sipServer?: string;
      webRTCEnabled: boolean;
      recordCalls: boolean;
      transcribeVoicemail: boolean;
    };
  };
  sms: {
    provider: 'twilio';
    settings: {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
      enableTemplates: boolean;
    };
  };
  email: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      user: string;
      password: string;
    };
    defaultFrom: string;
    signature: string;
  };
  fax: {
    provider: 'twilio' | 'srfax';
    settings: {
      accountSid?: string;
      authToken?: string;
      faxNumber: string;
    };
  };
  aiAgent: {
    enabled: boolean;
    model: string;
    maxResponseTime: number;
    transferThreshold: number;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
      daysOfWeek: number[];
    };
  };
}