import { ai } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const agentAi = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.0-flash',
});
