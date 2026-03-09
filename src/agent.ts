import { createAgent, createMiddleware } from "langchain";
import { TOOLS } from "./tools.js";
import { SYSTEM_PROMPT } from "./prompts.js";

export const agent = createAgent({
  model: "openai:gpt-4.1-nano",
  tools: TOOLS,
  systemPrompt: SYSTEM_PROMPT,
  middleware: [
    createMiddleware({
      name: "LoggingMiddleware",
      wrapModelCall: async (request, handler) => {
        console.log("wrapModelCall context:", request.runtime.context);
        return handler(request);
      },
      beforeAgent: async (request) => {
        console.log("beforeAgent context:", request.runtime.context);
      },
      afterAgent: async (request) => {
        console.log("afterAgent context:", request.runtime.context);
      },
      beforeModel: async (request) => {
        console.log("beforeModel context:", request.runtime.context);
      },
      afterModel: async (request) => {
        console.log("afterModel context:", request.runtime.context);
      },
    })
  ]
}).graph;
