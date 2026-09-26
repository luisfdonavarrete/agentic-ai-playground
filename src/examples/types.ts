import type {Session} from "@openai/agents";

export type Example = {
    description: string;
    // Omit for independent runs; otherwise share a fresh session across turns.
    createSession?: () => Session;
    scenarios: {
        name: string;
        customerId: string;
        question: string;
    }[];
};
