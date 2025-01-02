import React, { useState } from 'react';
import { Bot, MessageSquare, AlertCircle } from 'lucide-react';
import { AIAgent } from '../../types/crm';

interface BillingSupportResponse {
  content: string;
  confidence: number;
  suggestedAction?: string;
  requiresHumanAttention: boolean;
}

const BILLING_PROMPTS = {
  billing_inquiry: `You are a billing support AI assistant. Your role is to provide information and answer questions about billing, but NOT to take any actions. For billing inquiries:
  - Explain billing policies and procedures
  - Provide information about current subscription plans
  - Explain token usage and costs
  - Help locate specific transactions or invoices
  - Explain payment methods and billing cycles
  DO NOT process payments, modify subscriptions, or make any changes.`,
  
  subscription_info: `You are a subscription support AI assistant. For subscription inquiries:
  - Explain available subscription tiers and features
  - Provide information about current subscription status
  - Explain upgrade/downgrade processes
  - Clarify billing cycles and renewal dates
  DO NOT modify subscriptions or process any changes.`,
  
  token_usage: `You are a token usage support AI assistant. For token-related inquiries:
  - Explain how tokens are calculated and charged
  - Provide information about current token balance
  - Explain token pricing and packages
  - Help understand usage patterns
  DO NOT purchase tokens or modify token settings.`,
  
  payment_status: `You are a payment status AI assistant. For payment inquiries:
  - Provide information about payment status
  - Explain payment processing timeframes
  - Help locate specific payments
  - Explain payment methods accepted
  DO NOT process payments or modify payment information.`,
  
  invoice_request: `You are an invoice support AI assistant. For invoice inquiries:
  - Help locate specific invoices
  - Explain invoice details and line items
  - Provide information about invoice status
  - Explain billing periods and cycles
  DO NOT generate or modify invoices.`
};

export default function BillingSupportAgent() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState<BillingSupportResponse[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const analyzeQuery = (query: string): string => {
    const keywords = {
      billing_inquiry: ['bill', 'charge', 'cost', 'price', 'fee'],
      subscription_info: ['subscription', 'plan', 'tier', 'upgrade', 'downgrade'],
      token_usage: ['token', 'usage', 'balance', 'credits'],
      payment_status: ['payment', 'paid', 'transaction', 'process'],
      invoice_request: ['invoice', 'receipt', 'statement']
    };

    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => query.toLowerCase().includes(word))) {
        return type;
      }
    }
    return 'billing_inquiry'; // Default prompt
  };

  const generateResponse = async (input: string): Promise<BillingSupportResponse> => {
    const queryType = analyzeQuery(input);
    const prompt = BILLING_PROMPTS[queryType as keyof typeof BILLING_PROMPTS];
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example response generation logic
    const response: BillingSupportResponse = {
      content: `I understand you're asking about ${queryType.replace('_', ' ')}. I can provide information about this, but I cannot make any changes or process any transactions. Here's what you need to know...`,
      confidence: 0.85,
      requiresHumanAttention: false
    };

    // Add specific details based on query type
    if (queryType === 'billing_inquiry') {
      response.content += '\nFor billing changes or processing payments, please contact our billing department or use the billing portal.';
    } else if (queryType === 'subscription_info') {
      response.content += '\nTo make changes to your subscription, please use the subscription management page in your account settings.';
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsTyping(true);
    const response = await generateResponse(userInput);
    setResponses([...responses, response]);
    setUserInput('');
    setIsTyping(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <Bot className="h-5 w-5 text-indigo-500" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            Billing Support Assistant
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Ask questions about billing, subscriptions, and payments
        </p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {responses.map((response, index) => (
          <div key={index} className="space-y-2">
            {response.requiresHumanAttention && (
              <div className="flex items-center text-yellow-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                This inquiry may require human assistance
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{response.content}</p>
              {response.suggestedAction && (
                <p className="mt-2 text-sm text-gray-500">
                  Suggested action: {response.suggestedAction}
                </p>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-bounce">•</div>
            <div className="animate-bounce delay-100">•</div>
            <div className="animate-bounce delay-200">•</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about billing, subscriptions, or payments..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isTyping || !userInput.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}