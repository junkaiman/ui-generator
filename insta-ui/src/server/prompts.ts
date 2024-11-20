import { Message, TextContent, ImageContent } from '@/lib/types'

export function generateMessages(
    textInput: string,
    imageInput?: string,
    previousCode?: string,
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
        - Include 'render<>' statement for rednering the component at the end, not a render function
        - Ensure proper JSX syntax
        - Include inline styles or CSS-in-JS that make the design visually appealing
        - Use modern design principles such as:
        - Box shadows for depth
        - Smooth transitions and animations
        - Rounded corners for buttons and containers
        - Responsive design for different screen sizes
        - Elegant typography with readable fonts and sizes`
        }
    ];

    // Add user message with text and optionally image
    const userContent: (TextContent | ImageContent)[] = [
        {
            type: 'text',
            text: previousCode
                ? `Create a React component that: 
             1. Matches this description: ${textInput}
             2. Uses this code as reference: ${previousCode}
             
             Maintain the core functionality of the previous code while incorporating the new requirements.`
                : `Create a React component based on this description: ${textInput}`
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

    return messages;
}

// export function generatePromptRevisionMessages(
//     textInput: string, 
//     imageInput?: string,
//     previousCode?: string
//   ): Message[] {
//     return [
//       {
//         role: 'system',
//         content: `You are a prompt engineer specializing in UI component generation.
//         Help refine user requests into detailed, specific prompts that will result in better React components.
//         Focus on:
//         - Visual design details
//         - Component functionality
//         - User interaction patterns
//         - Accessibility considerations
//         - Responsive design requirements
//         ${previousCode ? '- Integration with existing code' : ''}`
//       },
//       {
//         role: 'user',
//         content: [
//           {
//             type: 'text',
//             text: previousCode
//               ? `Refine this component request, considering both the new requirements and existing code:
//                  New requirements: ${textInput}
//                  Existing code: ${previousCode}`
//               : `Refine this component request into a detailed prompt: ${textInput}`
//           },
//           ...(imageInput ? [{
//             type: 'image_url',
//             image_url: { url: imageInput }
//           } as ImageContent] : [])
//         ]
//       }
//     ];
//   }

export function generatePromptRevisionMessages(
    textInput: string, 
    imageInput?: string,
    previousCode?: string
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
          ${previousCode ? '- Integration with existing code' : ''}
          
          Additionally, generate a concise title (6 words or less) summarizing the user's request.
          Format the output as a JSON object containing two fields:
          - "refined_prompt": The improved detailed prompt.
          - "title": The concise title.`
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: previousCode
              ? `Refine this component request and include a title, considering both the new requirements and existing code:
                New requirements: ${textInput}
                Existing code: ${previousCode}`
              : `Refine this component request and include a title: ${textInput}`
          },
          ...(imageInput ? [{
            type: 'image_url',
            image_url: { url: imageInput }
          } as ImageContent] : [])
        ]
      }
    ];
  }
  
