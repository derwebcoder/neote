import { OpenAI } from "openai";

export namespace AI {
  export type Message = Pick<
    OpenAI.Chat.Completions.ChatCompletionMessageParam,
    "role" | "content"
  > & {
    content: string;
  };

  export type Response = OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
  };
}

const t: AI.Message = {
  role: "user",
  content: "Hello, world!",
};
