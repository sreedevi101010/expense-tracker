# Expense Tracker Project Guidelines

## Project overview

This project is a React expense tracker built with Vite and JavaScript. It uses Vitest and React Testing Library for unit and component tests, and Cypress for end-to-end tests.

## Plan before implementation

Before implementing any task:

1. Propose a scoped plan that identifies the goal, files, acceptance criteria, tests, and verification commands.
2. Wait for the user's approval.
3. Do not start implementation until approval is given.

Implement features in the assignment's required order: `ExpenseForm`, `ExpenseList` and `ExpenseItem`, `CategoryFilter`, then deletion, running total, and visible count as separate tasks. Test-tool setup may happen before feature work so each feature PR can include tests.

## Architecture and coding conventions

- Keep all expense application state and state updates in `src/App.jsx`.
- Use one React component per file.
- Each retained React component must include a short comment explaining its props and state responsibilities.
- Pass component data and callbacks through props. Keep components focused on rendering and user interaction; do not move expense state into child components.
- Follow existing JavaScript, React, and project formatting patterns.
- Use accessible labels and controls. Cypress-facing UI elements should have stable `data-cy` selectors.
- Do not add, remove, or upgrade dependencies without asking the user first.

## Git and pull requests

- Work on a separate branch for each scoped task.
- Keep each branch and pull request focused on one task.
- Every task must go through a pull request and review before merging into `main`.
- Start each task from the latest `main`. Do not merge a task branch without the required review and checks.
- Before committing:
  1. Summarize the changes.
  2. Inspect the complete diff, including staged and unstaged changes.
  3. Run relevant tests, lint, and build checks.
  4. Confirm unrelated files or user changes are not included.
- Use clear commit messages that describe the scoped change.

## Testing expectations

- Write tests for every acceptance criterion.
- Tests must verify observable, meaningful behavior and must fail if that behavior is broken. Reject tests that pass regardless of implementation.
- Never modify tests merely to make an implementation pass.
- For the amount limit exercise, write a failing test first for amounts over `100000`, implement the fix without changing that test, then verify it passes.
- Hand-write tests for valid expense submission and empty-title rejection.
- Include unit tests for input validation and total calculation.
- Generate and review tests for invalid amounts, filtering, deleting, and total calculation; confirm their assertions check the intended behavior.
- Reach at least 10 meaningful tests and run the coverage command below.
- Deliberately break tested behavior only for a local test-failure demonstration. Verify the relevant test fails, restore the implementation, and confirm the tests pass. Do not commit deliberately broken implementations.
- The running total should sum all expenses unless the assignment rubric explicitly says otherwise.
- The visible-expense count must reflect the filtered list currently shown.
- Cypress coverage must include:
  - The main add, filter, count, and total journey.
  - Invalid input for an empty title and a negative amount.
  - A delete flow, including a demonstration that the test fails when deletion is deliberately broken locally and passes after the implementation is restored.

## Expected folder layout

```text
src/
  App.jsx
  components/
    ExpenseForm.jsx
    ExpenseList.jsx
    ExpenseItem.jsx
    CategoryFilter.jsx
  *.test.js
  *.test.jsx
  test/
    setup.js
cypress/
  e2e/
    expense-tracker.cy.js
    expense-validation.cy.js
cypress.config.js
```

Keep each React component in its own file. Unit and component tests may be colocated with the code they test or placed in a clearly organized test directory. Cypress end-to-end specs belong in `cypress/e2e/`.

## Commands

Run commands from the repository root. The test dependencies, configuration, and corresponding package scripts must be approved and configured before running the relevant test commands.

### Install and run the app

```sh
npm install
npm run dev
```

### Lint and production build

```sh
npm run lint
npm run build
```

### Unit and component tests

Vitest and React Testing Library are not installed until the user approves adding them. After approval, install the required packages, for example:

```sh
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Configure the Vitest scripts and setup before use. Run the required coverage command:

```sh
npx vitest run --coverage
```

### Cypress end-to-end tests

Cypress is not installed until the user approves adding it. After approval:

```sh
npm install -D cypress
```

Configure Cypress with `baseUrl: "http://localhost:5173"` and configure these package scripts before using the commands:

```json
{
  "cy:open": "cypress open",
  "cy:run": "cypress run"
}
```

Start the Vite app in one terminal:

```sh
npm run dev -- --host 127.0.0.1
```

Then run Cypress in another terminal:

```sh
npm run cy:open
npm run cy:run
```