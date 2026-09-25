import * as z from "zod";
import type {Agent} from "@openai/agents";

export const supportResponseSchema = z.object({
    category: z.enum(["login", "app_crash", "unknown", "other"]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    summary: z.string(),
    reasoning: z.string(),
    recommendedAction: z.string()
});
export type SupportResponse = z.infer<typeof supportResponseSchema>;

export type SupportContext = {
    customerId: string;
};

const customerSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    accountStatus: z.enum(["active", "locked"]),
});
export type Customer = z.infer<typeof customerSchema>;

export const customerLookupSchema = z.object({
    status: z.enum(["found", "not_found"]),
    customer: customerSchema.nullable(),
});

export type CustomerLookup = z.infer<typeof customerLookupSchema>;

const ticketSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    status: z.enum(["open", "closed"]),
});

export type Ticket = z.infer<typeof ticketSchema>;

export type TicketHistoryResult = z.infer<typeof ticketSchema[]>;

export const statusSchema = z.enum([
    "active",
    "inactive",
    "maintenance",
    "suspended",
    "terminated",
]);
export type ServiceStatus = z.infer<typeof statusSchema>;

export type SupportAgent = Agent<
    SupportContext,
    typeof supportResponseSchema
>