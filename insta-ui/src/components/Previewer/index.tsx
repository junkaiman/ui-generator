"use client"; // Add this at the very top of the file

import React, { useState, useEffect } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import MonacoEditor from "react-monaco-editor";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreviewerTabs } from "@/lib/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import * as monaco from "monaco-editor"; // Import monaco for theme definitions

const initialCode: string =  `
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

// Define custom themes
const defineThemes = () => {
  // VS Code Dark Theme
  monaco.editor.defineTheme("customDarkTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955" },
      { token: "keyword", foreground: "569CD6" },
      { token: "identifier", foreground: "9CDCFE" },
      { token: "number", foreground: "B5CEA8" },
      { token: "string", foreground: "CE9178" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
    },
  });

  // VS Code Light Theme
  monaco.editor.defineTheme("customLightTheme", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "008000" },
      { token: "keyword", foreground: "0000FF" },
      { token: "identifier", foreground: "001080" },
      { token: "number", foreground: "09885A" },
      { token: "string", foreground: "A31515" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
    },
  });

  // Monokai Theme
  monaco.editor.defineTheme("customMonokaiTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "keyword", foreground: "F92672" },
      { token: "identifier", foreground: "A6E22E" },
      { token: "number", foreground: "AE81FF" },
      { token: "string", foreground: "E6DB74" },
    ],
    colors: {
      "editor.background": "#272822",
    },
  });
};




export default function Previewer() {
  const [code, setCode] = useState<string>(initialCode); // Code state
  const [error, setError] = useState<string | null>(null); // Error state
  const [theme, setTheme] = useState<string>("customDarkTheme"); // Default theme

  const errorHandler = new ErrorHandler();

  useEffect(() => {
    defineThemes();
  }, []);

  // Handle code change from MonacoEditor
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode) {
      setCode(newCode);
      setError(null);
      errorHandler.clearErrors();
    }
  };
  
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    monaco.editor.setTheme(selectedTheme);
  };

  useEffect(() => {
    // Define the base URL for Monaco modules
    //I only used this block to suppres an error message :)
    window.MonacoEnvironment = {
      getWorker(workerId, label) {
        switch (label) {
          case "json":
            return new Worker(""); // Replace with the correct path
          case "css":
            return new Worker("");  // Replace with the correct path
          case "html":
            return new Worker(""); // Replace with the correct path
          case "typescript":
          case "javascript":
            return new Worker("");   // Replace with the correct path
          default:
            return new Worker(""); // Default worker
        }
      },
    };
    
  }, []);
  

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
            <div className="flex justify-between mb-2">
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-2 bg-transparent border-0 cursor-pointer hover:text-blue-500 hover:bg-gray-100 rounded focus:outline-none transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <select id="theme" value={theme} onChange={handleThemeChange}>
                  <option value="customDarkTheme">Dark</option>
                  <option value="customLightTheme">Light</option>
                  <option value="customMonokaiTheme">Monokai</option>
                </select>
            </div>

            <div className="flex-grow overflow-auto">
              <MonacoEditor
                height="100%"
                width="100%"
                language="javascript"
                theme={theme} // Use selected theme
                value={code}
                onChange={(value) => handleCodeChange(value || "")}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
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
