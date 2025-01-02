import React, { useState } from 'react';
import { Building2, Search, Plus, Filter, Download, Printer } from 'lucide-react';
import { Court, CourtType, CourtLevel } from '../../types/court';
import CourtList from './CourtList';
import CourtForm from './CourtForm';
import { defaultCourts } from '../../data/courts';

export default function CourtManager() {
  const [courts, setCourts] = useState<Court[]>(defaultCourts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    type: '' as CourtType | '',
    level: '' as CourtLevel | '',
    eFiling: false
  });

  const handleAddCourt = () => {
    setSelectedCourt(null);
    setShowForm(true);
  };

  const handleSaveCourt = (court: Court) => {
    if (court.id) {
      setCourts(courts.map(c => c.id === court.id ? court : c));
    } else {
      const newCourt = {
        ...court,
        id: crypto.randomUUID(),
        lastUpdated: new Date()
      };
      setCourts([...courts, newCourt]);
    }
    setShowForm(false);
  };

  const handleExport = () => {
    const data = JSON.stringify(courts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courts-directory.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredCourts = courts.filter(court => {
    const matchesSearch = 
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = !filters.state || court.state === filters.state;
    const matchesType = !filters.type || court.type === filters.type;
    const matchesLevel = !filters.level || court.level === filters.level;
    const matchesEFiling = !filters.eFiling || court.filingInfo.electronicFiling;

    return matchesSearch && matchesState && matchesType && matchesLevel && matchesEFiling;
  });

  const uniqueStates = Array.from(new Set(courts.map(court => court.state))).sort();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Court Directory</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage court information and filing requirements
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button
            onClick={handleAddCourt}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Court
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Court Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as CourtType | '' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Types</option>
                  <option value="federal">Federal</option>
                  <option value="state">State</option>
                  <option value="appellate">Appellate</option>
                  <option value="district">District</option>
                  <option value="bankruptcy">Bankruptcy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Court Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters({ ...filters, level: e.target.value as CourtLevel | '' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">All Levels</option>
                  <option value="trial">Trial</option>
                  <option value="appellate">Appellate</option>
                  <option value="supreme">Supreme</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.eFiling}
                  onChange={(e) => setFilters({ ...filters, eFiling: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  E-Filing Only
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search courts by name, city, or state..."
              />
            </div>
          </div>

          <CourtList
            courts={filteredCourts}
            onSelect={(court) => {
              setSelectedCourt(court);
              setShowForm(true);
            }}
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CourtForm
              court={selectedCourt || undefined}
              onSubmit={handleSaveCourt}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <style>
        {`
          @media print {
            .bg-white {
              background-color: white !important;
              box-shadow: none !important;
            }
            button {
              display: none !important;
            }
            .shadow {
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}