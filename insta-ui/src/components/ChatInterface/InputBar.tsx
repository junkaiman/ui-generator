import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-100">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg p-2 mr-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2"
      >
        Send
      </button>
    </form>
  );
};

export default InputBar;
