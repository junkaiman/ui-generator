// app/server/llm/prompts.ts
import { Message } from '@/lib/types'

export function generateMessages(textInput: string, imageInput?: string, previousCode?: string): Message[] {
    const messages: Message[] = [
        {
            role: 'system',
            content: `You are a React component generator. Generate only valid, compilable React code. 
      Follow these requirements:
      - Use only React and standard packages
      - Component must be compilable
      - Include 'import React' at the start
      - Use 'export default' for the component
      - Ensure proper JSX syntax`
        },
        {
            role: 'user',
            content: `Create a React component based on this description: ${textInput}`
        }
    ];

    if (imageInput) {
        messages.push({
            role: 'user',
            content: `Include visual elements similar to this image: ${imageInput}`
        });
    }

    if (previousCode) {
        messages.push({
            role: 'user',
            content: `Modify this previous code: ${previousCode}`
        });
    }

    return messages;
}