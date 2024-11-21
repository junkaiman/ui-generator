// src/lib/types.ts

/**
 * LLM related types
 */

interface TextContent {
  type: 'text';
  text: string;
}

interface ImageContent {
  type: 'image_url';
  image_url: {
    url: string;
  };
}

export type Role = "system" | "user" | "assistant";

interface Message {
  role: Role;
  content: string | (TextContent | ImageContent)[];
}

type Messages = Message[];

interface GenerateRequest {
  textInput: string;
  imageInput?: string;
  previousMessages?: Messages[];
  topicName: boolean;
}

/**
 * Chat
 */
interface Chat {
  id: string;
  messages: Message[];
  description: string;
  lastModified: Date;
}

/**
 * ChatHeader used in SideBar
 */
interface ChatHeader {
  id: string;
  description: string;
  lastModified: Date;
}



export type { Message, Messages, Chat, ChatHeader, TextContent, ImageContent, GenerateRequest };