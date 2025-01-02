import React from 'react';
import { X, Phone, Mail, MapPin, Tag, Calendar, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { Contact } from '../../types/crm';
import DealManager from './DealManager';
import NotesManager from './NotesManager';

interface ContactDetailsProps {
  contact: Contact;
  onClose: () => void;
}

export default function ContactDetails({ contact, onClose }: ContactDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-medium text-gray-600">
                  {contact.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-medium text-gray-900">
                  {contact.name}
                </h4>
                {contact.company && (
                  <p className="text-sm text-gray-500">{contact.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-900">{contact.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-900">{contact.email}</span>
            </div>
            {contact.addresses.map((address, index) => (
              <div key={index} className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-500">{address.type}</span>
                  <p className="text-sm text-gray-900">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {contact.notes && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
              <p className="text-sm text-gray-600">{contact.notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Timeline</h5>
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                <li className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-900">
                          {contact.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                {contact.lastContact && (
                  <li className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-gray-500" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-gray-500">Last Contact</p>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-900">
                            {new Date(contact.lastContact).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Section */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <DealManager
          deals={contact.deals}
          onAddDeal={(deal) => {
            // Handle adding new deal
            console.log('Add deal:', deal);
          }}
          onUpdateDeal={(deal) => {
            // Handle updating deal
            console.log('Update deal:', deal);
          }}
          onDeleteDeal={(dealId) => {
            // Handle deleting deal
            console.log('Delete deal:', dealId);
          }}
        />
      </div>

      {/* Notes Section */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <NotesManager
          notes={contact.notes}
          onAddNote={(note) => {
            // Handle adding new note
            console.log('Add note:', note);
          }}
          onUpdateNote={(note) => {
            // Handle updating note
            console.log('Update note:', note);
          }}
          onDeleteNote={(noteId) => {
            // Handle deleting note
            console.log('Delete note:', noteId);
          }}
        />
      </div>
    </div>
  );
}