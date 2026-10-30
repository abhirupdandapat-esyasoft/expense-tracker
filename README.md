# Expense Tracker

A small React app for adding and checking everyday expenses.

## Run it

Use Node.js 20.19+ or a newer supported version.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. On Windows PowerShell, use `npm.cmd` if `npm` is blocked by the execution policy.

## What it does

Add a title, amount and category: Food, Travel, Bills or Other. Use ordinary decimal amounts with up to two decimal places. Blank titles, invalid amounts and amounts above 100000 are rejected. Filter expenses by category or delete a row. The count and total show the currently displayed expenses. Totals use two decimal places. Expenses stay in memory and reset when the page reloads.

## Components

| Component | Props and state |
| --- | --- |
| App | Owns expenses, form fields, validation error and selected category. Handles adding, deleting and filtering. |
| ExpenseForm | Receives form, error, onChange and onSubmit. Renders the controlled fields and error message. No local state. |
| ExpenseList | Receives expenses and onDelete. Renders the empty state or list. No local state. |
| ExpenseItem | Receives expense and onDelete. Displays a row and calls onDelete with its ID. No local state. |
| CategoryFilter | Receives value and onChange. Renders the category selector. No local state. |

Amounts are stored as integer paise and converted to rupees for display. This keeps sums such as 0.10 + 0.20 accurate.

## Checks

```sh
npm test -- --run
npm run test:coverage
npm run lint
npm run build
```

For browser tests, keep the app running in another terminal:

```sh
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
npm run cy:run
```

`npm run cy:open` opens the interactive Cypress runner. The specs cover adding, filtering, invalid inputs and deletion.

## Assignment files

- prompts.md contains six reusable prompt templates and the five-part add-expense prompt.
- AGENTS.md describes project conventions and commands.
- docs/submission-checklist.md separates the local work from the GitHub and student review steps.
- docs/verification.md records actual verification results.

The user's request to omit comments takes precedence over the PDF's request for component comments. Component explanations are in the table above instead.

If Cypress reports `bad option: --smoke-test` inside an Electron-based IDE, check whether `ELECTRON_RUN_AS_NODE` is inherited. In the terminal running Cypress, use `Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue` before the Cypress command. This changes only that terminal session.
