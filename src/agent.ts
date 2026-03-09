import { createAgent, createMiddleware } from "langchain";
import { TOOLS } from "./tools.js";
import { SYSTEM_PROMPT } from "./prompts.js";
import { z } from "zod";

const ContextSchema = z.object({
  auth: z.string(),
  client: z.string(),
});

export const agent = createAgent({
  model: "openai:gpt-4.1-nano",
  tools: TOOLS,
  systemPrompt: SYSTEM_PROMPT,
  contextSchema: ContextSchema,
  middleware: [
    createMiddleware({
      name: "LoggingMiddleware",
      contextSchema: ContextSchema,
      wrapModelCall: async (request, handler) => {
        console.log("wrapModelCall runtime:", request.runtime);
        console.log("wrapModelCall context:", request.runtime.context);
        return handler(request);
      },
      beforeAgent: async (_state, runtime) => {
        console.log("beforeAgent runtime:", runtime);
        console.log("beforeAgent context:", runtime.context);
      },
      afterAgent: async (_state, runtime) => {
        console.log("afterAgent runtime:", runtime);
        console.log("afterAgent context:", runtime.context);
      },
      beforeModel: async (_state, runtime) => {
        console.log("beforeModel runtime:", runtime);
        console.log("beforeModel context:", runtime.context);
      },
      afterModel: async (_state, runtime) => {
        console.log("afterModel runtime:", runtime);
        console.log("afterModel context:", runtime.context);
      },
    })
  ]
}).graph;
