"use client";
import { useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";
import { deleteChatById, getChats, addChat } from "@/lib/db";
import { useEffect, useState } from "react";
import { ChatHeader, Messages } from "@/lib/types";
import { Button } from "../ui/button";

export default function SideBar() {
  const router = useRouter();

  const useChats = () => {
    const [chats, setChats] = useState([] as ChatHeader[]);
    useEffect(() => {
      getChats().then((res: ChatHeader[]) => {
        setChats(res);
      });
    }, [chats]);
    return chats;
  };

  const chats = useChats();

  const addNewChat = async () => {
    const messages: Messages = [];
    const res = await addChat(messages);
    router.push(`/c/${res}`);
  };

  const onChatSelect = (chatId: string) => {
    router.push(`/c/${chatId}`);
  };

  const onChatDelete = (chatId: string) => {
    console.log("Delete chat", chatId);
    deleteChatById(chatId);
  };

  return (
    <div>
      <div className="flex justify-center m-2">
        <Button
          className="flex items-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-full"
          onClick={addNewChat}
        >
          <span className="text-xl">+</span>
          <span>New Chat</span>
        </Button>
      </div>

      {chats
        .sort(
          (a, b) =>
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime()
        )
        .map((chat) => (
          <SideBarItem
            key={chat.id}
            chatId={chat.id}
            chatTitle={chat.description}
            onChatSelect={onChatSelect}
            onChatDelete={onChatDelete}
          />
        ))}
    </div>
  );
}
