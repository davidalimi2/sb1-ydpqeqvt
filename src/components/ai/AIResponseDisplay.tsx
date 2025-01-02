import React from 'react';
import { AIResponse } from '../../types/ai';
import { Bot, Copy, Download } from 'lucide-react';

interface AIResponseDisplayProps {
  response: AIResponse;
  onCopy?: () => void;
  onDownload?: () => void;
}

export default function AIResponseDisplay({
  response,
  onCopy,
  onDownload
}: AIResponseDisplayProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-indigo-500" />
            <span className="ml-2 text-sm font-medium text-gray-900">
              AI Response
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {onCopy && (
              <button
                onClick={onCopy}
                className="p-1 text-gray-400 hover:text-gray-500"
              >
                <Copy className="h-5 w-5" />
              </button>
            )}
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-1 text-gray-400 hover:text-gray-500"
              >
                <Download className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="prose max-w-none">
          {response.content}
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            Model: {response.model} ({response.provider})
          </div>
          <div>
            Tokens: {response.usage.totalTokens.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}