import {tool} from "@openai/agents";
import {z} from "zod";
import {type ServiceStatus} from "../types.js";
import {serviceStatusService} from "../services/service-status.service.js";

export const serviceStatusTool = tool({
    name: 'get_service_status',
    description: "Checks the current operational status of the service, including whether it is active, under maintenance, suspended, or unavailable.",
    parameters: z.object({}),
    async execute(): Promise<ServiceStatus> {
        const status = serviceStatusService.getStatus();
        console.log(`[get_service_status] fetching service status: ${status}`);
        return status;
    },
});