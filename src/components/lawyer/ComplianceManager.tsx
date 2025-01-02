import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowUpDown, Download, Printer } from 'lucide-react';
import { LawyerProfile } from '../../types/lawyer';

interface ComplianceManagerProps {
  lawyers: LawyerProfile[];
  onIssueWarning: (lawyerId: string, reason: string) => void;
  onSuspend: (lawyerId: string, reason: string) => void;
  onReinstate: (lawyerId: string) => void;
}

export default function ComplianceManager({
  lawyers,
  onIssueWarning,
  onSuspend,
  onReinstate
}: ComplianceManagerProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [actionType, setActionType] = useState<'warning' | 'suspension' | 'reinstatement' | null>(null);
  const [sortField, setSortField] = useState<'name' | 'status'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedLawyers = [...lawyers].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortDirection === 'asc'
      ? a.status.localeCompare(b.status)
      : b.status.localeCompare(a.status);
  });

  const handleSort = (field: 'name' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportData = () => {
    const data = lawyers.map(lawyer => ({
      name: lawyer.name,
      status: lawyer.status,
      complianceHistory: lawyer.complianceHistory
    }));
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAction = () => {
    if (!selectedLawyer || !actionType) return;

    switch (actionType) {
      case 'warning':
        onIssueWarning(selectedLawyer.id, actionReason);
        break;
      case 'suspension':
        onSuspend(selectedLawyer.id, actionReason);
        break;
      case 'reinstatement':
        onReinstate(selectedLawyer.id);
        break;
    }

    setSelectedLawyer(null);
    setActionReason('');
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={handleExportData}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Compliance Management</h3>
          
          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1"
                    >
                      <span>Lawyer</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('status')}
                      className="flex items-center space-x-1"
                    >
                      <span>Status</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance History
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lawyers.map((lawyer) => (
                  <tr key={lawyer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {lawyer.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        lawyer.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : lawyer.status === 'suspended'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lawyer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {lawyer.complianceHistory.map((event, index) => (
                          <div key={index} className="mb-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              event.type === 'warning'
                                ? 'bg-yellow-100 text-yellow-800'
                                : event.type === 'suspension'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {event.type}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {event.date.toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedLawyer(lawyer);
                          setActionType('warning');
                        }}
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        Issue Warning
                      </button>
                      {lawyer.status !== 'suspended' ? (
                        <button
                          onClick={() => {
                            setSelectedLawyer(lawyer);
                            setActionType('suspension');
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedLawyer(lawyer);
                            setActionType('reinstatement');
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          Reinstate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLawyer && actionType && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {actionType === 'warning'
                ? 'Issue Warning'
                : actionType === 'suspension'
                ? 'Suspend Lawyer'
                : 'Reinstate Lawyer'}
            </h3>
            
            {actionType !== 'reinstatement' && (
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter reason..."
              />
            )}

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedLawyer(null);
                  setActionReason('');
                  setActionType(null);
                }}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                  actionType === 'warning'
                    ? 'bg-yellow-600 hover:bg-yellow-500'
                    : actionType === 'suspension'
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-green-600 hover:bg-green-500'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}