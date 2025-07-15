export type AppEnvironment = {
  isApp: true,
} & {
  ai: {
    // chatCompletion: (messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) => Promise<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>;
    chatCompletion: (messages: any[]) => Promise<any[]>;
  };
  window: {
    openFloatingEditor: () => void;
  };
}

export type BrowserEnvironment = {
  isApp: false
}

export type Environment = AppEnvironment | BrowserEnvironment;