import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, Clock } from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: Date;
  lastUsed?: Date;
  scopes: string[];
}

export default function APIKeyManagement() {
  const [keys, setKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      prefix: 'pk_live_',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-03-16'),
      scopes: ['read', 'write']
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const handleCreateKey = () => {
    // Implementation for creating new API key
    setShowCreateForm(false);
  };

  const handleRevokeKey = (keyId: string) => {
    setKeys(keys.filter(key => key.id !== keyId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                API Keys
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage API keys for accessing the API
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0">
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create API Key
              </button>
            </div>
          </div>

          {showCreateForm && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Production API Key"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Scopes
                  </label>
                  <div className="mt-2 space-y-2">
                    {['read', 'write', 'delete'].map((scope) => (
                      <label key={scope} className="inline-flex items-center mr-4">
                        <input
                          type="checkbox"
                          checked={selectedScopes.includes(scope)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedScopes([...selectedScopes, scope]);
                            } else {
                              setSelectedScopes(selectedScopes.filter(s => s !== scope));
                            }
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {scope.charAt(0).toUpperCase() + scope.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateKey}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Create Key
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <ul role="list" className="divide-y divide-gray-200">
              {keys.map((key) => (
                <li key={key.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <Key className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {key.name}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <span className="font-mono">{key.prefix}***************</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRevokeKey(key.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Created {key.createdAt.toLocaleDateString()}
                      </span>
                      {key.lastUsed && (
                        <span>
                          Last used {key.lastUsed.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}