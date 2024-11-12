"use client";
import { useRouter } from "next/navigation";
import SideBarItem from "./SideBarItem";
import { deleteChatById, getChats, addChat } from "@/lib/db";
import { useEffect, useState } from "react";
import { ChatHeader, Messages } from "@/lib/types";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ chatId }: { chatId: string }) {
  const router = useRouter();

  const [chats, setChats] = useState([] as ChatHeader[]);
  const [loading, setLoading] = useState(true);

  const updateChats = () => {
    getChats().then((chats) => {
      chats.sort((a, b) => {
        return b.lastModified.getTime() - a.lastModified.getTime();
      });
      setChats(chats);
    });
  };

  useEffect(() => {
    updateChats();
    setLoading(false);
  }, []);

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
    updateChats();
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex justify-center m-2">
        <Button
          className="flex items-center space-x-2 bg-gray-600 text-white py-2 px-4 rounded-full"
          onClick={addNewChat}
        >
          <span className="text-xl">+</span>
          <span>New Chat</span>
        </Button>
      </div>

      {loading && (
        <div className="flex flex-col justify-center text-center m-4">
          <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
        </div>
      )}

      {chats.map((chat) => (
        <SideBarItem
          key={chat.id}
          chatId={chat.id}
          chatTitle={chat.description}
          onCurrentChat={chat.id === chatId}
          onChatSelect={onChatSelect}
          onChatDelete={onChatDelete}
        />
      ))}
    </div>
  );
}
