import {contextOnly} from "./context-only.js";
import {sessions} from "./sessions.js";
import type {Example} from "./types.js";

export const examples: Record<string, Example> = {
    "context-only": contextOnly,
    sessions
};
