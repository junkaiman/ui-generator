// import OpenAI from 'openai';
import { generateMessages} from '@/server/prompts';
import { GenerateRequest, Message } from '@/lib/types';
import { MODEL } from '@/server/constants';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { openai } from '@/server/config';

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

function transformMessages(messages: Message[]): ChatCompletionMessageParam[] {
    return messages as ChatCompletionMessageParam[];
}

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const input: GenerateRequest = await req.json();

        if (!input.textInput) {
            return new Response(
                JSON.stringify({ error: 'Text input is required' }),
                { status: 400 }
            );
        }

        const {messages, topicMessages} = generateMessages(
            input.textInput,
            input.imageInput,
            input.previousCode,
            input.topicName,
        );

        const completion = await openai.chat.completions.create({
            model: MODEL,
            messages: transformMessages(messages),
        });

        const content = completion.choices[0].message.content;
        const codeMatch = content?.match(/```(?:javascript|jsx)?\n([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[1].trim() : content;

        const topicName = input.topicName? (await openai.chat.completions.create({
            model: MODEL,
            messages: transformMessages(topicMessages),
        })).choices[0].message.content : undefined;


        console.log("topicName:", topicName);

        return new Response(
            JSON.stringify({ code: code, topicName: topicName}),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    } catch (error) {
        console.error('Generation Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate component' }),
            { status: 500 }
        );
    }
}