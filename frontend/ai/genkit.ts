import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

export const agentAi = genkit({
    plugins: [googleAI({ apiVersion: 'v1' })],
    model: gemini15Flash,
});
