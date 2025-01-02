import React, { useState } from 'react';
import { Mail, Star, Trash2, Archive, Clock } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
}

interface EmailInboxProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onDeleteEmail: (emailId: string) => void;
  onToggleStar: (emailId: string) => void;
  onArchiveEmail: (emailId: string) => void;
}

export default function EmailInbox({
  emails,
  onSelectEmail,
  onDeleteEmail,
  onToggleStar,
  onArchiveEmail
}: EmailInboxProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const toggleEmailSelection = (emailId: string) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleBulkAction = (action: 'delete' | 'archive') => {
    selectedEmails.forEach(emailId => {
      if (action === 'delete') {
        onDeleteEmail(emailId);
      } else {
        onArchiveEmail(emailId);
      }
    });
    setSelectedEmails([]);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {selectedEmails.length > 0 && (
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
          <span className="text-sm text-gray-700">
            {selectedEmails.length} selected
          </span>
          <div className="space-x-2">
            <button
              onClick={() => handleBulkAction('archive')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}

      <ul className="divide-y divide-gray-200">
        {emails.map((email) => (
          <li
            key={email.id}
            className={`hover:bg-gray-50 ${email.isRead ? '' : 'bg-indigo-50'}`}
          >
            <div className="px-4 py-4 flex items-center">
              <div className="min-w-0 flex-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(email.id)}
                  onChange={() => toggleEmailSelection(email.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <button
                  onClick={() => onToggleStar(email.id)}
                  className={`ml-4 ${
                    email.isStarred ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star className="h-5 w-5" />
                </button>
                <div
                  className="ml-4 cursor-pointer flex-1"
                  onClick={() => onSelectEmail(email)}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm ${email.isRead ? 'text-gray-900' : 'font-semibold text-gray-900'}`}>
                      {email.from}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {email.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className={`text-sm ${email.isRead ? 'text-gray-500' : 'font-medium text-gray-900'}`}>
                      {email.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {email.preview}
                    </p>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center space-x-2">
                <button
                  onClick={() => onArchiveEmail(email.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Archive className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDeleteEmail(email.id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}