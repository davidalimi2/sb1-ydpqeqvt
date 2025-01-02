import Anthropic from '@anthropic-ai/sdk';
import { AIConfig, AIMessage, AIResponse, AIError } from '../../types/ai';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export async function generateAnthropicResponse(
  messages: AIMessage[],
  config: AIConfig
): Promise<AIResponse> {
  try {
    const systemMessage = messages.find(m => m.role === 'system')?.content;
    const userMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => m.content)
      .join('\n\n');

    const response = await anthropic.messages.create({
      model: 'claude-2',
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      system: systemMessage,
      messages: [{ role: 'user', content: userMessages }],
    });

    return {
      content: response.content[0].text,
      usage: {
        promptTokens: 0, // Anthropic doesn't provide token counts
        completionTokens: 0,
        totalTokens: 0,
      },
      model: 'claude-2',
      provider: 'anthropic'
    };
  } catch (error) {
    throw {
      code: error.status || 'unknown',
      message: error.message || 'Anthropic request failed',
      provider: 'anthropic'
    } as AIError;
  }
}