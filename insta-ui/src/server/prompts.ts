import { Message, Messages, TextContent, ImageContent } from '@/lib/types'

export function generateMessages(
    textInput: string,
    imageInput?: string,
    topicName?: boolean,
    previousMessages?: Messages[]
): { messages: Message[], topicMessages: Message[] } {
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

    return { messages, topicMessages };
}

export function generatePromptRevisionMessages(
    textInput: string, 
    imageInput?: string,
    previousMessages?: Messages[]
): Message[] {
    return [
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
            ${previousMessages?.length ? '- Integration with previous component versions' : ''}`
        },
        ...(previousMessages?.slice(-2).flat() || []), // Add recent conversation context
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: previousMessages?.length 
                        ? `Refine this component request, considering our previous conversation and iterations: ${textInput}`
                        : `Refine this component request into a detailed prompt: ${textInput}`
                },
                ...(imageInput ? [{
                    type: 'image_url',
                    image_url: { url: imageInput }
                } as ImageContent] : [])
            ]
        }
    ];
}
