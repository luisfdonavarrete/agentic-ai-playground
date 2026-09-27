import "dotenv/config";
import {run, OpenAIConversationsSession} from "@openai/agents";
import supportAgent from "../../agents/support/agent.js";
import type {SupportContext} from "../../agents/support/types.js";

const scenarios = [
    {name: "Customer Inquiry", customerId: "cust_123", question: "Check customer C-123"},
    {name: "Customer Inquiry", customerId: "cust_123", question: "What previous tickets do they have?"},
];

console.log("sessions: Follow-up turns using context and shared conversation history.");
const session = new OpenAIConversationsSession();
const results = [];

for (const scenario of scenarios) {
    const context: SupportContext = {customerId: scenario.customerId};
    const result = await run(supportAgent, scenario.question, {
        context,
        session,
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
