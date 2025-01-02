import React, { useState } from 'react';
import { Bot, Save, Plus, Trash2 } from 'lucide-react';
import { AIAgent } from '../../types/crm';
import { useAuth } from '../../contexts/AuthContext';

interface AIAgentConfigProps {
  agent: AIAgent;
  onSave: (agent: AIAgent) => void;
}

export default function AIAgentConfig({ agent, onSave }: AIAgentConfigProps) {
  const { user } = useAuth();
  const [editedAgent, setEditedAgent] = useState(agent);
  const [newCapability, setNewCapability] = useState('');

  if (!user?.permissions?.aiAgent.canConfigure) {
    return null;
  }

  const handleSave = () => {
    onSave(editedAgent);
  };

  const addCapability = () => {
    if (newCapability && !editedAgent.capabilities.includes(newCapability)) {
      setEditedAgent({
        ...editedAgent,
        capabilities: [...editedAgent.capabilities, newCapability]
      });
      setNewCapability('');
    }
  };

  const removeCapability = (capability: string) => {
    setEditedAgent({
      ...editedAgent,
      capabilities: editedAgent.capabilities.filter(c => c !== capability)
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Bot className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">AI Agent Configuration</h3>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agent Name
          </label>
          <input
            type="text"
            value={editedAgent.name}
            onChange={(e) => setEditedAgent({ ...editedAgent, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={editedAgent.description}
            onChange={(e) => setEditedAgent({ ...editedAgent, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capabilities
          </label>
          <div className="mt-2 space-y-2">
            {editedAgent.capabilities.map((capability) => (
              <div key={capability} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span className="text-sm text-gray-700">{capability}</span>
                <button
                  onClick={() => removeCapability(capability)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              value={newCapability}
              onChange={(e) => setNewCapability(e.target.value)}
              placeholder="Add new capability"
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={addCapability}
              className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Greeting Message
              </label>
              <input
                type="text"
                value={editedAgent.settings.greeting || ''}
                onChange={(e) => setEditedAgent({
                  ...editedAgent,
                  settings: { ...editedAgent.settings, greeting: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Response Time (seconds)
              </label>
              <input
                type="number"
                value={editedAgent.settings.maxResponseTime || 30}
                onChange={(e) => setEditedAgent({
                  ...editedAgent,
                  settings: { ...editedAgent.settings, maxResponseTime: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transfer Threshold
              </label>
              <input
                type="number"
                value={editedAgent.settings.transferThreshold || 0.8}
                onChange={(e) => setEditedAgent({
                  ...editedAgent,
                  settings: { ...editedAgent.settings, transferThreshold: parseFloat(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}