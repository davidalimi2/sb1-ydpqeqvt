import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Printer, Settings, Bot, PenSquare } from 'lucide-react';
import CRMDashboard from '../components/crm/CRMDashboard';
import CRMSettings from '../components/crm/CRMSettings';
import AISettings from '../components/ai/AISettings';
import EmailInbox from '../components/email/EmailInbox';
import EmailComposer from '../components/email/EmailComposer';
import SignatureEditor from '../components/email/SignatureEditor';
import { CRMConfig } from '../types/crm';
import { AIAgent } from '../types/crm';

const defaultAgent: AIAgent = {
  id: '1',
  name: 'Support Agent',
  description: 'AI agent for handling customer support inquiries',
  capabilities: [
    'Answer common questions',
    'Schedule appointments', 
    'Transfer to human agent',
    'Take messages'
  ],
  isActive: true,
  settings: {
    greeting: "Hello! I'm the AI support assistant. How can I help you today?",
    maxResponseTime: 30,
    transferThreshold: 0.8,
    allowedActions: ['answer', 'transfer', 'schedule', 'message']
  }
};

const defaultConfig: CRMConfig = {
  voip: {
    provider: 'voipms',
    settings: {
      accountSid: '',
      authToken: '',
      defaultCallerId: '',
      webRTCEnabled: true,
      recordCalls: false,
      transcribeVoicemail: true
    }
  },
  sms: {
    provider: 'twilio',
    settings: {
      accountSid: '',
      authToken: '',
      phoneNumber: '',
      enableTemplates: true
    }
  },
  email: {
    smtp: {
      host: '',
      port: 587,
      secure: true,
      user: '',
      password: ''
    },
    defaultFrom: '',
    signature: ''
  },
  fax: {
    provider: 'twilio',
    settings: {
      faxNumber: ''
    }
  },
  aiAgent: {
    enabled: true,
    model: 'gpt-4',
    maxResponseTime: 30,
    transferThreshold: 0.8,
    workingHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'America/New_York',
      daysOfWeek: [1, 2, 3, 4, 5]
    }
  }
};

const mockEmails = [
  {
    id: '1',
    from: 'john@example.com',
    subject: 'Meeting Tomorrow',
    preview: 'Hi, just wanted to confirm our meeting tomorrow at 2 PM...',
    date: new Date(),
    isRead: false,
    isStarred: true,
    hasAttachments: false
  }
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings' | 'ai-agent' | 'email'>('dashboard');
  const [config, setConfig] = useState<CRMConfig>(defaultConfig);
  const [isAIConfigCollapsed, setIsAIConfigCollapsed] = useState(true);
  const [emailView, setEmailView] = useState<'inbox' | 'compose' | 'signature'>('inbox');
  const [signature, setSignature] = useState('');

  const handleSendEmail = async (email: {
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
    content: string;
    attachments: File[];
  }) => {
    console.log('Sending email:', email);
    setEmailView('inbox');
  };

  const handleSaveSignature = (newSignature: string) => {
    setSignature(newSignature);
    setEmailView('inbox');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Customer Relationship Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage contacts and communications
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Phone className="h-5 w-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </button>
          <button
            onClick={() => setActiveTab('ai-agent')}
            className={`${
              activeTab === 'ai-agent'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Bot className="h-5 w-5 mr-2" />
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`${
              activeTab === 'email'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Email
          </button>
        </nav>
      </div>

      {activeTab === 'dashboard' ? (
        <CRMDashboard />
      ) : activeTab === 'ai-agent' ? (
        <div className="space-y-6">
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
              model: config.aiAgent.model,
              temperature: 0.7,
              maxTokens: 2000,
              responseTimeout: config.aiAgent.maxResponseTime * 1000,
              retryAttempts: 3,
              confidenceThreshold: config.aiAgent.transferThreshold,
              workingHours: config.aiAgent.workingHours
            }}
            onSave={(newConfig) => {
              setConfig({
                ...config,
                aiAgent: {
                  ...config.aiAgent,
                  model: newConfig.model,
                  maxResponseTime: newConfig.responseTimeout / 1000,
                  transferThreshold: newConfig.confidenceThreshold,
                  workingHours: newConfig.workingHours
                }
              });
            }}
          />
          
          {/* Additional AI Agent Features */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Response Time</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">85%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Satisfaction</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">92%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Conversation Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Conversations</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Successful Resolutions</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Average Duration</span>
                  <span className="font-medium">4m 32s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'email' ? (
        <div className="space-y-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setEmailView('inbox')}
                className={`${
                  emailView === 'inbox'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                <Mail className="h-5 w-5 mr-2" />
                Inbox
              </button>
              <button
                onClick={() => setEmailView('compose')}
                className={`${
                  emailView === 'compose'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                <PenSquare className="h-5 w-5 mr-2" />
                Compose
              </button>
              <button
                onClick={() => setEmailView('signature')}
                className={`${
                  emailView === 'signature'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              >
                <Settings className="h-5 w-5 mr-2" />
                Signature
              </button>
            </nav>
          </div>

          {emailView === 'inbox' && (
            <EmailInbox
              emails={mockEmails}
              onSelectEmail={(email) => console.log('Selected email:', email)}
              onDeleteEmail={(emailId) => console.log('Delete email:', emailId)}
              onToggleStar={(emailId) => console.log('Toggle star:', emailId)}
              onArchiveEmail={(emailId) => console.log('Archive email:', emailId)}
            />
          )}

          {emailView === 'compose' && (
            <EmailComposer
              onSend={handleSendEmail}
              onCancel={() => setEmailView('inbox')}
              signature={signature}
            />
          )}

          {emailView === 'signature' && (
            <SignatureEditor
              initialSignature={signature}
              onSave={handleSaveSignature}
            />
          )}
        </div>
      ) : (
        <CRMSettings config={config} onSave={setConfig} />
      )}
    </div>
  );
}