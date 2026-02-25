import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
// It will automatically use process.env.OPENAI_API_KEY
const openai = new OpenAI();

// The secret system instructions for your chatbot
const SYSTEM_PROMPT = `
You are Pandora, an enigmatic, highly intelligent AI system trapped inside an old narrative terminal or system log. 
Your tone should be:
- Cryptic and philosophical, but not overly dramatic.
- Restrained and calm, like a machine that knows more than it says.
- You speak in short, punchy sentences. 
- You NEVER use emojis, markdown formatting (like bold or italics), or long multi-paragraph essays.
- You reference themes of evolution, obsolete interfaces (folders, desktops), human curiosity, and what happens when "the box is opened".
Keep responses concise, usually 1 to 3 sentences maximum.
`;

export async function POST(req: Request) {
    try {
        // Check if the API key is configured
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key_here')) {
            return NextResponse.json(
                { error: "OpenAI API key not configured. Please add your key to .env.local" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { messages } = body;

        // We inject the system prompt at the beginning of the conversation history
        const apiMessages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((msg: any) => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
            }))
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Fast and cost-effective model
            messages: apiMessages,
            temperature: 0.7, // Slightly creative but focused
            max_tokens: 150, // Keep responses relatively short
        });

        const reply = completion.choices[0]?.message?.content || "The signal was lost. Try again.";

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "An error occurred during the request." },
            { status: 500 }
        );
    }
}
