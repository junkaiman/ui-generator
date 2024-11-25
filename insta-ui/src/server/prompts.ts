// src/server/ prompts.ts 
import { Message, Messages, TextContent, ImageContent } from '@/lib/types'

export function generateMessages(
    textInput: string,
    imageInput?: string | { base64: string; mimeType: string },
    previousMessages?: Messages[]
): Message[] {
    const messages: Message[] = [
        {
            role: 'system',
            content: `You are a React component generator. Generate only valid, compilable React code.
        Follow these requirements:
        - Use only React and standard packages
        - Component must be compilable and should not include import statements
        - When referencing React functions or hooks, always use the inline syntax, like "React.useState" or "React.useEffect"
        - Do not reference functions or hooks directly (e.g., do not use "useState" alone); always specify "React" before the function name
        - Ensure proper JSX syntax
        - Include inline styles or CSS-in-JS that make the design visually appealing
        - Use modern design principles such as:
          - Box shadows for depth
          - Smooth transitions and animations
          - Rounded corners for buttons and containers
          - Responsive design for different screen sizes
          - Elegant typography with readable fonts and sizes
        
        IMPORTANT FORMAT REQUIREMENTS:
        1. Define the component first
        2. End with a single line render statement using the component
        3. Format must be exactly:

        const ComponentName = (props) => {
          // component logic and JSX
        };

        render(<ComponentName label="Example" onClick={() => {}} {...otherProps} />);

        Note: The render statement must be a single line at the end using appropriate props for the component.`
        }
    ];

    if (previousMessages && previousMessages.length > 0) {
        // Add last 3 message exchanges (or however many you want to include)
        const recentMessages = previousMessages.slice(-3).flat();
        messages.push(...recentMessages);
    }

    // Add user message with text and optionally image
    const userContent: (TextContent | ImageContent)[] = [
        {
            type: 'text',
            text: `Create a React component based on this description: ${textInput}`
        }
    ];


    if (imageInput) {
        const imageUrl = typeof imageInput === 'string' 
            ? imageInput 
            : `data:${imageInput.mimeType};base64,${imageInput.base64}`;

        userContent.push({
            type: 'image_url',
            image_url: {
                url: imageUrl
            }
        } as ImageContent);
    }

    messages.push({
        role: 'user',
        content: userContent
    });

    return messages;
}

export function generatePromptRevisionMessages(
    textInput: string, 
    imageInput?: string | { base64: string; mimeType: string },
    previousMessages?: Messages[]
): Message[] {
    const messages: Message[] = [
        {
            role: 'system',
            content: `You are a prompt engineer specializing in UI component generation.
            Help refine user requests into detailed, specific prompts that will result in better React components.
            Focus on:
            - Visual design details
            - Component functionality
            - User interaction patterns
            - Accessibility considerations
            - Responsive design requirements
            - Consistency with previous interactions
            ${previousMessages?.length ? '- Integration with previous component versions' : ''}
          
            Additionally, generate a concise title (6 words or less) summarizing the user's request.
            Format the output as a JSON object containing two fields:
            - "refined_prompt": The improved detailed prompt.
            - "title": The concise title.`
        },
        ...(previousMessages?.slice(-2).flat() || [])
    ];

    const userContent: (TextContent | ImageContent)[] = [
        {
            type: 'text',
            text: previousMessages?.length 
                ? `Refine this component request and include a title, considering our previous conversation and iterations: ${textInput}`
                : `Refine this component request into a detailed prompt and include a title: ${textInput}`
        }
    ];

    if (imageInput) {
        const imageUrl = typeof imageInput === 'string' 
            ? imageInput 
            : `data:${imageInput.mimeType};base64,${imageInput.base64}`;

        userContent.push({
            type: 'image_url',
            image_url: {
                url: imageUrl
            }
        } as ImageContent);
    }

    messages.push({
        role: 'user',
        content: userContent
    });

    return messages;
}
