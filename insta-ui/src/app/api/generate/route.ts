import { generateMessages, generatePromptRevisionMessages} from '@/server/prompts';
import { GenerateRequest, Message } from '@/lib/types';
import { MODEL } from '@/server/constants';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { openai, ratelimit } from '@/server/config';

function transformMessages(messages: Message[]): ChatCompletionMessageParam[] {
    return messages as ChatCompletionMessageParam[];
}

function extractRefinedPromptAndTitle(content: string, originalInput: string): { refinedPrompt: string; topicName: string } {
    const jsonString = content.replace(/```json\n/, '').replace(/\n```/, '');
  
    try {
      const jsonObject = JSON.parse(jsonString);
      return {
        refinedPrompt: jsonObject.refined_prompt,
        topicName: jsonObject.title,
      };
    } catch (error) {
      console.error('Failed to parse JSON content:', error);
      return { refinedPrompt: originalInput, topicName: 'React UI Component Code generation.' };
    }
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

        const {refinedPrompt, topicName}  = refinedPromptCompletion.choices[0].message.content 
                                            ? extractRefinedPromptAndTitle(refinedPromptCompletion.choices[0].message.content, input.textInput)
                                            : {refinedPrompt: input.textInput, topicName: 'React UI Component Code generation.'};

        // Use the refined prompt to generate the component
        const messages = generateMessages(
            refinedPrompt, // Use refined prompt instead of original textInput
            input.imageInput,
            input.previousCode,
        );

        const completion = await openai.chat.completions.create({
            model: MODEL,
            messages: transformMessages(messages),
        });

        const content = completion.choices[0].message.content;
        const codeMatch = content?.match(/```(?:javascript|jsx)?\n([\s\S]*?)```/);
        const code = codeMatch ? codeMatch[1].trim() : content;

        return new Response(
            JSON.stringify({
                code,
                topicName: input.topicName? topicName: undefined,
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