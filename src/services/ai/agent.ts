import { AIAgent } from '../../types/crm';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

export async function handleIncomingCall(
  agent: AIAgent,
  transcript: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an AI agent named ${agent.name}. ${agent.description}`
        },
        {
          role: 'user',
          content: transcript
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message?.content || '';
  } catch (error) {
    console.error('AI agent error:', error);
    throw error;
  }
}