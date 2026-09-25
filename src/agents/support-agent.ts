import {type SupportAgent, supportResponseSchema} from "../types.js";
import {ticketHistoryTool} from "../tools/ticket-history.tool.js";
import {serviceStatusTool} from "../tools/service-status.tool.js";
import {customerTool} from "../tools/customer.tool.js";
import {Agent} from "@openai/agents";
import * as fs from "node:fs";

const instructions = fs.readFileSync(
    new URL("./../instructions.md", import.meta.url),
    "utf8",
);

const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
    outputType: supportResponseSchema,
    tools: [customerTool, ticketHistoryTool, serviceStatusTool]
});

export default agent as SupportAgent;