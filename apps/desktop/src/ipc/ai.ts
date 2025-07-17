import { ipcMain } from "electron";
import OpenAI from "openai";

export const registerAIIPC = () => {
  const openai = new OpenAI({
    baseURL: "http://localhost:11434/v1/",
    // required but ignored
    apiKey: "ollama",
  });
  ipcMain.handle("ai:chatCompletion", async (event, messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "llama3.2",
      messages,
    });
    return completion.choices[0].message;
  } catch (error) {
      return false;
    }
  });
}