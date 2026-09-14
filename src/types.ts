import * as z from "zod";

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
    lookupIds: string[];
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