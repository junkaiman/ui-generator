"use client";
import { Chat, Message } from "../../lib/types";
import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import "./ChatInterface.css";
import { getChatById, updateChat } from "@/lib/db";

export default function ChatInterface({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Load chat messages from DB
  useEffect(() => {
    if (!chatId) {
      return;
    }
    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) setMessages(chat.messages);
    });
  }, [chatId]);

  const handleModify = (index: number, message: Message) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((msg, i) =>
        i === index ? message : msg
      );
      return updatedMessages;
    });

    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) {
        chat.messages = messages;
        updateChat(chat);
      }
    });
  };

  const handleRegenerate = (index: number) => {
    setMessages((prevMessages) => {
      const newContent = "Here's a new AI response for you!";
      const updatedMessages = prevMessages.map((msg, i) =>
        i === index ? { ...msg, content: newContent } : msg
      );
      return updatedMessages;
    });

    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) {
        chat.messages = messages;
        updateChat(chat);
      }
    });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      role: "user",
      content: content,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) {
        chat.messages.push(newMessage);
        updateChat(chat);
      }
    });

    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "This is a placeholder response from AI.",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      getChatById(chatId).then((chat: Chat | undefined) => {
        if (chat) {
          chat.messages.push(aiResponse);
          updateChat(chat);
        }
      });
    }, 500);
  };

  const handleImageUpload = (imageFile: File) => {
    // TODO: Implement image upload handling here
    console.log("Uploaded an image: ", imageFile);
  };

  // TODO: replace with better UI
  if (!chatId) {
    return (
      <div className="chat-interface">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl text-gray-500">
            {"Click [New Chat] button on the left"}
          </h1>
        </div>
      </div>
    );
  }

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
