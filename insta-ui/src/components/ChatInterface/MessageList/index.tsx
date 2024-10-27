import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../../lib/types";

interface MessageListProps {
  messages: Message[];
  onModify: (message: Message) => void;
  onRegenerate: (message: Message) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onModify,
  onRegenerate,
}) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md max-h-[500px] overflow-y-auto">
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          message={message}
          onModify={onModify}
          onRegenerate={onRegenerate}
        />
      ))}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
