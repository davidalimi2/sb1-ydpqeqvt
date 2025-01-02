import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Printer, Search } from 'lucide-react';
import ContactList from './ContactList';
import CommunicationPanel from './CommunicationPanel';
import ContactDetails from './ContactDetails';
import { Contact } from '../../types/crm';

export default function CRMDashboard() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [communicationType, setCommunicationType] = useState<'all' | 'call' | 'sms' | 'email' | 'fax'>('all');

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Contact List */}
      <div className="w-1/4 border-r border-gray-200 bg-white">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ContactList
          searchTerm={searchTerm}
          onSelectContact={setSelectedContact}
          selectedContact={selectedContact}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Communication Controls */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setCommunicationType('call')}
              className={`flex items-center px-4 py-2 rounded-md ${
                communicationType === 'call'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call
            </button>
            <button
              onClick={() => setCommunicationType('sms')}
              className={`flex items-center px-4 py-2 rounded-md ${
                communicationType === 'sms'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              SMS
            </button>
            <button
              onClick={() => setCommunicationType('email')}
              className={`flex items-center px-4 py-2 rounded-md ${
                communicationType === 'email'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </button>
            <button
              onClick={() => setCommunicationType('fax')}
              className={`flex items-center px-4 py-2 rounded-md ${
                communicationType === 'fax'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Printer className="h-5 w-5 mr-2" />
              Fax
            </button>
          </div>
        </div>

        {/* Communication Area */}
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-50">
            <CommunicationPanel
              contact={selectedContact}
              type={communicationType}
            />
          </div>
          
          {/* Right Sidebar - Contact Details */}
          {selectedContact && (
            <div className="w-1/3 border-l border-gray-200 bg-white overflow-y-auto">
              <ContactDetails
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}