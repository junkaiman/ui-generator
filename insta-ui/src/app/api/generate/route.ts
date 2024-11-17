import OpenAI from 'openai';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import { generateMessages} from '@/server/prompts';
import { GenerateRequest, Message } from '@/lib/types';
import { MODEL } from '@/server/constants';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(20, "3600 s"),
});

function transformMessages(messages: Message[]): ChatCompletionMessageParam[] {
    return messages as ChatCompletionMessageParam[];
}

export const maxDuration = 30;

export async function POST(req: Request) {
    const host = req.headers.get('host');
    if (host && !(host.startsWith('localhost') || host.startsWith('127.0.0.1'))) {
        const result = await ratelimit.limit(req.headers.get("x-forwarded-for") as string);
        if (!result.success) {
            console.error('Rate Limit');
            return new Response(
                JSON.stringify({ error: 'Exceed Rate Limit' }),
                { status: 500 }
            );
        }
    } 

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