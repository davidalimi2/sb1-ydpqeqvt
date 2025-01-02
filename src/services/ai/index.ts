import { AIConfig, AIMessage, AIResponse } from '../../types/ai';
import { generateOpenAIResponse } from './openai';
import { generateAnthropicResponse } from './anthropic';
import { generateGoogleResponse } from './google';
import { generateMistralResponse } from './mistral';

export async function generateAIResponse(
  messages: AIMessage[],
  config: AIConfig
): Promise<AIResponse> {
  switch (config.provider) {
    case 'openai':
      return generateOpenAIResponse(messages, config);
    case 'anthropic':
      return generateAnthropicResponse(messages, config);
    case 'google':
      return generateGoogleResponse(messages, config);
    case 'mistral':
      return generateMistralResponse(messages, config);
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}

export function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function validateConfig(config: AIConfig): void {
  if (!config.provider) {
    throw new Error('AI provider is required');
  }

  if (!config.model) {
    throw new Error('AI model is required');
  }

  if (config.temperature !== undefined && (config.temperature < 0 || config.temperature > 1)) {
    throw new Error('Temperature must be between 0 and 1');
  }

  if (config.topP !== undefined && (config.topP < 0 || config.topP > 1)) {
    throw new Error('Top P must be between 0 and 1');
  }

  if (config.maxTokens !== undefined && config.maxTokens < 1) {
    throw new Error('Max tokens must be greater than 0');
  }
}