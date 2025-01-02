import MistralClient from '@mistralai/mistralai';
import { AIConfig, AIMessage, AIResponse, AIError } from '../../types/ai';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

export async function generateMistralResponse(
  messages: AIMessage[],
  config: AIConfig
): Promise<AIResponse> {
  try {
    const response = await mistral.chat.completions.create({
      model: getMistralModel(config.model),
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens,
      top_p: config.topP
    });

    const choice = response.choices[0];
    
    return {
      content: choice.message.content,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens,
        totalTokens: response.usage.total_tokens
      },
      model: config.model,
      provider: 'mistral'
    };
  } catch (error) {
    throw {
      code: error.status || 'unknown',
      message: error.message || 'Mistral request failed',
      provider: 'mistral'
    } as AIError;
  }
}

function getMistralModel(model: string): string {
  const modelMap: Record<string, string> = {
    'mistral-small': 'mistral-tiny',
    'mistral-medium': 'mistral-small',
    'mistral-large': 'mistral-medium'
  };
  
  return modelMap[model] || 'mistral-small';
}