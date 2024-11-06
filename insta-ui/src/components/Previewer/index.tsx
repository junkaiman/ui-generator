"use client"; // Add this at the very top of the file

import React, { useState } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import MonacoEditor from "react-monaco-editor";
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
    return this.errors.join("\n");
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
    <Tabs
      defaultValue={PreviewerTabs.Preview}
      className="p-2 h-full flex flex-col border border-gray-300 rounded-lg overflow-hidden"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={PreviewerTabs.Preview}>Preview</TabsTrigger>
        <TabsTrigger value={PreviewerTabs.Code}>Code</TabsTrigger>
      </TabsList>

      {/* Live Preview Tab */}
      <TabsContent
        value={PreviewerTabs.Preview}
        className="flex-grow overflow-hidden"
      >
        <Card className="p-4 border rounded-xl h-full overflow-hidden">
          <LiveProvider code={code} noInline={true}>
            <div className="relative h-full overflow-hidden">
              {/* Preview Section */}
              <div className="p-4 h-[calc(100vh-204px)] border rounded bg-white min-h-[400px] h-full overflow-auto">
                <LivePreview />
              </div>
              <LiveError className="absolute top-0 left-0 right-0 bottom-0 p-4 overflow-auto text-red-500 bg-red-50 rounded-xl mt-2" />
              {error}
            </div>
          </LiveProvider>
        </Card>
      </TabsContent>

      {/* Code Editor Tab */}
      <TabsContent
        value={PreviewerTabs.Code}
        className="flex-grow overflow-hidden"
      >
        <Card className="p-4 border rounded-xl h-full flex flex-col overflow-hidden">
          <div className="h-full flex flex-col overflow-auto">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-2 bg-transparent border-0 cursor-pointer hover:text-blue-500 hover:bg-gray-100 rounded focus:outline-none transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>

            <div className="flex-grow overflow-auto">
              <MonacoEditor
                height="100%"
                width="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => handleCodeChange(value || "")}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
                className="rounded-lg mt-3"
              />
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
