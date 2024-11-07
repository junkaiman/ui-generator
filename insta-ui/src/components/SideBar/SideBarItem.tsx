"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ISideBarItemProps {
  chatId: string;
  chatTitle: string;
  onCurrentChat: boolean;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
}

export default function SideBarItem({
  chatId,
  chatTitle,
  onCurrentChat,
  onChatSelect,
  onChatDelete,
}: ISideBarItemProps) {
  const chatItemClass = onCurrentChat ? "bg-gray-100" : "";
  return (
    <div
      className={
        "flex items-center rounded-md hover:bg-gray-100 " + chatItemClass
      }
    >
      <a
        onClick={() => onChatSelect(chatId)}
        className="flex flex-row gap-2 p-3 text-gray-800 cursor-pointer items-center w-full"
      >
        <FontAwesomeIcon icon={faComments} />
        <div className="flex-grow text-left">{chatTitle}</div>
      </a>
      <Popover>
        <PopoverTrigger>
          <a className="p-2 cursor-pointer">
            <FontAwesomeIcon icon={faEllipsis} />
          </a>
        </PopoverTrigger>
        <PopoverContent className="w-32 px-0 py-0">
          <div
            className="p-3 cursor-pointer hover:bg-gray-100 rounded"
            onClick={() => onChatDelete(chatId)}
          >
            🗑️ Delete
          </div>
          {/* TODO: Renaming */}
          {/* <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="p-3 cursor-pointer hover:bg-gray-100 rounded">
            🔄 Rename
          </div> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}
