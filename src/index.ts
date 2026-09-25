import 'dotenv/config';
import supportAgent from "./agents/support-agent.js";
import {toolsCalling} from "./examples/tools-calling.js";

const response = await toolsCalling.run(supportAgent);

console.dir(response, {depth: null});
