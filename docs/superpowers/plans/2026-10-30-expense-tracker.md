# Expense Tracker Implementation Plan

> Execute inline using superpowers:executing-plans. Follow test-driven-development for behavior changes.

**Goal:** Complete the local app, meaningful tests and assignment documents.

**Architecture:** App owns state. Four small components render controlled inputs and expense rows. Pure helpers validate input and sum integer paise.

**Tech Stack:** React, Vite, Vitest, Testing Library, Cypress.

**Spec:** ../specs/2026-10-30-expense-tracker-design.md

## Global constraints
No code comments. Four categories: Food, Travel, Bills, Other. Reject amounts above 100000. Total and count follow the category filter. No unapproved dependencies.

## Review focus
Whitespace titles, non-finite amounts, exact upper boundary, decimal rounding, deleting a filtered row without losing hidden rows.

## Tasks
- [x] Configure Vitest, DOM setup and Cypress; add scripts and ignores.
- [x] Write validation and total tests in src/expenses.test.js. Verify failures, implement validateExpense(title, amount, category) and calculateTotal(expenses) in src/expenses.js. Separately demonstrate the upper-limit test failing before adding its check.
- [x] Write src/App.test.jsx for adding, empty and invalid inputs, count, totals, filtering, deletion and form reset. Run against the starter, then implement App and components with state in App.
- [x] Add plain responsive CSS, page title and README component descriptions.
- [x] Add Cypress journey, invalid-input and delete specs. Run against Vite on port 5173.
- [x] Temporarily break validation, filtering, total and deletion; verify tests fail and restore code. Verify the Cypress delete spec catches broken deletion.
- [x] Add AGENTS.md, prompts.md and a truthful submission checklist. Run lint, tests with coverage and production build. Review the diff.

## Execution record
User approved the simple design and test dependencies. Existing folder had no Git history. Starter saved locally and work moved to assignment/expense-tracker. No GitHub remote or gh command available. Local work cannot substitute for reviewed GitHub PRs. Shell is read-only by default, so file changes and test runs request escalation.


## Progress
- Validation and App tests failed against placeholders and the starter before implementation.
- Upper-limit test failed before the limit check was added.
- Initial 28 tests and four Cypress checks passed.
- Independent review confirmed fractional-paise rounding could store a zero-value expense. Added failing regression tests, then rejected precision over two places and nondecimal notation. All 34 tests passed.
- Each deliberate mutation of validation, category filtering, total and deletion was caught. Source restored after every run. Evidence: docs/mutation-results.json.
- Ruling: use Node 20-compatible major versions of Vitest, Cypress and jsdom; current latest Vitest and Cypress require Node 22. No extra runtime dependency needed.
- Ruling: keep the local implementation on its assignment branch; actual reviewed GitHub PR history cannot be created without an account, remote and reviewer. Disclose instead of simulating it.

- Final verification: lint, build, all 34 Vitest tests with coverage and all four Cypress tests passed. Deliberate Cypress deletion mutation was caught. Desktop and phone screenshots inspected. Full results are in docs/verification.md.
- Local implementation complete. GitHub approvals and student-specific exercises remain explicitly outstanding in docs/submission-checklist.md. Work preserved on assignment/expense-tracker without creating further commits under a placeholder identity.
