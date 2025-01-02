import { useState, useCallback } from 'react';
import { AIConfig, AIMessage, AIResponse, AIError, RoutingStrategy } from '../types/ai';
import { generateAIResponse, validateConfig } from '../services/ai';
import { selectModel } from '../services/ai/routing';
import { useAuditLog } from './useAuditLog';

interface UseAIResult {
  generate: (messages: AIMessage[]) => Promise<AIResponse>;
  generateWithRouting: (
    messages: AIMessage[],
    task: {
      type: 'reasoning' | 'creativity' | 'analysis';
      expectedTokens: number;
      minCapabilityScore: number;
    },
    strategy: RoutingStrategy,
    budget?: number
  ) => Promise<AIResponse>;
  isGenerating: boolean;
  error?: AIError;
  usage: {
    totalTokens: number;
    cost: number;
  };
}

export function useAI(config: AIConfig): UseAIResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<AIError>();
  const [usage, setUsage] = useState({ totalTokens: 0, cost: 0 });
  const { logAction } = useAuditLog();

  const generate = useCallback(async (messages: AIMessage[]): Promise<AIResponse> => {
    setIsGenerating(true);
    setError(undefined);

    try {
      validateConfig(config);
      const response = await generateAIResponse(messages, config);

      // Update usage statistics
      setUsage(prev => ({
        totalTokens: prev.totalTokens + response.usage.totalTokens,
        cost: prev.cost + calculateCost(response.usage.totalTokens, config)
      }));

      // Audit log
      await logAction({
        action: 'ai_generate',
        resourceType: 'ai',
        details: `Generated AI response using ${config.provider} - ${config.model}`,
        metadata: {
          provider: config.provider,
          model: config.model,
          tokens: response.usage.totalTokens
        }
      });

      return response;
    } catch (err) {
      const error = err as AIError;
      setError(error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [config, logAction]);

  const generateWithRouting = useCallback(async (
    messages: AIMessage[],
    task: {
      type: 'reasoning' | 'creativity' | 'analysis';
      expectedTokens: number;
      minCapabilityScore: number;
    },
    strategy: RoutingStrategy,
    budget?: number
  ): Promise<AIResponse> => {
    const routedConfig = selectModel(task, strategy, budget);
    return generate(messages);
  }, [generate]);

  return { generate, generateWithRouting, isGenerating, error, usage };
}

function calculateCost(tokens: number, config: AIConfig): number {
  // Cost per 1K tokens in USD
  const rates: Record<string, number> = {
    'gpt-4': 0.03,
    'gpt-3.5-turbo': 0.002,
    'claude-2': 0.01,
    'gemini-pro': 0.001
  };

  const rate = rates[config.model] || 0;
  return (tokens / 1000) * rate;
}