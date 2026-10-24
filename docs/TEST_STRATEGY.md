# Cypress QA strategy

## Goal

Demonstrate maintainable, deterministic browser E2E tests using Cypress and TypeScript.

## Scope

The local inventory demo provides UI search, item creation, deletion, client validation, API integration and failure recovery. The test reset endpoint exists **only** on the local demo server.

## Test design

- Page Object Model abstracts common interactions.
- Stable `data-testid` selectors avoid CSS coupling.
- Test data resets before each test to prevent cross-test state leakage.
- Intercepts verify request payloads, simulate failures and supply deterministic fixtures.
- Assertions cover visible outcomes, not just clicks.

## Exit criteria

GitHub Actions must pass TypeScript validation and Cypress E2E tests. Review screenshots, videos and logs on failure before merge.

## Limits and future work

No production Kitchen Inventory integration, cross-browser suite, visual baseline, a11y audit, or security assessment in v0.1. Generate and commit a lockfile for reproducible CI; later use isolated test accounts for any production-adjacent environment.
