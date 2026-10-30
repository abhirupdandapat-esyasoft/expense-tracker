# Expense tracker design

Approved in chat on 30 October 2026.

Build a small React tracker for the supplied assignment. Use a plain responsive page, normal labels and no code comments, as requested by the user.

## Approach
Keep the existing Vite and React project. Separate ExpenseForm, ExpenseList, ExpenseItem and CategoryFilter files. App owns expenses, form values, errors and the selected filter. A larger dashboard or backend would add unnecessary complexity.

## Behavior
Add a trimmed title, an amount greater than zero and no more than 100000, and Food, Travel, Bills or Other. Amounts must use ordinary decimal notation with at most two decimal places, so a positive amount cannot round down to zero. Invalid submissions show a useful message and add no row. Store money as integer paise to avoid rounding errors. Show visible expenses, their count and their total to two decimal places. Filter without losing other expenses; delete by unique ID. Data lasts for the current page session.

## Verification
Vitest and React Testing Library cover validation, totals, adding, filtering and deleting. Cypress covers the browser journey, invalid inputs and deletion using data-cy selectors. Verify the upper limit with a failing test before implementing it.

## Constraints and handoff
No new runtime dependencies. Approved development tools: Vitest, Testing Library, jsdom, coverage-v8 and Cypress. Explain component props and state in README instead of code comments. GitHub repository creation, approvals and branch protection require an account and reviewer; do not invent them. Human-written tests and a rejected agent action must be completed by the student.
