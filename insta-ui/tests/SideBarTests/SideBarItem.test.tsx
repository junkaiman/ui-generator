import {render, screen, fireEvent} from "@testing-library/react";
import SideBarItem from "../../src/components/SideBar/SideBarItem.tsx";

describe("SideBarItem", () => {
  const mockChatId = "123";
  const mockChatTitle = "Test Chat";
  const mockOnChatSelect = jest.fn();
  const mockOnChatDelete = jest.fn();

  it("renders chat title", () => {
    render(
      <SideBarItem
        chatId={mockChatId}
        chatTitle={mockChatTitle}
        onCurrentChat={false}
        onChatSelect={mockOnChatSelect}
        onChatDelete={mockOnChatDelete}
      />
    );

    expect(screen.getByText(mockChatTitle)).toBeInTheDocument();
  });

  it("triggers onChatSelect when clicked", () => {
    render(
      <SideBarItem
        chatId={mockChatId}
        chatTitle={mockChatTitle}
        onCurrentChat={false}
        onChatSelect={mockOnChatSelect}
        onChatDelete={mockOnChatDelete}
      />
    );

    const chatElement = screen.getByText(mockChatTitle);
    fireEvent.click(chatElement);

    expect(mockOnChatSelect).toHaveBeenCalledWith(mockChatId);
  });

  it("triggers onChatDelete when delete is clicked", () => {
    render(
      <SideBarItem
        chatId={mockChatId}
        chatTitle={mockChatTitle}
        onCurrentChat={false}
        onChatSelect={mockOnChatSelect}
        onChatDelete={mockOnChatDelete}
      />
    );

    const deleteButton = screen.getByText("🗑️ Delete");
    fireEvent.click(deleteButton);

    expect(mockOnChatDelete).toHaveBeenCalledWith(mockChatId);
  });
});
