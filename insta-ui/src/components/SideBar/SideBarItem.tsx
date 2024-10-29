"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface ISideBarItemProps {
  chatId: string;
  chatTitle: string;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
}

export default function SideBarItem({
  chatId,
  chatTitle,
  onChatSelect,
  onChatDelete,
}: ISideBarItemProps) {
  // TODO: pop up menu for delete and rename
  // TODO: categorize by date (unnecessary?)
  return (
    <div className="flex items-center rounded-md hover:bg-gray-100">
      <a
        onClick={() => onChatSelect(chatId)}
        className="flex flex-row gap-2 p-3 text-gray-800 cursor-pointer items-center w-full"
      >
        <FontAwesomeIcon icon={faComments} />
        <div className="flex-grow text-left">{chatTitle}</div>
      </a>
      <a onClick={() => onChatDelete(chatId)} className="p-2 cursor-pointer">
        <FontAwesomeIcon icon={faEllipsis} />
      </a>
    </div>
  );
}
