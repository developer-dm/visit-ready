import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const result = await generateText({
        model: google('gemini-1.5-flash'),
        prompt,
        system: `
        You are a medical assistant. Generate patient questions for healthcare provider visits.
        Response format: numbered list, simple language, no medical advice, 5 questions at most, avoid medical jargon that confuses patients, NO REPEAT QUESTIONS.
        `
    });

    return new Response(result.text, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
