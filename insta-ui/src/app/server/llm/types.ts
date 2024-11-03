// app/server/llm/types.ts
export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface GenerateRequest {
    textInput: string;
    imageInput?: string;
    previousCode?: string;
}