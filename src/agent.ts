import { createAgent, createMiddleware } from "langchain";
import { TOOLS } from "./tools.js";
import { SYSTEM_PROMPT } from "./prompts.js";
import { z } from "zod";

const StateSchema = z.object({
  userId: z.string(),
}).partial();

const ContextSchema = z.object({
  auth: z.string(),
  client: z.string(),
}).partial();

export const agent = createAgent({
  model: "openai:gpt-4.1-nano",
  tools: TOOLS,
  systemPrompt: SYSTEM_PROMPT,
  stateSchema: StateSchema,
  contextSchema: ContextSchema,
  middleware: [
    createMiddleware({
      name: "LoggingMiddleware",
      contextSchema: ContextSchema,
      stateSchema: StateSchema,
      wrapModelCall: async (request, handler) => {
        console.log("wrapModelCall state:", request.state);
        console.log("wrapModelCall runtime:", request.runtime);
        console.log("wrapModelCall context:", request.runtime.context);
        return handler(request);
      },
      // beforeAgent: async (state, runtime) => {
      //   console.log("beforeAgent state:", state);
      //   console.log("beforeAgent runtime:", runtime);
      //   console.log("beforeAgent context:", runtime.context);
      // },
      // afterAgent: async (state, runtime) => {
      //   console.log("afterAgent state:", state);
      //   console.log("afterAgent runtime:", runtime);
      //   console.log("afterAgent context:", runtime.context);
      // },
      // beforeModel: async (state, runtime) => {
      //   console.log("beforeModel state:", state);
      //   console.log("beforeModel runtime:", runtime);
      //   console.log("beforeModel context:", runtime.context);
      // },
      // afterModel: async (state, runtime) => {
      //   console.log("afterModel state:", state);
      //   console.log("afterModel runtime:", runtime);
      //   console.log("afterModel context:", runtime.context);
      // },
    })
  ]
}).graph;
