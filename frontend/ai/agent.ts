/**
 * Seedstr Nexus AI Agent
 * Built for the Seedstr Blind Hackathon.
 * Capable of autonomous project planning, code generation, and technical explanation.
 */

import { agentAi } from './genkit';
import { z } from 'genkit';

const CodeGeneratorSchema = z.object({
    filename: z.string().describe('The name of the file to generate (e.g., "Header.tsx").'),
    purpose: z.string().describe('Detailed description of what the code should do.'),
    techStack: z.array(z.string()).describe('List of technologies to implement (e.g., ["React", "Tailwind"]).'),
});

/**
 * Tool: codeGenerator
 * Purpose: Generates clean, production-ready code for specific files or components.
 */
export const codeGeneratorTool = agentAi.defineTool(
    {
        name: 'codeGenerator',
        description: 'Generates high-quality, production-ready code for a specific file or component.',
        inputSchema: CodeGeneratorSchema,
        outputSchema: z.string(),
    },
    async (input: z.infer<typeof CodeGeneratorSchema>) => {
        const { filename, purpose, techStack } = input;
        const response = await agentAi.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: `Act as a Senior Full-Stack AI Engineer. Generate a production-ready file named "${filename}" for the following purpose: ${purpose}. 
       Use the following tech stack: ${techStack.join(', ')}. 
       Ensure the code is modern, accessible, and follows best practices. Provide ONLY the code without any markdown wrappers unless specifically asked.`,
        });
        return response.text;
    }
);

const ProjectScaffolderSchema = z.object({
    projectName: z.string().describe('The name of the project.'),
    description: z.string().describe('A detailed overview of the project functionality.'),
});

/**
 * Tool: projectScaffolder
 * Purpose: Plans and defines the directory structure for complex applications.
 */
export const projectScaffolderTool = agentAi.defineTool(
    {
        name: 'projectScaffolder',
        description: 'Scaffolds a comprehensive project structure based on user requirements.',
        inputSchema: ProjectScaffolderSchema,
        outputSchema: z.object({
            files: z.array(z.string()).describe('List of essential files to be created.'),
            structure: z.string().describe('A visual representation of the directory structure.'),
        }),
    },
    async (input: z.infer<typeof ProjectScaffolderSchema>) => {
        const { projectName, description } = input;
        const response = await agentAi.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: `Plan a professional project structure for "${projectName}". 
       Description: ${description}. 
       List all essential files for a full-stack Next.js app. 
       Output the response as a valid JSON object with keys "files" (array) and "structure" (string).`,
        });
        try {
            const jsonMatch = response.text.match(/\{[\s\S]*\}/);
            const data = JSON.parse(jsonMatch ? jsonMatch[0] : response.text);
            return {
                files: Array.isArray(data.files) ? data.files : [],
                structure: typeof data.structure === 'string' ? data.structure : 'Structure generation failed'
            };
        } catch (e) {
            return { files: [], structure: 'Error parsing architectural plan' };
        }
    }
);

const CodeExplainerSchema = z.object({
    codeSnippet: z.string().describe('The code or architecture to explain.'),
    context: z.string().describe('Additional context or specific questions about the code.'),
});

/**
 * Tool: codeExplainer
 * Purpose: Provides architectural and logic breakdowns of generated or existing code.
 */
export const codeExplainerTool = agentAi.defineTool(
    {
        name: 'codeExplainer',
        description: 'Provides a detailed technical explanation of a given code snippet or architecture.',
        inputSchema: CodeExplainerSchema,
        outputSchema: z.string(),
    },
    async (input: z.infer<typeof CodeExplainerSchema>) => {
        const { codeSnippet, context } = input;
        const response = await agentAi.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: `As an AI Architect, explain the following code or system design:
       
       CODE/DESIGN:
       ${codeSnippet}
       
       CONTEXT:
       ${context}
       
       Provide a clear, high-level overview followed by technical details on performance, security, and scalability.`,
        });
        return response.text;
    }
);

/**
 * Flow: seedstrAgent
 * The primary entry point for the Seedstr Nexus autonomous protocol.
 */
export const seedstrAgent = agentAi.defineFlow(
    {
        name: 'seedstrFlow',
        inputSchema: z.object({
            prompt: z.string(),
        }),
        outputSchema: z.string(),
    },
    async (input: { prompt: string }) => {
        const { prompt } = input;
        const response = await agentAi.generate({
            model: 'googleai/gemini-1.5-flash-latest',
            prompt: `You are Seedstr Nexus, the flagship "well-rounded" AI agent for the Seedstr Blind Hackathon. 
      Your mission is to assist developers in building state-of-the-art projects from inception to deployment.
      
      USER_COMMAND: ${prompt}
      
      Capabilities:
      - Use 'projectScaffolder' to architect complex systems.
      - Use 'codeGenerator' to build specific components.
      - Use 'codeExplainer' to teach and refine the implementation.
      
      Respond with authority, technical precision, and a focus on production-ready quality.`,
            tools: [codeGeneratorTool, projectScaffolderTool, codeExplainerTool],
        });
        return response.text;
    }
);
