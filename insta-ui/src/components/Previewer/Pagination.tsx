import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getChatById } from "@/lib/db";
import { Chat } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { GE } from "@/lib/enums";

interface IPaginationProps {
  chatId: string;
  onUpdateCode: (code: string) => void;
}

export default function Pagination({ chatId, onUpdateCode }: IPaginationProps) {
  const getAllCodeByChatId = useCallback(async (): Promise<string[]> => {
    const chat: Chat | undefined = await getChatById(chatId);
    if (!chat) return [];

    return chat.messages
      .map((msg) => {
        if (msg.role === "assistant" && typeof msg.content === "string") {
          return msg.content;
        }
      })
      .filter((msg) => msg !== undefined);
  }, [chatId]);

  const setLastCode = useCallback(async () => {
    // get all code by current chatId
    const codes = await getAllCodeByChatId();
    setCodes(codes);
    if (codes.length > 0) {
      // set to the last code
      setIdx(codes.length - 1);
      onUpdateCode(codes[codes.length - 1]);
    }
  }, [getAllCodeByChatId, onUpdateCode]);

  // listen refresh-previewer event to know when to update the code
  useEffect(() => {
    window.addEventListener(GE.RefreshPreviewer, setLastCode);
    return () => {
      window.removeEventListener(GE.RefreshPreviewer, setLastCode);
    };
  }, [getAllCodeByChatId, setLastCode]);

  const [codes, setCodes] = useState<string[]>([]);
  const [idx, setIdx] = useState<number>(0);

  //   update the code when chatId changes
  useEffect(() => {
    setLastCode();
  }, [chatId, setLastCode]);

  const handlePrev = () => {
    if (idx > 0) {
      setIdx(idx - 1);
      onUpdateCode(codes[idx - 1]);
    }
  };

  const handleNext = () => {
    if (idx < codes.length - 1) {
      setIdx(idx + 1);
      onUpdateCode(codes[idx + 1]);
    }
  };

  if (!chatId || codes.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrev}
        disabled={idx === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <span className="text-md">
        {idx + 1} / {codes.length}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={idx === codes.length - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}
