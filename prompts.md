# Reusable Prompts

## 1. New feature

```text
Implement one scoped feature for my React Expense Tracker assignment.

Before editing files or running commands:
1. Propose a plan describing the goal, files to change, testable acceptance criteria, tests, and verification commands.
2. Wait for my approval. Do not edit files or run commands until I approve.

Project rules:
- Use React and Vite. Keep all expense application state and state updates in src/App.jsx.
- Use one React component per file. Components receive data and callbacks through props.
- Do not add, remove, or upgrade dependencies without asking me first.
- Work on one scoped task per branch and pull request. Every task must go through review before merging into main.
- Before committing, summarize the changes, inspect the diff, and run relevant tests, lint, and build checks.
- Never modify a test merely to make an implementation pass.

Task:
[Describe the feature and its scope.]

Acceptance criteria:
[List observable, testable outcomes. Every criterion must be verifiable by a test.]

Tests:
[Specify required tests, or ask the agent to propose them.]

After I approve the plan, implement only the approved scope. Ensure tests verify real behavior and reject tests that pass regardless of whether the behavior works.

### Add Expense prompt

#### Context
This is a React and Vite expense tracker assignment. Keep all expense state and state updates in src/App.jsx.

#### Goal
Implement a dedicated ExpenseForm component that lets a user submit an expense with a title, amount, and category.

#### Constraints
- Put ExpenseForm in its own file; use one React component per file.
- Pass data and callbacks through props. Keep expense state in src/App.jsx.
- Categories are Food, Travel, Bills, and Other.
- Do not add, remove, or upgrade dependencies without asking me first.
- Work on one scoped task per branch and pull request; require review before merging into main.
- Do not edit files or run commands until I approve the proposed plan.

#### Acceptance criteria
Each criterion must be verifiable by a test:
1. The form provides inputs for title, amount, and category.
2. The category choices are Food, Travel, Bills, and Other.
3. An empty or whitespace-only title is rejected.
4. A non-numeric amount is rejected.
5. A zero amount is rejected.
6. A negative amount is rejected.
7. An amount above 100000 is rejected.
8. A valid submission calls the supplied callback once with the expected expense data.
9. Rejected submissions do not call the supplied callback and provide accessible validation feedback.

#### Examples
- Valid: title `Groceries`, amount `42.50`, category `Food`. Submitting calls the callback with the corresponding expense data.
- Invalid: empty title, amount `25`, category `Bills`. Submission is rejected.
- Invalid: title `Bus fare`, amount `-5`, category `Travel`. Submission is rejected.
- Invalid: title `Rent`, amount `100001`, category `Bills`. Submission is rejected.
```

## 2. Bug fix

```text
Fix one scoped bug in my React Expense Tracker assignment.

Before editing files or running commands:
1. Propose a plan describing the observed issue, likely cause, files to change, testable acceptance criteria, tests, and verification commands.
2. Wait for my approval. Do not edit files or run commands until I approve.

Project rules:
- Keep all expense application state and state updates in src/App.jsx.
- Use one React component per file; pass data and callbacks through props.
- Do not add, remove, or upgrade dependencies without asking me first.
- Work on one scoped task per branch and pull request. Every task must go through review before merging into main.
- Before committing, summarize the changes, inspect the diff, and run relevant tests, lint, and build checks.
- Never modify a test merely to make an implementation pass. Tests must verify real behavior and fail when that behavior is broken.

Bug report:
[Describe the steps to reproduce, expected behavior, actual behavior, and relevant error output.]

Acceptance criteria:
[List observable outcomes that can each be verified by a test.]

After I approve the plan, implement only the approved fix. Add or update tests as approved; reject tests that pass regardless of whether the fix works.
```

## 3. Refactor

```text
Refactor one scoped part of my React Expense Tracker assignment without changing its intended behavior.

Before editing files or running commands:
1. Propose a plan describing the refactor goal, files to change, behavior that must remain unchanged, testable acceptance criteria, tests, and verification commands.
2. Wait for my approval. Do not edit files or run commands until I approve.

Project rules:
- Keep all expense application state and state updates in src/App.jsx.
- Use one React component per file; pass data and callbacks through props.
- Do not add, remove, or upgrade dependencies without asking me first.
- Work on one scoped task per branch and pull request. Every task must go through review before merging into main.
- Before committing, summarize the changes, inspect the diff, and run relevant tests, lint, and build checks.
- Never modify a test merely to make an implementation pass. Tests must verify real behavior and fail when that behavior is broken.

Refactor scope:
[Describe the code to refactor and why.]

Behavior to preserve:
[List current behavior and edge cases that must remain unchanged.]

Acceptance criteria:
[List observable, testable outcomes, including how unchanged behavior will be verified.]

After I approve the plan, make only the approved structural changes. Do not bundle unrelated fixes or feature work.
```

## 4. Generate tests

```text
Propose and, after my approval, write tests for one scoped part of my React Expense Tracker assignment.

Before editing files or running commands:
1. Propose a plan identifying the behavior under test, test files to add or change, testable acceptance criteria, and verification commands.
2. Wait for my approval. Do not edit files or run commands until I approve.

Project rules:
- Do not add, remove, or upgrade dependencies without asking me first.
- Work on one scoped task per branch and pull request. Every task must go through review before merging into main.
- Before committing, summarize the changes, inspect the diff, and run relevant tests, lint, and build checks.
- Never modify a test merely to make an implementation pass.
- Tests must verify real, observable behavior and fail when that behavior is broken. Reject tests that pass regardless of whether the behavior works.

Code or behavior to test:
[Identify the component, function, or user flow.]

Acceptance criteria:
[List each behavior the tests should verify.]

Test requirements:
[Specify cases, boundaries, and expected results. Include relevant valid, invalid, empty, and edge cases.]

After I approve the plan, write focused tests only. Do not change production code unless I separately approve that work. If a test fails, report what it reveals; do not weaken the assertion to make it pass.
```

## 5. Review diff

```text
Review the current diff for one scoped React Expense Tracker task. Do not edit files.

Review for:
- Correctness against the task and its testable acceptance criteria.
- Expense state and state updates remaining in src/App.jsx.
- One React component per file, with data and callbacks passed through props.
- Unapproved dependency changes.
- Missing, weak, or misleading tests. Tests must verify real behavior and fail when that behavior is broken; reject tests that pass regardless of implementation.
- Regressions, accessibility issues, and unnecessary scope.

Task and acceptance criteria:
[Describe the task and list its acceptance criteria.]

Before concluding:
- Inspect the complete diff.
- Report findings with file and line references, ordered by severity.
- State which relevant tests, lint, and build checks should be run or were run, and their results if available.
- Confirm whether the changes are ready for a reviewed pull request or need revision.

Do not modify tests merely to make an implementation pass. Do not commit or merge anything.
```

## 6. Commit message

```text
Suggest a commit message for one scoped React Expense Tracker task.

Task:
[Describe the task.]

Change summary:
[Summarize the implemented changes.]

Verification:
[List relevant tests, lint, and build checks and their results.]

Rules:
- Do not create a commit or edit files.
- Keep the message specific to this one scoped task.
- The task must use its own branch and pull request, and the pull request must be reviewed before merging into main.
- Do not imply tests passed unless their results are provided.
- Mention a test or verification detail only when it is accurate and useful.

Return one concise commit message, followed by an optional body if the change needs context.
```