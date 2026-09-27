import {type RunContext, tool} from "@openai/agents";
import { type CustomerLookup, customerLookupSchema, type SupportContext} from "../types.js";
import * as z from "zod";
import {customerService} from "../services/customer.service.js";

export const customerTool = tool({
    name: "get_customer",
    description: "Look up the signed-in customer's profile and account status from fictional demo records. No customer ID is needed from the user.",
    parameters: z.object({}),
    outputSchema: customerLookupSchema,
    execute: async (_input, context?: RunContext<SupportContext>): Promise<CustomerLookup> => {
        if (!context) {
            throw new Error("Customer lookup requires application context.");
        }
        const {customerId} = context.context;
        console.log(`[get_customer] Looking up demo customer ${customerId}`);
        const customer = customerService.getCustomer(customerId);
        return customer
            ? {status: "found", customer}
            : {status: "not_found", customer: null};
    },
});