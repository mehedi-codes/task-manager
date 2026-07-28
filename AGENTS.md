# Agent workspace configuration — task-manager

This file tells the AI agent which skills to apply and what conventions to follow when working in this project.

## Project

Task Manager REST API. Built with:
- **Hono** + `@hono/zod-openapi` (web framework, OpenAPI docs)
- **Drizzle ORM** + Neon/PostgreSQL (database)
- **Zod** v4 (validation)
- **Pino** + `hono-pino` (logging)
- **Bun** (runtime/dev)
- **TypeScript** (strict, verbatimModuleSyntax, NodeNext module resolution)

## Skills — load these for the task at hand

| Skill | When to use |
|-------|-------------|
| `codebase-design` | Every architecture discussion. Core vocabulary: **module**, **interface**, **depth**, **seam**, **adapter**, **leverage**, **locality**. |
| `domain-modeling` | When adding new domain concepts, updating CONTEXT.md, or recording ADRs. |
| `tdd` | When writing tests or building features test-first. |
| `design-an-interface` | When exploring alternative module interfaces (run design-it-twice sub-agents). |
| `grilling` | When making architectural decisions — walk the decision tree one question at a time. |
| `improve-codebase-architecture` | Architecture reviews — surface deepening candidates. |
| `hono` | Building Hono apps: routing, middleware, context, validation, testing, streaming. |
| `zod` | Schema validation: parsing, type inference, error handling, refinements. |
| `zod-4` | Zod 4-specific patterns: top-level validators, error object syntax, migration from v3. |
| `drizzle` | Drizzle ORM: schema definitions, queries, joins, indexes, migrations. |
| `drizzle-orm-patterns` | Comprehensive Drizzle ORM: schema, CRUD, relations, migrations. |
| `nodejs-backend-patterns` | Backend architecture: layered design, error handling, middleware organization, graceful shutdown. |
| `nodejs-best-practices` | Node.js decision-making: framework selection, async patterns, security, validation philosophy. |
| `typescript-advanced-types` | Complex TypeScript types: generics, conditional types, utility types. |
| `supabase-postgres-best-practices` | PostgreSQL schema design, indexing, query optimization, and migrations. |
| `webapp-testing` | Testing patterns for web applications: integration tests, E2E flows, API testing. |
| `code-review` | Review code changes since a commit/branch against standards and spec. |
| `diagnosing-bugs` | Systematic debugging for hard bugs and performance regressions. |
| `implement` | Implement features from a spec or set of tickets. |
| `research` | Investigate questions against high-trust primary sources, save findings. |
| `ubiquitous-language` | Extract DDD-style domain vocabulary, flag ambiguities, propose canonical terms. |
| `biomejs` | Configuring and using BiomeJS for linting/formatting JS/TS/JSON/CSS, migrating from ESLint/Prettier, monorepo config, pre-commit hooks, CI integration. |

## Conventions

- **Imports**: use `@/` path alias (maps to `./src/`). Include `.js` extension on all local imports (`@/utils/foo.js`).
- **Module format**: ES modules (`"type": "module"` in package.json).
- **Verbose module syntax**: use `export` + `export type` explicitly. No default exports except where Hono conventions require them.
- **Types**: defined in `src/types/index.ts` for app-wide types. Local types live next to their module.
- **Schema**: database tables, Zod validation, and TypeScript types have separate concerns — keep them separated.
- **Config**: all `process.env` reads go through `src/config/env.ts` with Zod validation. Never read `process.env` directly.
- **Database**: accessed via `c.get("db")` from Hono context. Never import the `db` singleton directly in route handlers.

## Remaining issues

- Fill or remove empty module skeletons (`controller.ts`, `route.ts`, `service.ts`) in `src/modules/task/` and `src/modules/user/`
- Add task/user route registration to `registerRoutes` in `routes/index.ts`
- Move `security` field in `usersTable` schema to a proper auth module
- Add rate limiting middleware
