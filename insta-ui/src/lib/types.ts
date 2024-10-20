/**
 * LLM related types
 */

interface TextContent {
  type: string;
  text: string;
}

interface ImageContent {
  type: string;
  image_url: string;
}

export type Role = "system" | "user" | "assistant";

interface Message {
  role: Role;
  content: string | (TextContent | ImageContent)[];
}

type Messages = Message[];

/**
 * Chat
 */
interface Chat {
  id: string;
  messages: Message[];
  description: string;
  lastModified: Date;
}

export type { Messages, Chat };
