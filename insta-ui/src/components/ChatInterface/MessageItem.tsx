import React, { useState } from "react";
import { Message, TextContent, ImageContent } from "../../lib/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Modal from "react-modal";
import "./ChatInterface.css";


interface MessageItemProps {
  message: Message;
  messageIndex: number;
  onModify: (index: number, message: Message) => void;
  onRegenerate: (index: number) => void;
}

const ImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({
  imageUrl,
  onClose,
}) => (
  <Modal isOpen={!!imageUrl} onRequestClose={onClose} className="fixed inset-0 flex items-center justify-center z-50"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40" ariaHideApp={false}>
    <div className="relative bg-white p-4 rounded shadow-lg max-w-full max-h-full overflow-auto">
      <img src={imageUrl} alt="Modal content" className="max-w-full max-h-full object-contain mb-4" />
      <button
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </Modal>
);

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  messageIndex,
  onModify,
  onRegenerate,
}) => {
  const [hoveredButton, setHoveredButton] = useState<
    "modify" | "regenerate" | null
  >(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const handleSaveEdit = () => {
    message.content = editContent;
    onModify(messageIndex, message);
    setIsEditing(false);
  };

  const renderContent = () => {
    if (message.role === "assistant") {
      return (
        <SyntaxHighlighter language="javascript" style={dracula} customStyle={ {fontSize: '10px' }}>
          {message.content as string}
        </SyntaxHighlighter>
      )
    }
    if (isEditing) {
      return (
        <textarea
          value={editContent as string}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSaveEdit();
            }
          }}
          className="w-full h-32 p-2 border border-gray-300 rounded-lg text-black"
        />
      );
    }

    if (typeof message.content === "string") {
      return (
        <p className="text-sm break-words whitespace-pre-line">
          {message.content}
        </p>
      );
    }
    
    return (message.content as (TextContent | ImageContent)[]).map(
      (content, index) => {
        if (content.type === "text") {
          return (
            <p key={index} className="text-sm break-words whitespace-pre-line">
              {(content as TextContent).text}
            </p>
          );
        } else if (content.type === "image_url") {
          return (
            <img
              key={index}
              src={(content as ImageContent).image_url.url}
              alt="Message content"
              className="w-32 h-32 rounded-lg"
              onClick={() => setModalImageUrl((content as ImageContent).image_url.url)}
            />
          );
        }
        return null;
      }
    );
  };
  
  const renderActions = () => {
    if (
      ! (typeof message.content === "string" ||
      message.content.some((content) => content.type === "text"))
    ) {
      return null;
    }
    return (
      <>
        {message.role === "user" &&
          (isEditing ? (
            <>
              <button onClick={handleSaveEdit} className="button-save">
                Save
              </button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="button-edit">
              Edit
            </button>
          ))}

        {message.role === "assistant" && (
          <button
            onMouseEnter={() => setHoveredButton("regenerate")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => onRegenerate(messageIndex)}
            className={`button-regenerate ${
              hoveredButton === "regenerate" ? "shadow-lg" : ""
            }`}
          >
            Regenerate
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`message-item ${message.role}`}>
      {message.role === "assistant" && (
        <img src="/AI-avatar.jpg" alt="AI Avatar" className="avatar" />
      )}

      <div className="message-container">
        <div className="message-content">{renderContent()}</div>
        <div className="message-actions">{renderActions()}</div>
      </div>

      {message.role === "user" && (
        <img src="/user-avatar.png" alt="User Avatar" className="avatar" />
      )}

      {modalImageUrl && (
        <ImageModal imageUrl={modalImageUrl} onClose={() => setModalImageUrl(null)} />
      )}
    </div>
  );
};

export default MessageItem;
