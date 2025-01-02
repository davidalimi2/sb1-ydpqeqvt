import React, { useState } from 'react';
import { Mail, Settings } from 'lucide-react';
import EmailTemplateManager from '../components/email/EmailTemplateManager';
import EmailSettings from '../components/email/EmailSettings';
import { EmailConfig } from '../types/email';

const defaultConfig: EmailConfig = {
  fromName: 'Legal Platform',
  fromEmail: 'notifications@example.com',
  footerText: '© 2024 Legal Platform. All rights reserved.',
  primaryColor: '#4F46E5',
  useCustomSMTP: false
};

export default function EmailManagement() {
  const [activeTab, setActiveTab] = useState<'templates' | 'settings'>('templates');
  const [config, setConfig] = useState<EmailConfig>(defaultConfig);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Email Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage email templates and configuration
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`${
              activeTab === 'templates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Templates
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
        </nav>
      </div>

      {activeTab === 'templates' ? (
        <EmailTemplateManager />
      ) : (
        <EmailSettings
          config={config}
          onSave={setConfig}
        />
      )}
    </div>
  );
}