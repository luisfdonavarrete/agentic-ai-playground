import 'dotenv/config';
import { Agent, run } from "@openai/agents";
import * as fs from "node:fs";
import path from 'node:path';
import {fileURLToPath} from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const instructions = fs.readFileSync(__dirname + '/instructions.md', 'utf8');

const agent = new Agent({
    name: "customer support assistant",
    instructions: instructions,
    model: "gpt-6-astra",
});

const result = await run(agent, "How can I reset my password?");
console.log(result.finalOutput);