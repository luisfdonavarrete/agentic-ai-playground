import {run} from "@openai/agents";
import type {SupportAgent, SupportContext} from "../types.js";
import type {Example} from "./types.js";

export async function runExample(agent: SupportAgent, example: Example) {
    const session = example.createSession?.();
    const results = [];

    for (const scenario of example.scenarios) {
        const context: SupportContext = {customerId: scenario.customerId};
        const result = await run(agent, scenario.question, {
            context,
            ...(session ? {session} : {})
        });
        results.push({
            scenario: scenario.name,
            question: scenario.question,
            response: result.finalOutput,
            toolCalls: result.newItems.flatMap(item =>
                item.type === "tool_call_item" && item.rawItem?.type === "function_call"
                    ? [item.rawItem.name]
                    : []
            )
        });
    }
    return results;
}
