"use client"; // Add this at the very top of the file

import React, { useState } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import MonacoEditor from 'react-monaco-editor';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreviewerTabs } from "@/lib/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";


const initialCode: string = `
function App() {
  return (
    <div 
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        fontFamily: 'Arial'
      }}
    >
      <h1 style={{ color: '#4CAF50' }}>Hello, World!</h1>
      <p>This is a live preview!</p>
    </div>
  );
}

render(<App />);
`;

// ErrorHandler module
class ErrorHandler {
  private errors: string[] = [];

  logError(error: string): void {
    this.errors.push(error);
  }

  clearErrors(): void {
    this.errors = [];
  }

  displayErrors(): string {
    return this.errors.join('\n');
  }
}

// Previewer Component
export default function Previewer() {
  const [code, setCode] = useState<string>(initialCode); // Code state
  const [error, setError] = useState<string | null>(null); // Error state

  const errorHandler = new ErrorHandler();

  // Handle code change from MonacoEditor
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode) {
      setCode(newCode);
      setError(null);
      errorHandler.clearErrors();
    }
  };

  return (
    <Tabs defaultValue={PreviewerTabs.Preview} className="p-2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={PreviewerTabs.Preview}>Preview</TabsTrigger>
        <TabsTrigger value={PreviewerTabs.Code}>Code</TabsTrigger>
      </TabsList>

      {/* Live Preview Tab */}
      <TabsContent value={PreviewerTabs.Preview} className="min-h-80vh">
        <Card className="p-4 border rounded-xl">
          <LiveProvider code={code} noInline={true}>
          <div className="relative">
              {/* Preview Section */}
              <div className="p-4 h-[calc(100vh-204px)] border rounded bg-white min-h-[400px]">
                <LivePreview />
              </div>
              <LiveError className="absolute top-0 left-0 right-0 bottom-0 p-4 overflow-auto text-red-500 bg-red-50 rounded-xl mt-2" />
              {error}
            </div>
 
          </LiveProvider>
        </Card>
      </TabsContent>

      {/* Code Editor Tab */}
      <TabsContent value={PreviewerTabs.Code}>
        <Card className="py-3 border rounded-xl">
          <CardContent>
            <div className="flex justify-end">
              <FontAwesomeIcon icon={faCopy} onClick={() => navigator.clipboard.writeText(code)} />
            </div>
            <MonacoEditor
              height="752px"
              language="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => handleCodeChange(value || '')}
              options={{ minimap: { enabled: false } }}
              className="rounded-lg mt-3"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
