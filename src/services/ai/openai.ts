import OpenAI from 'openai';
import { AIConfig, AIMessage, AIResponse, AIError } from '../../types/ai';

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  console.warn('OpenAI API key is missing. OpenAI features will not work.');
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateOpenAIResponse(
  messages: AIMessage[],
  config: AIConfig
): Promise<AIResponse> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw {
      code: 'missing_api_key',
      message: 'OpenAI API key is not configured',
      provider: 'openai'
    } as AIError;
  }

  try {
    const response = await openai.chat.completions.create({
      model: config.model,
      messages,
      temperature: config.temperature ?? 0.7,
      max_tokens: config.maxTokens,
      top_p: config.topP ?? 1,
    });

    const result = response.choices[0];

    return {
      content: result.message?.content || '',
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
      model: config.model,
      provider: 'openai'
    };
  } catch (error) {
    throw {
      code: error.status || 'unknown',
      message: error.message || 'OpenAI request failed',
      provider: 'openai'
    } as AIError;
  }
}