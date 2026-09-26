import 'dotenv/config';
import supportAgent from "./agents/support-agent.js";
import {examples} from "./examples/index.js";
import {runExample} from "./examples/run-example.js";

const name = process.argv[2] ?? "sessions";

console.log(name);
const example = Object.hasOwn(examples, name) ? examples[name] : undefined;

if (name === "--list" || !example) {
    for (const [key, value] of Object.entries(examples)) {
        console.log(`${key}: ${value.description}`);
    }
    if (name !== "--list") {
        console.error(`Unknown example: ${name}`);
        process.exitCode = 1;
    }
} else {
    console.log(`${name}: ${example.description}`);
    console.dir(await runExample(supportAgent, example), {depth: null});
}
