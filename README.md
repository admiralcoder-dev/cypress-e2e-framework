# AdmiralCoder — Cypress E2E Automation Framework

[AdmiralCoder](https://admiralcoder.com) · [GitHub organization](https://github.com/admiralcoder-dev)

A **TypeScript + Cypress** end-to-end test foundation with page objects, custom commands, fixtures, API intercepts, negative tests, and GitHub Actions.

> **v0.1 scope:** tests a deterministic local inventory demo. The public Kitchen Inventory application is a future integration target; this repository does not yet validate its production functionality.

## Quick start

Node.js 22+ required.

```bash
npm install
npm run typecheck
npm test
```

Cypress automatically starts the local inventory demo through the `start-server-and-test` script.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Headless Cypress suite in Electron |
| `npm run cy:open` | Interactive Cypress runner (start app separately) |
| `npm run start:demo` | Run inventory demo on localhost:4179 |
| `npm run typecheck` | TypeScript check |

## Test coverage

- Landing-page smoke and inventory display
- Search and no-results state
- Create and delete workflows
- Required-field and invalid-quantity validation
- API interception with fixture response
- Network error recovery
- POST request/response assertions
- Accessibility-minded selectors and stable `data-testid` attributes

## Structure

```text
demo/server.mjs                   Local HTTP API and static demo
demo/index.html                  Inventory demo application
cypress/e2e/smoke.cy.ts          Availability and rendering
cypress/e2e/inventory.cy.ts      Core CRUD UI flows
cypress/e2e/network.cy.ts        Interception and failures
cypress/pages/InventoryPage.ts   Page Object Model
cypress/support/commands.ts      Reusable Cypress commands
cypress/support/e2e.ts           Support entry point
cypress/fixtures/items.json      Controlled API response
cypress.config.ts                Cypress configuration
.github/workflows/cypress.yml    CI pipeline
docs/TEST_STRATEGY.md            Scope and quality approach
```

## Engineering standards

Use stable selectors, deterministic test data, independent test cases, and network assertions. CI captures screenshots and videos on failure. No credentials, customer records, or child data are used.

**Known limitations:** This is an isolated demo, not a production integration; no visual-regression baseline, multi-browser matrix, accessibility audit, or coverage threshold yet. Dependency lockfile is pending.

MIT licensed; see [LICENSE](LICENSE).
