import type {Example} from "./types.js";

export const contextOnly: Example = {
    description: "Independent tool calls using context only (no conversation history).",
    scenarios: [
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
    ]
};
