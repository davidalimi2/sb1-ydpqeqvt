import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

interface LegalDocument {
  id: string;
  type: 'terms' | 'privacy' | 'disclaimer' | 'cookie-policy';
  title: string;
  content: string;
  lastUpdated: Date;
  publishedVersion?: string;
}

export default function LegalDocsManager() {
  const [documents, setDocuments] = useState<LegalDocument[]>([
    {
      id: '1',
      type: 'terms',
      title: 'Terms and Conditions',
      content: '',
      lastUpdated: new Date()
    },
    {
      id: '2',
      type: 'privacy',
      title: 'Privacy Policy',
      content: '',
      lastUpdated: new Date()
    }
  ]);

  const [activeDoc, setActiveDoc] = useState<string>(documents[0].id);

  const handleSave = (id: string, content: string) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, content, lastUpdated: new Date() } : doc
    ));
  };

  const handlePublish = (id: string) => {
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, publishedVersion: doc.content } : doc
    ));
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Legal Documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage your legal documents and policies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(doc.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeDoc === doc.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                {doc.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`bg-white shadow rounded-lg ${
                activeDoc === doc.id ? 'block' : 'hidden'
              }`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Document Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={20}
                        value={doc.content}
                        onChange={(e) => handleSave(doc.id, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated: {doc.lastUpdated.toLocaleString()}</span>
                    {doc.publishedVersion && (
                      <span>Published version available</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => handleSave(doc.id, doc.content)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handlePublish(doc.id)}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                >
                  Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}