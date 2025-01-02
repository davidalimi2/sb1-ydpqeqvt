export type EmailTemplateType = 
  | 'welcome'
  | 'reset_password'
  | 'verification'
  | 'invoice'
  | 'notification'
  | 'support'
  | 'marketing';

export interface EmailTemplate {
  id: string;
  type: EmailTemplateType;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailConfig {
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  footerText: string;
  logoUrl?: string;
  primaryColor: string;
  useCustomSMTP: boolean;
  smtpSettings?: {
    host: string;
    port: number;
    username: string;
    password: string;
    secure: boolean;
  };
}