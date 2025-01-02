import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, MessageSquare, Download, Printer, ArrowUpDown } from 'lucide-react';
import { VerificationRequest } from '../../types/lawyer';

interface VerificationDashboardProps {
  requests: VerificationRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, reason: string) => void;
  onRequestInfo: (requestId: string, message: string) => void;
}

export default function VerificationDashboard({
  requests,
  onApprove,
  onReject,
  onRequestInfo
}: VerificationDashboardProps) {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [infoRequest, setInfoRequest] = useState('');

  const handleApprove = (request: VerificationRequest) => {
    onApprove(request.id);
    setSelectedRequest(null);
  };

  const handleReject = (request: VerificationRequest) => {
    onReject(request.id, rejectReason);
    setRejectReason('');
    setSelectedRequest(null);
  };

  const handleRequestInfo = (request: VerificationRequest) => {
    onRequestInfo(request.id, infoRequest);
    setInfoRequest('');
    setSelectedRequest(null);
  };

  const [sortField, setSortField] = useState<'submittedAt' | 'status'>('submittedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedRequests = [...requests].sort((a, b) => {
    if (sortField === 'submittedAt') {
      return sortDirection === 'asc' 
        ? a.submittedAt.getTime() - b.submittedAt.getTime()
        : b.submittedAt.getTime() - a.submittedAt.getTime();
    }
    return sortDirection === 'asc'
      ? a.status.localeCompare(b.status)
      : b.status.localeCompare(a.status);
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSort = (field: 'submittedAt' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {sortedRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Verification Request
              </h3>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                request.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : request.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                <ul className="mt-2 divide-y divide-gray-200">
                  {request.documents.map((doc) => (
                    <li key={doc.type} className="py-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{doc.type}</span>
                        {doc.status === 'verified' && (
                          <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <button
                        onClick={() => window.open(doc.url)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                <div className="mt-2 space-y-2">
                  {request.notes.map((note, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <p className="font-medium">{note.author}</p>
                      <p>{note.content}</p>
                      <p className="text-xs text-gray-400">
                        {note.timestamp.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </button>
                <button
                  onClick={() => handleApprove(request)}
                  className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Note
            </h3>
            <textarea
              value={infoRequest}
              onChange={(e) => setInfoRequest(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your note..."
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRequestInfo(selectedRequest)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}