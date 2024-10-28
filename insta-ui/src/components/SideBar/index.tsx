"use client";
import { useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";
import { deleteChatById, getChats } from "@/lib/db";
import { useEffect, useState } from "react";
import { ChatHeader } from "@/lib/types";

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

  const onChatSelect = (chatId: string) => {
    router.push(`/c/${chatId}`);
  };

  const onChatDelete = (chatId: string) => {
    console.log("Delete chat", chatId);
    deleteChatById(chatId);
  };

  return (
    <div>
      {chats.map((chat) => (
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
