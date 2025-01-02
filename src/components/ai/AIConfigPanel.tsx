import React from 'react';
import { Settings, Zap } from 'lucide-react';
import { AIConfig, AIProvider, AIModel } from '../../types/ai';

interface AIConfigPanelProps {
  config: AIConfig;
  onConfigChange: (config: AIConfig) => void;
}

export default function AIConfigPanel({ config, onConfigChange }: AIConfigPanelProps) {
  const providers: { value: AIProvider; label: string }[] = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'google', label: 'Google AI' }
  ];

  const models: { value: AIModel; label: string; provider: AIProvider }[] = [
    { value: 'gpt-4', label: 'GPT-4', provider: 'openai' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'openai' },
    { value: 'claude-2', label: 'Claude 2', provider: 'anthropic' },
    { value: 'gemini-pro', label: 'Gemini Pro', provider: 'google' }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Settings className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">AI Configuration</h3>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Zap className="h-4 w-4 mr-1" />
          Estimated cost: ${((config.maxTokens || 1000) * 0.002).toFixed(3)}/request
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Provider</label>
          <select
            value={config.provider}
            onChange={(e) => {
              const provider = e.target.value as AIProvider;
              const availableModel = models.find(m => m.provider === provider)?.value;
              onConfigChange({ ...config, provider, model: availableModel! });
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {providers.map((provider) => (
              <option key={provider.value} value={provider.value}>
                {provider.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <select
            value={config.model}
            onChange={(e) => onConfigChange({ ...config, model: e.target.value as AIModel })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {models
              .filter((model) => model.provider === config.provider)
              .map((model) => (
                <option key={model.value} value={model.value}>
                  {model.label}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.temperature ?? 0.7}
            onChange={(e) => onConfigChange({ ...config, temperature: parseFloat(e.target.value) })}
            className="mt-1 block w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
          <input
            type="number"
            value={config.maxTokens ?? 1000}
            onChange={(e) => onConfigChange({ ...config, maxTokens: parseInt(e.target.value) })}
            min="1"
            max="4000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}