import type {Customer} from "../types.js";

const customers: Record<string, Customer> = {
    cust_123: {id: "cust_123", firstName: "Alex", lastName: "Demo", accountStatus: "locked"},
    cust_456: {id: "cust_456", firstName: "Sam", lastName: "Example", accountStatus: "active"},
};

export const customerService = {
    getCustomer(id: string): Customer | undefined {
        if (Object.hasOwn(customers, id)) {
            return customers[id];
        }
        return undefined;
    }
};
