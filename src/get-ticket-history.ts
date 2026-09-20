import {type RunContext, tool} from "@openai/agents";
import {z} from "zod";
import type {Customer, SupportContext, Ticket, TicketHistoryResult} from "./types.js";

const customerTickets: Record<string, Ticket[]> = {
    cust_123: [
        {
            id: 'ticket_123',
            customerId: 'cust_123',
            status: "open",
        },
        {
            id: 'ticket_3456',
            customerId: 'cust_123',
            status: "closed",
        }
    ],
    cust_456: [
        {
            id: 'ticket_987',
            customerId: 'cust_456',
            status: "open",
        },
        {
            id: 'ticket_357',
            customerId: 'cust_456',
            status: "closed",
        }
    ],
};

export const getTicketHistory = tool({
    name: 'get_ticket_history',
    description: "Retrieves the support-ticket history for the currently authenticated customer, including ticket IDs and statuses.",
    parameters: z.object({}),
    execute: async (_input, context?: RunContext<SupportContext>): Promise<TicketHistoryResult> => {
        if (!context) {
            throw new Error("Customer lookup requires application context.");
        }
        const {customerId, lookupIds} = context.context;
        lookupIds.push(customerId);
        console.log(`[get_ticket_history] Looking up ticket history for customer ${customerId}`);
        return customerTickets[customerId] ?? [];
    },
});