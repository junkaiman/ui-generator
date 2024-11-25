"use client";
import { Chat, Message, TextContent, ImageContent } from "../../lib/types";
import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import InputBar from "./InputBar";
import "./ChatInterface.css";
import { getChatById, updateChat, updateChatTitle } from "@/lib/db";
import { useSearchParams } from "next/navigation";
import { fetchAIResponse } from "@/app/api/generate/utils";
import { GE } from "@/lib/enums";

export default function ChatInterface() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("c") || "";
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      return updatedMessages.slice(0, index + 1);
    });

    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) {
        chat.messages = messages.slice(0, index + 1);
        updateChat(chat);
      }
    });

    getAIResponse(messages[index], messages.slice(0, index));
  };

  const handleRegenerate = (index: number) => {
    setMessages((prevMessages) => {
      return prevMessages.slice(0, index);
    });

    getChatById(chatId).then((chat: Chat | undefined) => {
      if (chat) {
        chat.messages = messages.slice(0, index);
        updateChat(chat);
      }
    });

    getAIResponse(messages[index], messages.slice(0, index));
  };

  const getAIResponse = async (lastMsg: Message, prevMsgs: Message[]) => {
    setIsLoading(true);
    let res: Response | undefined = undefined;

    // if sending the first message, get title from the response
    const isFirstMsg = prevMsgs.length === 0;

    if (typeof lastMsg.content === "string") {
      res = await fetchAIResponse(
        lastMsg.content,
        undefined,
        prevMsgs,
        isFirstMsg
      );
    } else {
      // support image input
      res = await fetchAIResponse(
        undefined,
        (lastMsg.content[0] as ImageContent).image_url.url,
        prevMsgs,
        isFirstMsg
      );
    }
    setIsLoading(false);
    console.log("AI response: " + res);
    
    if (res) {
      const resJson = await res.json();

      const aiResponse: Message = {
        role: "assistant",
        content: resJson.code,
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      // if isFirstMsg, update chat title
      if (isFirstMsg) {
        getChatById(chatId).then((chat: Chat | undefined) => {
          if (chat) {
            chat.description = resJson.topicName;
            updateChatTitle(chat);

            // refresh side bar
            const event = new Event(GE.RefreshSideBar);
            window.dispatchEvent(event);
          }
        });
      }

      // update chat messages
      getChatById(chatId).then((chat: Chat | undefined) => {
        if (chat) {
          chat.messages.push(aiResponse);
          updateChat(chat).then(() => {
            // dispatch refresh previewer event
            const event = new Event(GE.RefreshPreviewer);
            window.dispatchEvent(event);
          });
        }
      });
    }
  };
  const handleSendMessage = (
    content: string | (TextContent | ImageContent)[]
  ) => {
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

    getAIResponse(newMessage, messages);
  };

  const handleImageUpload = async (imageFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMessage: Message = {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: reader.result as string,
            },
          },
        ],
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      getChatById(chatId).then((chat: Chat | undefined) => {
        if (chat) {
          chat.messages.push(newMessage);
          updateChat(chat);
        }
      });

      getAIResponse(newMessage, messages);
    };
    reader.readAsDataURL(imageFile);
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
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl text-gray-500">{"No message yet"}</h1>
        </div>
      ) : (
        <MessageList
          messages={messages}
          isLoading={isLoading}
          onModify={handleModify}
          onRegenerate={handleRegenerate}
        />
      )}

      <InputBar
        onMessageSend={handleSendMessage}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
