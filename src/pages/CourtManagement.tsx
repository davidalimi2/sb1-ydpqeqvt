import React, { useState } from 'react';
import { Building2, Globe } from 'lucide-react';
import CourtManager from '../components/court/CourtManager';
import JurisdictionManager from '../components/court/JurisdictionManager';

export default function CourtManagement() {
  const [activeTab, setActiveTab] = useState<'courts' | 'jurisdictions'>('courts');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Court Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage court information and jurisdictional settings
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('courts')}
            className={`${
              activeTab === 'courts'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Building2 className="h-5 w-5 mr-2" />
            Courts
          </button>
          <button
            onClick={() => setActiveTab('jurisdictions')}
            className={`${
              activeTab === 'jurisdictions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Globe className="h-5 w-5 mr-2" />
            Jurisdictions
          </button>
        </nav>
      </div>

      {activeTab === 'courts' ? (
        <CourtManager />
      ) : (
        <JurisdictionManager />
      )}
    </div>
  );
}