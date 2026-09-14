import {type RunContext, tool} from "@openai/agents";
import {type Customer, type CustomerLookup, customerLookupSchema, type SupportContext} from "./types.js";
import * as z from "zod";


const customers: Record<string, Customer> = {
    cust_123: {id: "cust_123", firstName: "Alex", lastName: "Demo", accountStatus: "locked"},
    cust_456: {id: "cust_456", firstName: "Sam", lastName: "Example", accountStatus: "active"},
};

export const getCustomer = tool({
    name: "get_customer",
    description: "Look up the signed-in customer's profile and account status from fictional demo records. No customer ID is needed from the user.",
    parameters: z.object({}),
    outputSchema: customerLookupSchema,
    execute: async (_input, context?: RunContext<SupportContext>): Promise<CustomerLookup> => {
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