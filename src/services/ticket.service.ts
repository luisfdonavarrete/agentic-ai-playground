import type {Ticket} from "../types.js";

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

export const ticketService = {
    getHistory: (customerId: string): Ticket[] => {
        if (Object.hasOwn(customerTickets, customerId)) {
            return customerTickets[customerId] ?? [];
        }
        return [];
    }
};