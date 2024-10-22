## Chat Interface & Storage Design Doc

### Entities
We've defined a set of interfaces for messages and conversations in `types.ts`.

- TextContent: interface for texual content and has two fields:
   - type: a string that represents the type of the content, typically "text"
   - text: a string that represents the actual textual content

- ImageContent: interface for image content and has two fields:
   - type: a string that represents the type of the content, typically "Image"
   - text: a string containing the URL of the image

- Message: interface that defines a message and has two fields:
    - role: a Role type variable that indicates the sender of the message and can be "system", "user", or "assistant"
    - content: a union type that can either be a single string or a list of TextContent and ImageContent.

- Chat: interface for a collection of messages and has four fields:
  - id: a string unique identifier for the chat in indexedDB
  - messages: a list of Message objects
  - description: a string indicating a brief description of the chat
  - lastModified: a Date object indicating the last time that chat is modified


### Storage
We've decided to use IndexedDB and its wrapper class Dexie.js to store historical conversations in users' browsers since it's simple and works well for our purpose. We have defined an API for DB operations in `db.ts`.

**addChat(messages: Messages):Promise\<number>**
- Description: Adds a new chat entry to the database.
- Parameters:
    - messages: The Messages object associated with the chat.
- Returns:
    - A Promise<number> that resolves to the auto-incremented id of the newly added chat.

**updateChat(chat: Chat): Promise\<number>**
- Description: Updates an existing chat entry in the database. If the chat doesn't exist, a new one is added.
- Parameters:
    - chat: A Chat object representing the updated chat information.
- Returns:
    - A Promise<number> that resolves to the id of the updated (or newly added) chat.

**getChatById(id: string): Promise\<Chat | undefined>**
- Description: Retrieves a chat entry by its id.
- Parameters:
    - id: The unique id of the chat.
- Returns:
    - A Promise<Chat | undefined> that resolves to the chat object if found, otherwise undefined.

**deleteChatById(id: string): Promise\<void>**
- Description: Deletes a chat entry by its id.
- Parameters:
    - id: The unique id of the chat.
- Returns:
    - A Promise<void> that resolves once the chat has been deleted.

**getChats(): Promise\<Chat[]>**
- Descriptions: Retrieves all chat entries from the database.
- Returns: A Promise<Chat[]> that resolves to an array of all chat objects.

**clearChats(): Promise\<void>**
- Descriptions: Clears all chat entries from the database.
- Returns: A Promise<void> that resolves once all chat entries are cleared.


### UI Components
TODO: Side Bar, Main Interface, Input Bar, etc.