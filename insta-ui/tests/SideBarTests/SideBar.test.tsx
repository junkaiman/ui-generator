import {render, screen, fireEvent} from "@testing-library/react";
import SideBar from "../../src/components/SideBar/index.tsx";
import * as db from "@/lib/db";

jest.mock("@/lib/db", () => ({
  getChats: jest.fn(),
  addChat: jest.fn(),
  deleteChatById: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams("")),
}));

describe("SideBar", () => {
  const mockChats = [
    { id: "1", description: "Chat 1", lastModified: new Date() },
    { id: "2", description: "Chat 2", lastModified: new Date() },
  ];

  beforeEach(() => {
    (db.getChats as jest.Mock).mockResolvedValue(mockChats);
  });

  it("renders a list of chats", async () => {
    render(<SideBar />);
    
    expect(await screen.findByText("Chat 1")).toBeInTheDocument();
    expect(await screen.findByText("Chat 2")).toBeInTheDocument();
  });

  it("adds a new chat when the New Chat button is clicked", async () => {
    const mockAddChat = jest.fn(() => Promise.resolve("newChatId"));
    (db.addChat as jest.Mock).mockImplementation(mockAddChat);

    render(<SideBar />);
    
    const newChatButton = screen.getByText("+ New Chat");
    fireEvent.click(newChatButton);

    expect(mockAddChat).toHaveBeenCalled();
  });

  it("deletes a chat when the delete button is clicked", async () => {
    const mockDeleteChatById = jest.fn();
    (db.deleteChatById as jest.Mock).mockImplementation(mockDeleteChatById);

    render(<SideBar />);
    
    const deleteButton = await screen.findByText("🗑️ Delete");
    fireEvent.click(deleteButton);

    expect(mockDeleteChatById).toHaveBeenCalledWith("1"); // Assuming the first chat is deleted
  });

  it("indicates loading state", () => {
    render(<SideBar />);
    
    const loadingIndicator = screen.getByRole("status");
    expect(loadingIndicator).toBeInTheDocument();
  });
});
