import React, { useState } from 'react';
import { Mail, Settings, PenSquare } from 'lucide-react';
import EmailInbox from '../components/email/EmailInbox';
import EmailComposer from '../components/email/EmailComposer';
import SignatureEditor from '../components/email/SignatureEditor';

// Mock data
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
  },
  // Add more mock emails...
];

export default function Email() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose' | 'signature'>('inbox');
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
    setActiveTab('inbox');
  };

  const handleSaveSignature = (newSignature: string) => {
    setSignature(newSignature);
    setActiveTab('inbox');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Email Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your email communications
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`${
              activeTab === 'inbox'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Mail className="h-5 w-5 mr-2" />
            Inbox
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`${
              activeTab === 'compose'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <PenSquare className="h-5 w-5 mr-2" />
            Compose
          </button>
          <button
            onClick={() => setActiveTab('signature')}
            className={`${
              activeTab === 'signature'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Signature
          </button>
        </nav>
      </div>

      {activeTab === 'inbox' && (
        <EmailInbox
          emails={mockEmails}
          onSelectEmail={(email) => console.log('Selected email:', email)}
          onDeleteEmail={(emailId) => console.log('Delete email:', emailId)}
          onToggleStar={(emailId) => console.log('Toggle star:', emailId)}
          onArchiveEmail={(emailId) => console.log('Archive email:', emailId)}
        />
      )}

      {activeTab === 'compose' && (
        <EmailComposer
          onSend={handleSendEmail}
          onCancel={() => setActiveTab('inbox')}
          signature={signature}
        />
      )}

      {activeTab === 'signature' && (
        <SignatureEditor
          initialSignature={signature}
          onSave={handleSaveSignature}
        />
      )}
    </div>
  );
}