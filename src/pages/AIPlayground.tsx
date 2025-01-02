import React, { useState } from 'react';
import { AIMessage, AIResponse, RoutingStrategy } from '../types/ai';
import { useAI } from '../hooks/useAI';
import { 
  Brain, 
  Zap, 
  BarChart, 
  Send,
  RotateCcw,
  Copy
} from 'lucide-react';

export default function AIPlayground() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [routingStrategy, setRoutingStrategy] = useState<RoutingStrategy>('manual');
  const [taskType, setTaskType] = useState<'reasoning' | 'creativity' | 'analysis'>('reasoning');

  const { generateWithRouting, isGenerating, error, usage } = useAI({
    provider: 'openai',
    model: 'gpt-4'
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const newMessage: AIMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const response = await generateWithRouting(
        [...messages, newMessage],
        {
          type: taskType,
          expectedTokens: 1000,
          minCapabilityScore: 0.8
        },
        routingStrategy
      );

      setResponses(prev => [...prev, response]);
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          AI Playground
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Test and experiment with AI models
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <select
                  value={routingStrategy}
                  onChange={(e) => setRoutingStrategy(e.target.value as RoutingStrategy)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="manual">Manual Selection</option>
                  <option value="cost-effective">Cost Effective</option>
                  <option value="performance">High Performance</option>
                </select>

                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value as 'reasoning' | 'creativity' | 'analysis')}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="reasoning">Reasoning</option>
                  <option value="creativity">Creativity</option>
                  <option value="analysis">Analysis</option>
                </select>
              </div>

              <div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your prompt..."
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={isGenerating || !input.trim()}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {responses.map((response, index) => (
              <div key={index} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-indigo-600" />
                    <span className="font-medium">{response.provider} - {response.model}</span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(response.content)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="prose max-w-none">
                  {response.content}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{response.usage.totalTokens} tokens used</span>
                  <span>${((response.usage.totalTokens / 1000) * 0.02).toFixed(4)} estimated cost</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium">Usage Statistics</h3>
            </div>
            <dl className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Tokens Used
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {usage.totalTokens.toLocaleString()}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-lg">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Cost
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  ${usage.cost.toFixed(4)}
                </dd>
              </div>
            </dl>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error.message}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}