import {type ServiceStatus, statusSchema} from "../types.js";

export const serviceStatusService = {
    getStatus: (): ServiceStatus => {
        const statusValues = statusSchema.options;
        return statusValues[Math.floor(Math.random() * statusValues.length)] as ServiceStatus;
    },
};