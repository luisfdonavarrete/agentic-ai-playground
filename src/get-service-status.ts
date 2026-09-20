import {tool} from "@openai/agents";
import {z} from "zod";
import {type ServiceStatus, statusSchema} from "./types.js";

export const getServiceStatus = tool({
    name: 'get_service_status',
    description: "Checks the current operational status of the service, including whether it is active, under maintenance, suspended, or unavailable.",
    parameters: z.object({}),
    async execute(): Promise<ServiceStatus> {
        const statusValues = statusSchema.options;
        const randomStatus = statusValues[Math.floor(Math.random() * statusValues.length)];

        console.log(`[get_service_status] fetching service status: ${randomStatus}`);
        return randomStatus as ServiceStatus;
    },
});