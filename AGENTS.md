# Project guide

This is a small expense tracker using React, Vite and JavaScript. Vitest and React Testing Library handle unit and component tests. Cypress handles browser tests.

## Layout
- src/App.jsx: application state and event handlers.
- src/components/: one component per file.
- src/expenses.js: categories, validation and total calculation.
- src/*.test.js and src/*.test.jsx: unit and component tests.
- cypress/e2e/: end-to-end specs.

## Commands
- npm install
- npm run dev
- npm test -- --run
- npm run test:coverage
- npm run lint
- npm run build
- npm run cy:run with the app running on http://localhost:5173

On Windows PowerShell, use npm.cmd if script execution is disabled.

## Conventions
Keep state in App. Use one component per file and simple function components. Store expense amounts as integer paise. Use data-cy attributes for Cypress. Do not add code comments; describe component props and state in README.

## Workflow
Ask before adding dependencies. Work on a feature branch, never directly on main. Commit before starting a new task. Write a short plan and get approval before coding. Keep each feature in a scoped branch and pull request. Review git diff, run the app, try edge cases and run the relevant tests before committing. Summarise behavior changes and verification in the PR. Do not claim human review or test authorship that did not happen.
