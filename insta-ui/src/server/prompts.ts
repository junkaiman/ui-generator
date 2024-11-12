import { Message, TextContent, ImageContent } from '@/lib/types'

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
        }
    ];

    // Add user message with text and optionally image
    const userContent: (TextContent | ImageContent)[] = [
        { type: 'text', text: `Create a React component based on this description: ${textInput}` }
    ];

    if (imageInput) {
        userContent.push({
            type: 'image_url',
            image_url: {
                url: imageInput
            }
        } as ImageContent);
    }

    messages.push({
        role: 'user',
        content: userContent
    });

    if (previousCode) {
        messages.push({
            role: 'user',
            content: [{
                type: 'text',
                text: `Modify this previous code: ${previousCode}`
            }]
        });
    }

    return messages;
}