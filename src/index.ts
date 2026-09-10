import 'dotenv/config';
import {Agent, run } from "@openai/agents";
import * as fs from "node:fs";
import * as z from "zod";

const instructions = fs.readFileSync(
    new URL("./instructions.md", import.meta.url),
    "utf8",
);

const supportResponseSchema = z.object({
    category: z.enum(["login", "app_crash", "unknown", "other"]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    summary: z.string(),
    reasoning: z.string(),
    recommendedAction: z.string()
});
type SupportResponse = z.infer<typeof supportResponseSchema>;

const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
    outputType: supportResponseSchema
});
const questions: string[] = [
    "How can I reset my password?",
    "The app crashes every time I open it on Android.",
    "Our entire team cannot log in, and work is blocked.",
    "It isn’t working. Please help.",
];

const results: { question: string, response: SupportResponse}[] = [];

for (const question of questions) {
    const result = await run(agent, question);
    const response = result.finalOutput;

    if (response === undefined) {
        throw new Error(`No output for: ${question}`);
    }
    results.push({ question, response });
}

console.dir(results, { depth: null });