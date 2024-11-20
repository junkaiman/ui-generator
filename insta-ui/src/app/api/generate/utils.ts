export function fetchAIResponse(
  textInput: string,
  imageInput: string | undefined = undefined,
  previousCode: string | undefined = undefined
) {
  return fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      textInput,
      imageInput,
      previousCode,
    }),
  });
}

export function fetchAIResponseWithTitle(
  textInput: string,
  imageInput: string | undefined = undefined,
  previousCode: string | undefined = undefined,
  topicName: boolean
) {
  return fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      textInput,
      imageInput,
      previousCode,
      topicName,
    }),
  });
}
