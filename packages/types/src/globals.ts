import { AI } from "./ai";

export type Globals = {
  ai: {
    chatCompletion: (messages: AI.Message[]) => AI.Response;
  };
};
