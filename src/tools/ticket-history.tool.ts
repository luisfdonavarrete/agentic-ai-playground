import {type RunContext, tool} from "@openai/agents";
import {z} from "zod";
import type { SupportContext, TicketHistoryResult} from "../types.js";
import {ticketService} from "../services/ticket.service.js";

export const ticketHistoryTool = tool({
    name: 'get_ticket_history',
    description: "Retrieves the support-ticket history for the currently authenticated customer, including ticket IDs and statuses.",
    parameters: z.object({}),
    execute: async (_input, context?: RunContext<SupportContext>): Promise<TicketHistoryResult> => {
        if (!context) {
            throw new Error("Customer lookup requires application context.");
        }
        const {customerId} = context.context;
        console.log(`[get_ticket_history] Looking up ticket history for customer ${customerId}`);
        return ticketService.getHistory(customerId);
    },
});