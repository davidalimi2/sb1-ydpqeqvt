export const MODEL_COSTS = {
  'gpt-4': 0.03,
  'gpt-3.5-turbo': 0.002,
  'claude-2': 0.01,
  'gemini-pro': 0.001,
  'mistral-small': 0.002,
  'mistral-medium': 0.006,
  'mistral-large': 0.012
} as const;

export const MODEL_CAPABILITIES = {
  'gpt-4': {
    reasoning: 0.95,
    creativity: 0.9,
    analysis: 0.95
  },
  'gpt-3.5-turbo': {
    reasoning: 0.8,
    creativity: 0.85,
    analysis: 0.8
  },
  'claude-2': {
    reasoning: 0.9,
    creativity: 0.85,
    analysis: 0.9
  },
  'gemini-pro': {
    reasoning: 0.85,
    creativity: 0.8,
    analysis: 0.85
  },
  'mistral-small': {
    reasoning: 0.7,
    creativity: 0.75,
    analysis: 0.7
  },
  'mistral-medium': {
    reasoning: 0.85,
    creativity: 0.8,
    analysis: 0.85
  },
  'mistral-large': {
    reasoning: 0.9,
    creativity: 0.85,
    analysis: 0.9
  }
} as const;