# Agentic AI playground

Run `npm install` and configure `.env` using `.env.example`.

## Run an example

Each example has its own entrypoint and runs once before exiting:

```sh
npm run example:context-only
npm run example:sessions
```

| Example | Context | Session history |
| --- | --- | --- |
| `context-only` | Customer ID for each independent scenario | None |
| `sessions` | Customer ID for each turn | One fresh OpenAI conversation shared across the turns |

For watch mode, run `npx tsx watch src/examples/sessions/main.ts` (or the
context-only entrypoint). Watch mode stays running until you press Ctrl+C.
Each rerun of the sessions example starts a fresh conversation.

For compiled runs:

```sh
npm run build
node dist/examples/context-only/main.js
node dist/examples/sessions/main.js
```

There is no central `index.ts` or default example. Open an example's `main.ts`
to see its prompts, context, session setup, agent calls, and reported results.
Both examples report the scenario, question, response, and tool calls.

## Organization

```text
src/
  examples/
    context-only/main.ts
    sessions/main.ts
  agents/
    support/
      agent.ts
      instructions.md
      types.ts
      tools/
      services/
  sessions/
    custom-memory-session.ts
drafts/
  custom-in-memory-session.ts
```

The examples share the support agent and its mock data, but each owns its
execution flow. Support-specific instructions, schemas, tools, and services
live with that agent. Reusable session implementations live in `src/sessions/`.
The build copies Markdown assets from `src/` to matching paths in `dist/`.

The custom memory-session example is an unfinished draft, including incomplete
syntax. It is excluded from the TypeScript build and has no runnable command;
its session implementation remains available in `src/sessions/`.

## Add an example or agent

1. Create `src/examples/<name>/main.ts`. Start with `import "dotenv/config"`,
   import the agent you need, and write that example's execution flow.
2. Add an `example:<name>` script running `tsx src/examples/<name>/main.ts` to
   `package.json`, and document the example here. No registry is required.
3. Reuse an existing agent or create `src/agents/<name>/agent.ts`, keeping its
   instructions, types, tools, and services alongside it. New agents can use
   their own context and output types; they do not need customer IDs.

Examples can use one or multiple agents. Create sessions inside the example
and share them only across turns intended to belong to the same conversation.
