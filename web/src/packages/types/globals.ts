import { Message, Response } from "./ai";

export type Globals = {
  ai: {
    chatCompletion: (messages: Message[]) => Response;
  };
};
