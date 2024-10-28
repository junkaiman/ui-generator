"use client";
import { Message } from "../../lib/types";
import { useRef, useState } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import "./ChatInterface.css";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "user",
      content: "Give me an image of a cat.",
    },
    {
      role: "assistant",
      content: [
        { type: "text", text: "Here is an image as requested." },
        { type: "image", image_url: "https://example.com/image.jpg" },
      ],
    },
    {
      role: "user",
      content: "Thanks",
    },
    {
      role: "user",
      content: "Great",
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
  };

  const handleImageUpload = (imageFile: File) => {
    // TODO: Implement image upload handling here
    console.log("Uploaded an image.");
  };

  return (
    <div className="chat-interface h-screen overflow-hidden">
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
