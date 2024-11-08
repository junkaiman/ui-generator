// app/hooks/useCodeGeneration.ts
'use client';

import { useChat } from 'ai/react';
import { GenerateRequest } from '@/lib/types';

export function useCodeGeneration() {
    const { messages, append, isLoading, error } = useChat({
        api: '/api/generate',
    });

    const generateCode = async (input: GenerateRequest) => {
        await append({
            role: 'user',
            content: input.textInput,
        });
    };

    const lastMessage = messages[messages.length - 1];
    const generatedCode = lastMessage?.role === 'assistant' ? lastMessage.content : null;

    return {
        generateCode,
        generatedCode,
        isLoading,
        error,
    };
}