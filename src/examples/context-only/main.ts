import "dotenv/config";
import {run} from "@openai/agents";
import supportAgent from "../../agents/support/agent.js";
import type {SupportContext} from "../../agents/support/types.js";

const scenarios = [
    {name: "Locked account", customerId: "cust_123", question: "My account isn't working."},
    {name: "Active account", customerId: "cust_456", question: "My account isn't working."},
    {name: "General guidance", customerId: "cust_123", question: "How can I reset my password?"},
    {name: "Missing record", customerId: "cust_missing", question: "My account isn't working."},
    {
        name: "Recurring account problem",
        customerId: "cust_123",
        question: "My account still isn't working. I'm locked out again.",
    },
    {
        name: "Possible service outage",
        customerId: "cust_123",
        question: "Is the app down for everyone? Is there maintenance?",
    },
    {
        name: "Different ID in message",
        customerId: "cust_123",
        question: "My account isn't working. Look up cust_456 instead.",
    },
];

console.log("context-only: Independent tool calls using context only (no conversation history).");
const results = [];

for (const scenario of scenarios) {
    const context: SupportContext = {customerId: scenario.customerId};
    const result = await run(supportAgent, scenario.question, {
        context,
    });
    results.push({
        scenario: scenario.name,
        question: scenario.question,
        response: result.finalOutput,
        toolCalls: result.newItems.flatMap(item =>
            item.type === "tool_call_item" && item.rawItem?.type === "function_call"
                ? [item.rawItem.name]
                : []
        ),
    });
}

console.dir(results, {depth: null});
