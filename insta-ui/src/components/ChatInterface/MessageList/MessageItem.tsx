import React, { useState } from "react";
import { Message, TextContent, ImageContent } from "../../../lib/types";
import "./MessageItem.css"; // Import the CSS file

interface MessageItemProps {
  message: Message;
  onModify: (message: Message) => void;
  onRegenerate: (message: Message) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onModify,
  onRegenerate,
}) => {
  const [hoveredButton, setHoveredButton] = useState<
    "modify" | "regenerate" | null
  >(null);

  const renderContent = () => {
    if (typeof message.content === "string") {
      return <p className="text-sm">{message.content}</p>;
    }

    return (message.content as (TextContent | ImageContent)[]).map(
      (content, index) => {
        if (content.type === "text") {
          return (
            <p key={index} className="text-sm">
              {(content as TextContent).text}
            </p>
          );
        } else if (content.type === "image") {
          return (
            <img
              key={index}
              src={(content as ImageContent).image_url}
              alt="Message content"
              className="w-32 h-32 rounded-lg"
            />
          );
        }
        return null;
      }
    );
  };

  return (
    <div className={`message-item ${message.role}`}>
      <div className="message-container">
        <div className="message-content">{renderContent()}</div>
        <div className="message-actions">
          <button
            onMouseEnter={() => setHoveredButton("modify")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => onModify(message)}
            className={`button-modify ${
              hoveredButton === "modify" ? "shadow-lg" : ""
            }`}
          >
            Modify
          </button>
          <button
            onMouseEnter={() => setHoveredButton("regenerate")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => onRegenerate(message)}
            className={`button-regenerate ${
              hoveredButton === "regenerate" ? "shadow-lg" : ""
            }`}
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
