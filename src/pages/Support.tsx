import React, { useState } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import KnowledgeBase from '../components/support/KnowledgeBase';
import SupportTicketForm from '../components/support/SupportTicketForm';
import LiveChat from '../components/support/LiveChat';

const mockArticles = [
  {
    id: '1',
    title: 'Getting Started Guide',
    category: 'Basics',
    excerpt: 'Learn the basics of using our platform and its key features.',
    url: '#'
  },
  {
    id: '2',
    title: 'API Documentation',
    category: 'Technical',
    excerpt: 'Comprehensive guide to integrating with our API.',
    url: '#'
  }
];

export default function Support() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  const handleTicketSubmit = (data: any) => {
    console.log('Ticket submitted:', data);
    setShowTicketForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Support Center
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Get help and support for your questions
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0 space-x-3">
          <button
            type="button"
            onClick={() => setShowTicketForm(true)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <HelpCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
            Submit Ticket
          </button>
          <button
            type="button"
            onClick={() => setShowLiveChat(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <MessageCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
            Live Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <KnowledgeBase articles={mockArticles} onSearch={handleSearch} />
        {showLiveChat ? (
          <LiveChat />
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Need immediate assistance?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start a live chat with our support team
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowLiveChat(true)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Start Chat
              </button>
            </div>
          </div>
        )}
      </div>

      {showTicketForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4">
            <SupportTicketForm
              onSubmit={handleTicketSubmit}
              onCancel={() => setShowTicketForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}