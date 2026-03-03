import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const agentAi = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-1.5-flash',
});
