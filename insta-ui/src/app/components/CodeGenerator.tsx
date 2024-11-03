// app/components/CodeGenerator.tsx
'use client';

import { useState } from 'react';
import { useCodeGeneration } from '@/app/hooks/useCodeGeneration';

export default function CodeGenerator() {
    const [textInput, setTextInput] = useState('');
    const { generateCode, generatedCode, isLoading, error } = useCodeGeneration();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!textInput.trim()) return;

        try {
            await generateCode({
                textInput,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">
                        Describe your component
                    </label>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        rows={4}
                        placeholder="Create a button component with hover effects..."
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Generate Code'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-md">
                    {error.message || 'An error occurred'}
                </div>
            )}

            {generatedCode && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Generated Code:</h3>
                    <pre className="mt-2 p-4 bg-gray-50 rounded-md overflow-auto">
                        <code>{generatedCode}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}