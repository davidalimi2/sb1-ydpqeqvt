export type AIProvider = 'openai' | 'anthropic' | 'google' | 'mistral';
export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2' | 'gemini-pro' | 'mistral-medium' | 'mistral-small' | 'mistral-large';

export type RoutingStrategy = 'manual' | 'cost-effective' | 'performance';

export interface ModelCapabilities {
  reasoning: number;     // 0-1 score
  creativity: number;    // 0-1 score
  analysis: number;      // 0-1 score
  costPerToken: number; // USD per 1K tokens
}

export interface AIConfig {
  provider: AIProvider;
  model: AIModel;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: AIModel;
  provider: AIProvider;
}

export interface AIError {
  code: string;
  message: string;
  provider: AIProvider;
}