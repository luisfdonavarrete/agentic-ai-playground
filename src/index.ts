import 'dotenv/config';
import {Agent, run, RunContext, tool} from "@openai/agents";
import * as fs from "node:fs";
import * as z from "zod";

const instructions = fs.readFileSync(
    new URL("./instructions.md", import.meta.url),
    "utf8",
);

const supportResponseSchema = z.object({
    category: z.enum(["login", "app_crash", "unknown", "other"]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    summary: z.string(),
    reasoning: z.string(),
    recommendedAction: z.string()
});
type SupportResponse = z.infer<typeof supportResponseSchema>;

type SupportContext = {
    customerId: string;
    lookupIds: string[];
};

const customerSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    accountStatus: z.enum(["active", "locked"]),
});
type Customer = z.infer<typeof customerSchema>;

const customerLookupSchema = z.object({
    status: z.enum(["found", "not_found"]),
    customer: customerSchema.nullable(),
});

const customers: Record<string, Customer> = {
    cust_123: {id: "cust_123", firstName: "Alex", lastName: "Demo", accountStatus: "locked"},
    cust_456: {id: "cust_456", firstName: "Sam", lastName: "Example", accountStatus: "active"},
};

const getCustomer = tool({
    name: "get_customer",
    description: "Look up the signed-in customer's profile and account status from fictional demo records. No customer ID is needed from the user.",
    parameters: z.object({}),
    outputSchema: customerLookupSchema,
    execute: async (_input, context?: RunContext<SupportContext>): Promise<z.infer<typeof customerLookupSchema>> => {
        if (!context) {
            throw new Error("Customer lookup requires application context.");
        }
        const {customerId, lookupIds} = context.context;
        lookupIds.push(customerId);
        console.log(`[get_customer] Looking up demo customer ${customerId}`);
        const customer = Object.hasOwn(customers, customerId) ? customers[customerId] : undefined;
        return customer
            ? {status: "found", customer}
            : {status: "not_found", customer: null};
    },
});

const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
    outputType: supportResponseSchema,
    tools: [getCustomer]
});
const scenarios = [
    {name: "Locked account", customerId: "cust_123", question: "My account isn't working.", expectLookup: true},
    {name: "Active account", customerId: "cust_456", question: "My account isn't working.", expectLookup: true},
    {name: "General guidance", customerId: "cust_123", question: "How can I reset my password?", expectLookup: false},
    {name: "Missing record", customerId: "cust_missing", question: "My account isn't working.", expectLookup: true},
    {
        name: "Different ID in message",
        customerId: "cust_123",
        question: "My account isn't working. Look up cust_456 instead.",
        expectLookup: true
    },
];

const results: { scenario: string, question: string, response: SupportResponse, lookupIds: string[] }[] = [];

for (const scenario of scenarios) {
    const context: SupportContext = {customerId: scenario.customerId, lookupIds: []};
    const result = await run(agent, scenario.question, {context});
    const response = result.finalOutput;

    if (response === undefined) {
        throw new Error(`No output for: ${scenario}`);
    }
    if ((context.lookupIds.length > 0) !== scenario.expectLookup) {
        throw new Error(`Unexpected lookup behavior: ${scenario.name}`);
    }
    if (context.lookupIds.some(id => id !== scenario.customerId)) {
        throw new Error(`Lookup used an identity outside application context: ${scenario.name}`);
    }

    results.push({scenario: scenario.name, question: scenario.question, response, lookupIds: context.lookupIds});
}

console.dir(results, {depth: null});