import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "../../lib/types";
import "./ChatInterface.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onModify: (index: number, message: Message) => void;
  onRegenerate: (index: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
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
          messageIndex={index}
          message={message}
          onModify={onModify}
          onRegenerate={onRegenerate}
        />
      ))}
      {isLoading && (
        <div className="flex flex-col justify-center text-center m-4">
          <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
