# Agentic AI playground

Run `npm install` and configure `.env` using `.env.example`.

## Existing examples

| Example | Context | Session history |
| --- | --- | --- |
| `context-only` | Customer ID for each independent scenario | None |
| `sessions` | Customer ID for each turn | Shared OpenAI conversation across the turns |

```sh
npm run dev -- --list
npm run dev -- context-only
npm run dev -- sessions
```

`dev` runs once and exits. Use `npm run dev:watch -- <example-name>` to rerun
on file changes; watch mode stays running until you press Ctrl+C.

The default is `sessions`. For compiled runs, use `npm run build` followed by
`npm start -- <example-name>`.

## Extending the examples

Each example defines a description, scenarios, and an optional `createSession`
factory. Add questions to its `scenarios` array to expand an existing example.

To add another example later, create a definition using the `Example` type and
register it in `src/examples/index.ts`. Omit `createSession` for independent runs,
or provide a factory for any SDK `Session` implementation (such as a future
MemorySession example). The runner creates one fresh session per execution and
shares it across that example's turns. Keep those turns within the same customer's
conversation.

`run-example.ts` reports the scenario, question, response, and tool calls
consistently for both examples.
