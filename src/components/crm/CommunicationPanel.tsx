import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Printer, Mic, MicOff } from 'lucide-react';
import { Contact } from '../../types/crm';

interface CommunicationPanelProps {
  contact: Contact | null;
  type: 'all' | 'call' | 'sms' | 'email' | 'fax';
}

export default function CommunicationPanel({ contact, type }: CommunicationPanelProps) {
  const [message, setMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Handle different types of communication
    switch (type) {
      case 'sms':
        // Implement Twilio SMS
        console.log('Sending SMS:', message);
        break;
      case 'email':
        // Implement email
        console.log('Sending email:', message);
        break;
      case 'fax':
        // Implement fax
        console.log('Sending fax:', message);
        break;
    }

    setMessage('');
  };

  const handleCall = () => {
    // Implement VoIP.ms call
    setIsCallActive(!isCallActive);
  };

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a contact to start communication
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Communication Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-medium text-gray-600">
                {contact.name.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">{contact.name}</h2>
              <p className="text-sm text-gray-500">{contact.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {type === 'call' && (
          <div className="flex flex-col items-center justify-center h-full">
            {isCallActive ? (
              <div className="space-y-4">
                <div className="text-2xl font-medium text-gray-900">
                  Call in progress...
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-full ${
                      isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isMuted ? (
                      <MicOff className="h-6 w-6" />
                    ) : (
                      <Mic className="h-6 w-6" />
                    )}
                  </button>
                  <button
                    onClick={handleCall}
                    className="p-4 rounded-full bg-red-600 text-white"
                  >
                    <Phone className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleCall}
                className="p-4 rounded-full bg-green-600 text-white"
              >
                <Phone className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      {type !== 'call' && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Type your ${type} message...`}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}