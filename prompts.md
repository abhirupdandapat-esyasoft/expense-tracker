# Prompt library

## New feature
Context: [stack and relevant files]. Goal: [one behavior]. Constraints: [limits, dependencies and style]. Acceptance criteria: [observable outcomes]. Examples: [valid and invalid cases]. Show a plan before editing. Implement only the approved scope and summarise tests for the PR.

## Bug fix
Reproduce [problem] using [steps]. Expected: [result]. Actual: [result]. Find the cause before editing. Add a failing regression test, make a small fix and run the related tests. Explain what changed.

## Refactor
Simplify [files or function] while keeping the same behavior. Keep state in App and one component per file. Add no dependencies or comments. Run the existing tests and show the diff.

## Generate tests
Write meaningful tests for [feature]. Cover normal input, boundaries and invalid input. Assert user-visible results. Name the production bug each test would catch. Temporarily break the behavior to prove the test fails, then restore it.

## Review diff
Review this diff against [request]. Check that it runs, matches the scope, validates inputs and has tests that can catch regressions. Report bugs with file locations and a short reason. Do not edit files.

## Commit message
Read the staged diff. Suggest a short commit message with a verb describing the behavior changed. Do not claim tests passed unless their output is provided.

## Five-part prompt: add expense

### Context
The project uses Vite and React. App keeps state. ExpenseForm renders controlled fields. Categories are Food, Travel, Bills and Other. Amounts are stored as integer paise.

### Goal
Let a user submit a title, amount and category and see the new expense in the list.

### Constraints
Use one component per file. No new dependencies without approval. No code comments. Work on a branch and show a plan first. No persistence or backend is needed.

### Acceptance criteria
1. Submitting Lunch, 250.50 and Food adds one row showing Lunch, Food and 250.50.
2. Whitespace around a valid title is removed.
3. Empty or whitespace-only titles show an error and add no row.
4. Empty, non-numeric, non-finite, zero and negative amounts show an error and add no row.
5. An amount of 100000 is accepted; 100000.01 is rejected.
6. A valid submission clears the title and amount and resets the category to Food.
7. The visible count and total update after an expense is added.
8. An invalid category is rejected by the validation helper.

### Examples
Lunch / 250.50 / Food succeeds. Cab / 400 / Travel succeeds. A blank title, an amount of -20, or an amount of 100000.01 fails.
