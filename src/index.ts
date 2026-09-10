import 'dotenv/config';
import {Agent, run} from "@openai/agents";
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
const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
    outputType: outputType
});

const result = await run(agent, "How can I reset my password?");
console.log(result.finalOutput);