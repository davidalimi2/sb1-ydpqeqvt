import React, { useState } from 'react';
import GeneralSettings from '../components/settings/GeneralSettings';
import EmailSettings from '../components/email/EmailSettings';
import SecuritySettings from '../components/security/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import AISettings from '../components/ai/AISettings';
import VoIPSettings from '../components/settings/VoIPSettings';
import FaxSettings from '../components/settings/FaxSettings';
import SMSSettings from '../components/settings/SMSSettings';

interface AppSettings {
  language: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  dateFormat: string;
  email: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      username: string;
      password: string;
    };
    defaultFrom: string;
    replyTo: string;
    signature: string;
    templates: {
      welcome: string;
      resetPassword: string;
      notification: string;
    };
  };
  voip: {
    provider: 'voipms' | 'twilio';
    accountSid: string;
    authToken: string;
    defaultNumber: string;
    webRTCEnabled: boolean;
    recordCalls: boolean;
    transcribeVoicemail: boolean;
  };
  fax: {
    enabled: boolean;
    provider: 'twilio' | 'srfax';
    faxNumber: string;
    defaultCoverPage: string;
    notificationEmail: string;
  };
  sms: {
    enabled: boolean;
    provider: 'twilio';
    phoneNumber: string;
    templates: Record<string, string>;
  };
  security: {
    mfaEnabled: boolean;
    sessionTimeout: number;
    ipWhitelist: string[];
    passwordPolicy: {
      minLength: number;
      requireSpecialChars: boolean;
      requireNumbers: boolean;
      expiryDays: number;
    };
  };
  communications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    notificationCategories: {
      billing: boolean;
      security: boolean;
      updates: boolean;
      marketing: boolean;
    };
  };
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoSave: boolean;
  defaultTokens: number;
  billing: {
    autoRecharge: boolean;
    autoRechargeThreshold: number;
    autoRechargeAmount: number;
    defaultPaymentMethod: string;
  };
  ai: {
    defaultModel: string;
    temperature: number;
    maxTokens: number;
    saveHistory: boolean;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    timezone: 'UTC',
    theme: 'system',
    dateFormat: 'MM/DD/YYYY',
    email: {
      smtp: {
        host: '',
        port: 587,
        secure: true,
        username: '',
        password: ''
      },
      defaultFrom: '',
      replyTo: '',
      replyTo: '',
      signature: '',
      templates: {
        welcome: '',
        resetPassword: '',
        notification: ''
      }
    },
    voip: {
      provider: 'twilio',
      accountSid: '',
      authToken: '',
      defaultNumber: '',
      webRTCEnabled: true,
      recordCalls: false,
      transcribeVoicemail: true
    },
    fax: {
      enabled: false,
      provider: 'twilio',
      faxNumber: '',
      defaultCoverPage: '',
      notificationEmail: ''
    },
    sms: {
      enabled: true,
      provider: 'twilio',
      phoneNumber: '',
      templates: {}
    },
    security: {
      mfaEnabled: false,
      sessionTimeout: 30,
      ipWhitelist: [],
      passwordPolicy: {
        minLength: 12,
        requireSpecialChars: true,
        requireNumbers: true,
        expiryDays: 90
      }
    },
    communications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notificationCategories: {
        billing: true,
        security: true,
        updates: true,
        marketing: false
      }
    },
    emailNotifications: true,
    pushNotifications: true,
    autoSave: true,
    defaultTokens: 1000,
    billing: {
      autoRecharge: false,
      autoRechargeThreshold: 100,
      autoRechargeAmount: 1000,
      defaultPaymentMethod: ''
    },
    ai: {
      defaultModel: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      saveHistory: true
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Settings
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your application preferences and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GeneralSettings 
          settings={{
            language: settings.language,
            timezone: settings.timezone,
            theme: settings.theme,
            dateFormat: settings.dateFormat
          }}
          onChange={(newSettings) => setSettings({ ...settings, ...newSettings })}
        />

        <EmailSettings
          settings={settings.email}
          onChange={(newSettings) => setSettings({ ...settings, email: newSettings })}
        />

        <SecuritySettings
          settings={settings.security}
          onChange={(newSettings) => setSettings({ ...settings, security: newSettings })}
        />

        <NotificationSettings
          settings={settings.communications}
          onChange={(newSettings) => setSettings({ ...settings, communications: newSettings })}
        />

        <AISettings
          config={{
            openai: {
              apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
              organization: ''
            },
            anthropic: {
              apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || ''
            },
            google: {
              apiKey: import.meta.env.VITE_GOOGLE_API_KEY || ''
            },
            mistral: {
              apiKey: import.meta.env.VITE_MISTRAL_API_KEY || ''
            },
            defaultProvider: 'openai',
            model: settings.ai.defaultModel,
            temperature: settings.ai.temperature,
            maxTokens: settings.ai.maxTokens,
            responseTimeout: 30000,
            retryAttempts: 3,
            confidenceThreshold: 0.8,
            workingHours: {
              enabled: true,
              start: '09:00',
              end: '17:00',
              timezone: 'America/New_York',
              daysOfWeek: [1, 2, 3, 4, 5]
            }
          }}
          onSave={(newSettings) => setSettings({
            ...settings,
            ai: {
              ...settings.ai,
              defaultModel: newSettings.model,
              temperature: newSettings.temperature,
              maxTokens: newSettings.maxTokens
            }
          })}
        />

        <VoIPSettings
          settings={settings.voip}
          onChange={(newSettings) => setSettings({ ...settings, voip: newSettings })}
        />

        <FaxSettings
          settings={settings.fax}
          onChange={(newSettings) => setSettings({ ...settings, fax: newSettings })}
        />

        <SMSSettings
          settings={settings.sms}
          onChange={(newSettings) => setSettings({ ...settings, sms: newSettings })}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}