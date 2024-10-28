import React, { useState } from "react";
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
interface InputBarProps {
  onMessageSend: (message: string) => void;
  onImageUpload: (imageFile: File) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  onMessageSend,
  onImageUpload,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onMessageSend(inputValue); // Call the onSend function with the message
      setInputValue(""); // Clear the input after sending
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the uploaded file
    if (file) {
      onImageUpload(file); // Call the onImageUpload function with the image file
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <label className="cursor-pointer mr-2">
        <AiOutlinePaperClip size={24} className="text-gray-600" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg p-2"
      />

      <button type="submit" className="ml-2">
        <AiOutlineSend size={24} className="text-blue-500" />
      </button>
    </form>
  );
};

export default InputBar;
