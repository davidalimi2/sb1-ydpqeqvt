import React, { useState } from 'react';
import { Save, Tag, GitBranch } from 'lucide-react';
import { Feature } from '../../types/features';

interface FeatureEditorProps {
  feature: Feature;
  onSave: (feature: Feature) => void;
  onCancel: () => void;
  existingFeatures: Feature[];
}

export default function FeatureEditor({
  feature,
  onSave,
  onCancel,
  existingFeatures
}: FeatureEditorProps) {
  const [editedFeature, setEditedFeature] = useState(feature);
  const [newTag, setNewTag] = useState('');
  const [newDependency, setNewDependency] = useState('');

  const handleSave = () => {
    onSave({
      ...editedFeature,
      updatedAt: new Date()
    });
  };

  const addTag = () => {
    if (newTag && !editedFeature.tags.includes(newTag)) {
      setEditedFeature({
        ...editedFeature,
        tags: [...editedFeature.tags, newTag]
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setEditedFeature({
      ...editedFeature,
      tags: editedFeature.tags.filter(t => t !== tag)
    });
  };

  const addDependency = () => {
    if (newDependency && !editedFeature.dependencies?.includes(newDependency)) {
      setEditedFeature({
        ...editedFeature,
        dependencies: [...(editedFeature.dependencies || []), newDependency]
      });
      setNewDependency('');
    }
  };

  const removeDependency = (dep: string) => {
    setEditedFeature({
      ...editedFeature,
      dependencies: editedFeature.dependencies?.filter(d => d !== dep)
    });
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feature Name
            </label>
            <input
              type="text"
              value={editedFeature.name}
              onChange={(e) => setEditedFeature({ ...editedFeature, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Feature Key
            </label>
            <input
              type="text"
              value={editedFeature.key}
              onChange={(e) => setEditedFeature({
                ...editedFeature,
                key: e.target.value.toLowerCase().replace(/\s+/g, '_')
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={editedFeature.description}
              onChange={(e) => setEditedFeature({ ...editedFeature, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {editedFeature.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove tag</span>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={addTag}
                className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
              >
                <Tag className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dependencies
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {editedFeature.dependencies?.map((dep) => (
                <span
                  key={dep}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800"
                >
                  {dep}
                  <button
                    type="button"
                    onClick={() => removeDependency(dep)}
                    className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                  >
                    <span className="sr-only">Remove dependency</span>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-2 flex">
              <select
                value={newDependency}
                onChange={(e) => setNewDependency(e.target.value)}
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a dependency</option>
                {existingFeatures
                  .filter(f => f.id !== feature.id)
                  .map(f => (
                    <option key={f.id} value={f.key}>{f.name}</option>
                  ))
                }
              </select>
              <button
                type="button"
                onClick={addDependency}
                className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
              >
                <GitBranch className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}