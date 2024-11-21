import { Messages } from "@/lib/types";
export function fetchAIResponse(
  textInput: string,
  imageInput: string | undefined = undefined,
  previousMessages: Messages | undefined = undefined,
  topicName: boolean = false
) {
  return fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      textInput,
      imageInput,
      previousMessages,
      topicName,
    }),
  });
}
