import React from 'react';
import { Document } from '../../types/content';
import { FileText, Tag, Clock, Shield, MoreVertical } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface DocumentListProps {
  documents: Document[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'review':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      case 'draft':
        return 'bg-gray-50 text-gray-700 ring-gray-600/20';
      case 'archived':
        return 'bg-red-50 text-red-700 ring-red-600/20';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <ul role="list" className="divide-y divide-gray-200">
        {documents.map((document) => (
          <li key={document.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {document.title}
                  </p>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(document.status)}`}>
                      {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                    </span>
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {document.accessLevel}
                    <span className="mx-2">•</span>
                    <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {document.tags.join(', ')}
                    <span className="mx-2">•</span>
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    Updated {formatDate(document.updatedAt)}
                  </div>
                </div>
                {document.metadata.practice_area && (
                  <div className="mt-1 text-sm text-gray-500">
                    Practice Area: {document.metadata.practice_area}
                    {document.metadata.jurisdiction && ` • Jurisdiction: ${document.metadata.jurisdiction}`}
                    {document.metadata.client_matter && ` • Matter: ${document.metadata.client_matter}`}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}