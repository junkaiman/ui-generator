"use client";
import { Message } from "../../lib/types";
import { useState } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";

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
    <div>
      <h1>Message List Test</h1>
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
