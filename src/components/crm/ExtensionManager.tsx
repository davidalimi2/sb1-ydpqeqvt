import React, { useState } from 'react';
import { Phone, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Extension {
  id: string;
  number: string;
  name: string;
  type: 'user' | 'ring_group' | 'ivr' | 'voicemail';
  destination?: string;
  ringTimeout?: number;
  members?: string[];
}

export default function ExtensionManager() {
  const { user } = useAuth();
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (extension: Extension) => {
    if (extension.id) {
      setExtensions(extensions.map(e => e.id === extension.id ? extension : e));
    } else {
      setExtensions([...extensions, { ...extension, id: crypto.randomUUID() }]);
    }
    setShowForm(false);
  };

  if (!user?.permissions?.webPhone.canConfigureExtensions) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Extension Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure phone extensions and ring groups
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setSelectedExtension(null);
              setShowForm(true);
            }}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Extension
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {extensions.map((extension) => (
            <li key={extension.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{extension.name}</p>
                    <p className="text-sm text-gray-500">Extension: {extension.number}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setSelectedExtension(extension);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setExtensions(extensions.filter(e => e.id !== extension.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {selectedExtension ? 'Edit Extension' : 'Add Extension'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSave({
                id: selectedExtension?.id || '',
                number: formData.get('number') as string,
                name: formData.get('name') as string,
                type: formData.get('type') as Extension['type'],
                destination: formData.get('destination') as string,
                ringTimeout: parseInt(formData.get('ringTimeout') as string) || undefined,
                members: formData.get('members') ? (formData.get('members') as string).split(',') : undefined
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Extension Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    defaultValue={selectedExtension?.number}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedExtension?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    name="type"
                    defaultValue={selectedExtension?.type || 'user'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="ring_group">Ring Group</option>
                    <option value="ivr">IVR</option>
                    <option value="voicemail">Voicemail</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}