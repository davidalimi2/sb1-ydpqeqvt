import React from 'react';
import { User, Star, Calendar } from 'lucide-react';
import { Contact } from '../../types/crm';

interface ContactListProps {
  searchTerm: string;
  onSelectContact: (contact: Contact) => void;
  selectedContact: Contact | null;
}

export default function ContactList({
  searchTerm,
  onSelectContact,
  selectedContact
}: ContactListProps) {
  const [contacts] = React.useState<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      company: 'Acme Inc',
      status: 'active',
      notes: 'Key client',
      tags: ['vip', 'corporate'],
      communicationPreference: ['email', 'call'],
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses: [],
      customFields: {},
      source: 'referral',
      timezone: 'America/New_York'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="overflow-y-auto">
      <ul role="list" className="divide-y divide-gray-200">
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
              selectedContact?.id === contact.id ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {contact.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {contact.tags.includes('vip') && (
                  <Star className="h-4 w-4 text-yellow-400" />
                )}
                <span className="text-xs text-gray-500">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  {contact.lastContact
                    ? new Date(contact.lastContact).toLocaleDateString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}