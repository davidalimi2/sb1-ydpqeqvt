import React from 'react';
import { Court } from '../../types/court';
import { Building2, MapPin, Globe, Phone, Mail } from 'lucide-react';

interface CourtListProps {
  courts: Court[];
  onSelect: (court: Court) => void;
}

export default function CourtList({ courts, onSelect }: CourtListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {courts.map((court) => (
          <li
            key={court.id}
            className="hover:bg-gray-50 cursor-pointer p-4"
            onClick={() => onSelect(court)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Building2 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {court.name}
                </p>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  {court.address.city}, {court.address.state}
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  {court.contact.website && (
                    <a
                      href={court.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-indigo-600"
                    >
                      <Globe className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      Website
                    </a>
                  )}
                  {court.contact.phone && (
                    <span className="flex items-center">
                      <Phone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {court.contact.phone}
                    </span>
                  )}
                  {court.contact.email && (
                    <span className="flex items-center">
                      <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {court.contact.email}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  court.filingInfo.electronicFiling
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {court.filingInfo.electronicFiling ? 'E-Filing' : 'Paper Filing'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}