import React, { useState } from 'react';
import { Globe, Calendar, Book, AlertTriangle } from 'lucide-react';
import { JurisdictionSettings } from '../../types/court';

export default function JurisdictionManager() {
  const [jurisdictions, setJurisdictions] = useState<JurisdictionSettings[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<JurisdictionSettings | null>(null);

  const handleAddJurisdiction = () => {
    const newJurisdiction: JurisdictionSettings = {
      id: crypto.randomUUID(),
      name: '',
      code: '',
      type: 'state',
      statutes: [],
      rules: [],
      limitations: {
        civil: '',
        criminal: ''
      },
      holidays: [],
      enabled: true
    };
    setJurisdictions([...jurisdictions, newJurisdiction]);
    setSelectedJurisdiction(newJurisdiction);
  };

  const handleSaveJurisdiction = (jurisdiction: JurisdictionSettings) => {
    setJurisdictions(jurisdictions.map(j =>
      j.id === jurisdiction.id ? jurisdiction : j
    ));
    setSelectedJurisdiction(null);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Jurisdictions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage jurisdictional settings and requirements
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleAddJurisdiction}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Globe className="h-4 w-4 mr-2" />
            Add Jurisdiction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jurisdictions.map((jurisdiction) => (
          <div
            key={jurisdiction.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedJurisdiction(jurisdiction)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400" />
                <h4 className="ml-2 text-lg font-medium text-gray-900">
                  {jurisdiction.name}
                </h4>
              </div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                jurisdiction.enabled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {jurisdiction.enabled ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Book className="h-4 w-4 mr-1" />
                  {jurisdiction.statutes.length} Statutes
                </div>
              </div>

              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {jurisdiction.holidays.length} Court Holidays
                </div>
              </div>

              {jurisdiction.limitations.civil && (
                <div className="flex items-center text-sm text-gray-500">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Civil SOL: {jurisdiction.limitations.civil}
                </div>
              )}
            </div>
          </div>
        ))}

        {jurisdictions.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Globe className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No jurisdictions configured
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new jurisdiction.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}