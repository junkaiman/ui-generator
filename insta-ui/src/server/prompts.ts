import { Message, TextContent, ImageContent } from '@/lib/types'

export function generateMessages(textInput: string, imageInput?: string, previousCode?: string, topicName?: boolean): {messages: Message[], topicMessages: Message[]} {
    const messages: Message[] = [
        {
            role: 'system',
            content: `You are a React component generator. Generate only valid, compilable React code.
      Follow these requirements:
      - Use only React and standard packages
      - Component must be compilable and should not include import statements
      - When referencing React functions or hooks, always use the inline syntax, like "React.useState" or "React.useEffect"
      - Do not reference functions or hooks directly (e.g., do not use "useState" alone); always specify "React" before the function name
      - Include 'render<>' statement for rednering the component at the end, not a render function
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

    const topicMessages: Message[] = []
    if (topicName) {
        topicMessages.push({
            role: 'system',
            content: `You are a request title creator. You have to help the user summarize a request in no more than 6 words.`
        });

        const userContent: (TextContent | ImageContent)[] = [
            { type: 'text', text: `Create a request title based on this description: ${textInput}` }
        ];
    
        if (imageInput) {
            userContent.push({
                type: 'image_url',
                image_url: {
                    url: imageInput
                }
            } as ImageContent);
        }
        
        topicMessages.push({
            role: 'user',
            content: userContent
        });
    
    }

    return {messages, topicMessages};
}
