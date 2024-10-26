"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addChat, getChats, clearChats } from "@/lib/db";
import { Chat, Messages } from "@/lib/types";
import { useState, useEffect } from "react";

export default function ChatInterface() {
  const testAddChat = async () => {
    console.log("[Testing addChat]");
    const messages: Messages = [
      {
        role: "user",
        content: "Hello",
      },
      {
        role: "assistant",
        content: "Hi, how can I help you?",
      },
    ];

    const res = await addChat(messages);
    console.log("Chat added", res);
  };

  const testClearChats = async () => {
    console.log("[Testing clearChats]");
    const res = await clearChats();
    console.log("Chats cleared", res);
  };

  const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    useEffect(() => {
      getChats().then((res) => {
        setChats(res);
      });
    }, [chats]);
    return chats;
  };

  const chats = useChats();

  return (
    <div className="p-2">
      <div className="p-2 h-[calc(100vh-212px)] border rounded-lg text-center">
        <div>
          <Button onClick={testAddChat}>addChat</Button>
          <Button onClick={testClearChats}>clearChat</Button>
        </div>
        <div>
          <Label>Chats</Label>
          {chats.map((chat: Chat) => (
            <div key={chat.id} className="p-2 border rounded-lg">
              <div>{chat.description}</div>
              <div>{chat.lastModified.toISOString()}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label>Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
        <div className="p-2 flex justify-end">
          <Button size="sm">Send</Button>
        </div>
      </div>
    </div>
  );
}
