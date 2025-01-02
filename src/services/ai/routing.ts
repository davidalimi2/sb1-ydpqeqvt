import { AIConfig, AIModel, ModelCapabilities, RoutingStrategy } from '../../types/ai';

import { MODEL_CAPABILITIES, MODEL_COSTS } from './constants';

export function selectModel(
  task: {
    type: 'reasoning' | 'creativity' | 'analysis';
    expectedTokens: number;
    minCapabilityScore: number;
  },
  strategy: RoutingStrategy,
  budget?: number
): AIConfig {
  const eligibleModels = Object.entries(MODEL_CAPABILITIES)
    .filter(([model, capabilities]) => capabilities[task.type] >= task.minCapabilityScore)
    .filter(([model]) => {
      if (!budget) return true;
      return MODEL_COSTS[model as AIModel] * task.expectedTokens <= budget;
    });

  if (eligibleModels.length === 0) {
    throw new Error('No models meet the specified criteria');
  }

  let selectedModel: string;

  switch (strategy) {
    case 'cost-effective':
      selectedModel = eligibleModels.reduce((a, b) => 
        MODEL_COSTS[a[0] as AIModel] < MODEL_COSTS[b[0] as AIModel] ? a : b
      )[0];
      break;

    case 'performance':
      selectedModel = eligibleModels.reduce((a, b) => 
        MODEL_CAPABILITIES[a[0] as AIModel][task.type] > MODEL_CAPABILITIES[b[0] as AIModel][task.type] ? a : b
      )[0];
      break;

    default:
      throw new Error('Invalid routing strategy');
  }

  const provider = selectedModel.startsWith('gpt') ? 'openai' :
                  selectedModel.startsWith('claude') ? 'anthropic' :
                  selectedModel.startsWith('gemini') ? 'google' : 'mistral';

  return {
    provider,
    model: selectedModel as AIModel,
    temperature: 0.7, // Default temperature
    maxTokens: task.expectedTokens
  };
}