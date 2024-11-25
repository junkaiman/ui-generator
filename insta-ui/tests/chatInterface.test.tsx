import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import ChatInterface from "@/components/ChatInterface";
import { getChatById, updateChat } from "@/lib/db";
import { fetchAIResponse } from "@/app/api/generate/utils";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

jest.mock("../src/lib/db", () => ({
  getChatById: jest.fn(),
  updateChat: jest.fn(),
  updateChatTitle: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useSearchParams: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue("1"), // 查詢參數 c=1
    }),
}));

jest.mock("../src/app/api/generate/utils", () => ({
  fetchAIResponse: jest.fn(),
}));

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    value: jest.fn(),
  });

describe("ChatInterface", () => {
  let chatId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    chatId += 1;
  });

  afterEach(() => {
    cleanup(); 
  });

  const createMockChat = () => ({
    id: chatId.toString(),
    messages: [
      { role: "user", content: "Hello!" },
      { role: "assistant", content: "Hi! How can I assist you today?" },
    ],
  });

  it("should fetch and render chat messages", async () => {
    (getChatById as jest.Mock).mockResolvedValue(createMockChat());

    const { unmount } = render(<ChatInterface />);

    await waitFor(() => {
      expect(getChatById).toHaveBeenCalledWith("1");
      expect(screen.getByText("Hello!")).toBeInTheDocument();
      expect(screen.getByText("Hi! How can I assist you today?")).toBeInTheDocument();
    });

    unmount();
  });

  it("should send a new message and update the chat", async () => {
    (getChatById as jest.Mock).mockResolvedValue(createMockChat());
    // (fetchAIResponse as jest.Mock).mockResolvedValue({
    //   json: jest.fn().mockResolvedValue({ code: "Sure, I can help with that!" }),
    // });

    const { unmount } = render(<ChatInterface />);

    // Send a new message
    const input = screen.getByPlaceholderText("Type your message...");
    const sendButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Can you help me?" } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(updateChat).toHaveBeenCalled();
      expect(screen.getByText("Can you help me?")).toBeInTheDocument();
    });

    unmount();
  });

  it("should handle image upload", async () => {
    (getChatById as jest.Mock).mockResolvedValue(createMockChat());

    const file = new File(["dummy image"], "example.png", { type: "image/png" });
    const { unmount } = render(<ChatInterface />);

    const uploadLabel = screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "label" &&
          element.classList.contains("cursor-pointer")
        );
    });

    const hiddenInput = uploadLabel.querySelector("input[type='file']");
    expect(hiddenInput).not.toBeNull();

    fireEvent.change(hiddenInput as HTMLInputElement, { target: { files: [file] } });

    await waitFor(() => {
      expect(updateChat).toHaveBeenCalled();
    });

    unmount();
  });

  it("should handle modifying a message", async () => {
    (getChatById as jest.Mock).mockResolvedValue(createMockChat());

    const { unmount } = render(<ChatInterface />);

    await waitFor(() => {
      expect(screen.getByText("Hello!")).toBeInTheDocument();
    });

    // Simulate modify
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    const textarea = screen.getByText("Hello!");
    fireEvent.change(textarea, { target: { value: "Hello, edited!" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateChat).toHaveBeenCalled();
      expect(screen.getByText("Hello, edited!")).toBeInTheDocument();
    });

    unmount();
  });

  it("should regenerate assistant's response", async () => {
    (getChatById as jest.Mock).mockResolvedValue(createMockChat());
    (fetchAIResponse as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ code: "New response from AI" }),
    });
    (updateChat as jest.Mock).mockResolvedValue(undefined); // Mock updateChat 返回一个 Promise
  
    const { unmount } = render(<ChatInterface />);
  
    await waitFor(() => {
      expect(screen.getByText("Hi! How can I assist you today?")).toBeInTheDocument();
    });
  
    const regenerateButton = screen.getByText("Regenerate");
    fireEvent.click(regenerateButton);
  
    await waitFor(() => {
      expect(fetchAIResponse).toHaveBeenCalled();
      expect(screen.getByText("New response from AI")).toBeInTheDocument();
    });

    unmount();
  });
});
