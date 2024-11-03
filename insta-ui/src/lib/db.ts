import Dexie, { type EntityTable } from "dexie";
import { Chat, Messages } from "./types";
import { DBNames } from "./enums";
import { v4 as uuidv4 } from "uuid";
const db = new Dexie(DBNames.Chats) as Dexie & {
  chats: EntityTable<Chat, "id">;
};

db.version(1).stores({
  chats: "++id, messages, description, lastModified",
});

const addChat = async (messages: Messages) => {
  const id = uuidv4();
  const chat = {
    id,
    messages,
    description: "New chat",
    lastModified: new Date(),
  };
  return db.chats.add(chat);
};

const updateChat = async (chat: Chat) => {
  return db.chats.update(chat.id, {
    messages: chat.messages,
    lastModified: new Date(),
  });
};

const getChatById = async (id: string) => {
  return db.chats.get(id);
};

const deleteChatById = async (id: string) => {
  return db.chats.delete(id);
};

const getChats = async () => {
  return db.chats.toArray();
};
const clearChats = async () => {
  return db.chats.clear();
};

export { db };
export {
  addChat,
  updateChat,
  getChatById,
  deleteChatById,
  getChats,
  clearChats,
};
