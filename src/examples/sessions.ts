import {OpenAIConversationsSession} from "@openai/agents";
import type {Example} from "./types.js";

export const sessions: Example = {
    description: "Follow-up turns using context and shared conversation history.",
    createSession: () => new OpenAIConversationsSession(),
    scenarios: [
        {name: "Customer Inquiry", customerId: "cust_123", question: "Check customer C-123"},
        {name: "Customer Inquiry", customerId: "cust_123", question: "What previous tickets do they have?"},
    ]
};
