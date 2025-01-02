import React, { useState } from 'react';
import { Document, DocumentFilter } from '../types/content';
import DocumentList from '../components/content/DocumentList';
import DocumentFilters from '../components/content/DocumentFilters';
import DocumentUpload from '../components/content/DocumentUpload';
import TemplateLibrary from '../components/content/TemplateLibrary';
import { Plus, Library } from 'lucide-react';

// Mock data - replace with actual API calls
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Service Agreement Template',
    type: 'template',
    status: 'approved',
    content: '',
    version: 1,
    accessLevel: 'organization',
    tags: ['contract', 'service-agreement'],
    createdBy: 'john@example.com',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-15'),
    metadata: {
      jurisdiction: 'CA',
      practice_area: 'Corporate'
    }
  },
  {
    id: '2',
    title: 'Client Brief - Smith v. Jones',
    type: 'brief',
    status: 'draft',
    content: '',
    version: 2,
    accessLevel: 'team',
    tags: ['litigation', 'employment'],
    createdBy: 'jane@example.com',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-16'),
    metadata: {
      practice_area: 'Employment Law',
      client_matter: 'SM-2024-001'
    }
  }
];

export default function Content() {
  const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');
  const [filters, setFilters] = useState<DocumentFilter>({});
  const [showUpload, setShowUpload] = useState(false);

  const handleUpload = async (files: File[]) => {
    console.log('Uploading files:', files);
    setShowUpload(false);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Document Management
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your legal documents, templates, and resources
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
            Upload Documents
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('documents')}
            className={`${
              activeTab === 'documents'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`${
              activeTab === 'templates'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Library className="mr-2 h-5 w-5" />
            Template Library
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <DocumentFilters filters={filters} onFilterChange={setFilters} />
        </div>
        <div className="lg:col-span-3">
          {activeTab === 'documents' ? (
            <DocumentList documents={mockDocuments} />
          ) : (
            <TemplateLibrary />
          )}
        </div>
      </div>

      {showUpload && (
        <DocumentUpload
          onUpload={handleUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}