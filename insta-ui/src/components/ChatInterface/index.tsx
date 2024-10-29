"use client";
import { Message } from "../../lib/types";
import { useRef, useState } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import "./ChatInterface.css";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! How can I assist you today?",
    },
  ]);

  const handleModify = (message: Message) => {
    console.log("Modify message");
  };

  const handleRegenerate = (message: Message) => {
    console.log("Regenerate message");
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      role: "user",
      content: content,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Placeholder for AI response TODO: replace it
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "This is a placeholder response from AI.",
        },
      ]);
    }, 500); // Simulate delay for AI response
  };

  const handleImageUpload = (imageFile: File) => {
    // TODO: Implement image upload handling here
    console.log("Uploaded an image.");
  };

  return (
    <div className="chat-interface">
      <MessageList
        messages={messages}
        onModify={handleModify}
        onRegenerate={handleRegenerate}
      />

      <InputBar
        onMessageSend={handleSendMessage}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
