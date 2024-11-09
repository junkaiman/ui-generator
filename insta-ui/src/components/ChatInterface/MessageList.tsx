import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../lib/types";
import "./ChatInterface.css";

interface MessageListProps {
  messages: Message[];
  onModify: (index: number, message: Message) => void;
  onRegenerate: (index: number) => void;
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
    <div className="message-list">
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
