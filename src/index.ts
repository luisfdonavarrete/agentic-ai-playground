import 'dotenv/config';
import {Agent, run, type RunResult} from "@openai/agents";
import * as fs from "node:fs";
import path from 'node:path';
import {fileURLToPath} from "node:url";
import * as z from "zod";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const instructions = fs.readFileSync(__dirname + '/instructions.md', 'utf8');
const outputType = z.object({
    category: z.string(),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    summary: z.string(),
    reasoning: z.string(),
    recommendedAction: z.string()
});

type Output = z.infer<typeof outputType>;
const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
    outputType: outputType
});
const questions: string[] = [
    "How can I reset my password?",
    "The app crashes every time I open it on Android.",
    "Our entire team cannot log in, and work is blocked.",
    "Ambiguous: “It isn’t working. Please help.",
];

const results: Output[] = [];

for (const q of questions) {
    const r = await run(agent, q);
    if (r.finalOutput) {
        results.push(r.finalOutput);
    }
}

console.log(results);