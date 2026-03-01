import { NextResponse } from 'next/server';
import { seedstrAgent } from '@/ai/agent';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await seedstrAgent({ prompt });
        return NextResponse.json({ response });
    } catch (error: any) {
        console.error('Agent execution failed:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
