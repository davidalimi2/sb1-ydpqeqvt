import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIConfig, AIMessage, AIResponse, AIError } from '../../types/ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export async function generateGoogleResponse(
  messages: AIMessage[],
  config: AIConfig
): Promise<AIResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;

    return {
      content: response.text(),
      usage: {
        promptTokens: 0, // Google doesn't provide token counts
        completionTokens: 0,
        totalTokens: 0,
      },
      model: 'gemini-pro',
      provider: 'google'
    };
  } catch (error) {
    throw {
      code: error.status || 'unknown',
      message: error.message || 'Google AI request failed',
      provider: 'google'
    } as AIError;
  }
}