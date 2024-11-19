import { generateMessages, generatePromptRevisionMessages} from '@/server/prompts';
import { GenerateRequest, Message } from '@/lib/types';
import { MODEL } from '@/server/constants';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { openai, ratelimit } from '@/server/config';

function transformMessages(messages: Message[]): ChatCompletionMessageParam[] {
    return messages as ChatCompletionMessageParam[];
}

export const maxDuration = 30;

export async function POST(req: Request) {
    const host = req.headers.get('host');
    // remove if condition if want to test ratelimiter on localhost
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

        // First, get the refined prompt
        const revisionMessages = generatePromptRevisionMessages(
            input.textInput,
            input.imageInput
        );

        const refinedPromptCompletion = await openai.chat.completions.create({
            model: MODEL,
            messages: transformMessages(revisionMessages),
        });
        const refinedPrompt = refinedPromptCompletion.choices[0].message.content ?? input.textInput;
        // console.log("Refined prompt:", refinedPrompt);

        // Use the refined prompt to generate the component
        const { messages, topicMessages } = generateMessages(
            refinedPrompt, // Use refined prompt instead of original textInput
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

        const topicName = input.topicName
            ? (await openai.chat.completions.create({
                model: MODEL,
                messages: transformMessages(topicMessages),
            })).choices[0].message.content
            : undefined;

        return new Response(
            JSON.stringify({
                code,
                topicName,
                refinedPrompt, // Optional: Include the refined prompt in response
            }),
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