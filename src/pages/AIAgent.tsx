import React, { useState } from 'react';
import { Bot, Settings } from 'lucide-react';
import AIAgentConfig from '../components/crm/AIAgentConfig';
import AISettings from '../components/ai/AISettings';
import BillingSupportAgent from '../components/crm/BillingSupportAgent';
import { AIAgent } from '../types/crm';

const defaultAIConfig = {
  defaultProvider: 'openai' as const,
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  responseTimeout: 30000,
  retryAttempts: 3,
  confidenceThreshold: 0.8,
  workingHours: {
    enabled: true,
    start: '09:00',
    end: '17:00',
    timezone: 'America/New_York',
    daysOfWeek: [1, 2, 3, 4, 5]
  }
};

const defaultAgent: AIAgent = {
  id: '1',
  name: 'Support Agent',
  description: 'AI agent for handling customer support inquiries',
  capabilities: [
    'Answer common questions',
    'Schedule appointments',
    'Transfer to human agent',
    'Take messages'
  ],
  isActive: true,
  settings: {
    greeting: "Hello! I'm the AI support assistant. How can I help you today?",
    maxResponseTime: 30,
    transferThreshold: 0.8,
    allowedActions: ['answer', 'transfer', 'schedule', 'message']
  }
};

export default function AIAgentPage() {
  const [agent, setAgent] = useState<AIAgent>(defaultAgent);
  const [aiConfig, setAIConfig] = useState(defaultAIConfig);

  const handleSave = (updatedAgent: AIAgent) => {
    setAgent(updatedAgent);
  };

  const handleSaveConfig = (config: any) => {
    setAIConfig(config);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          AI Agent Configuration
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Configure your AI agent's behavior and capabilities
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Configuration</h3>
        <AISettings config={aiConfig} onSave={handleSaveConfig} />
      </div>

      <AIAgentConfig agent={agent} onSave={handleSave} />
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Support Demo</h3>
        <BillingSupportAgent />
      </div>
    </div>
  );
}