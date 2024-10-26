import { Message, Chat, TextContent, ImageContent } from "../../../lib/types";

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
  const renderContent = () => {
    if (typeof message.content === "string") {
      return <p>{message.content}</p>;
    }

    return (message.content as (TextContent | ImageContent)[]).map(
      (content, index) => {
        if (content.type === "text") {
          return <p key={index}>{(content as TextContent).text}</p>;
        } else if (content.type === "image") {
          return (
            <img
              key={index}
              src={(content as ImageContent).image_url}
              alt="Message content"
            />
          );
        }
        return null;
      }
    );
  };

  return (
    <div className={`message-item ${message.role}`}>
      <div className="message-content">{renderContent()}</div>
      <div className="message-actions">
        <button onClick={() => onModify(message)}>Modify</button>
        <button onClick={() => onRegenerate(message)}>Regenerate</button>
      </div>
    </div>
  );
};

export default { MessageItem };
