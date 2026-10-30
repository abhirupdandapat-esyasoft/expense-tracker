# Verification

Checked on 30 October 2026 using Windows and Node.js 24.13.1.

## Final checks

| Check | Result |
| --- | --- |
| npm run lint | Passed, no reported errors |
| npm run build | Passed |
| npm run test:coverage | 34 tests passed across two files |
| V8 coverage | 100% statements, branches, functions and lines for the six included application files |
| npm run cy:run | Four tests passed across three specs with Cypress 15.21.1 |
| git diff --check | Passed |
| npm install audit | Zero reported vulnerabilities |
| Node 20.19 compatibility | All installed packages' declared Node engine ranges accept 20.19.0; runtime tests here used Node 24 |

Coverage excludes the bootstrap file and test setup. It does not prove every possible input has been tested.

## Tests that catch real failures

Validation and total tests failed against the initial placeholders. App tests failed against the Vite starter. The upper-limit test failed before the 100000 limit was implemented.

A review found that 0.001 could be stored as zero paise. New helper and App tests failed before the fix. Validation now rejects fractions smaller than a paise and nondecimal currency notation, while accepting .50.

Temporarily removed amount validation, disabled filtering, subtracted rather than added totals, and disabled deletion. The relevant unit or component tests failed in every case. Restored every file after its check. See mutation-results.json.

Disabled deletion and ran the Cypress delete spec. It failed because two rows remained when one was expected. Restored deletion and ran the full browser suite successfully. See cypress-mutation.json and cypress-results.json.

## Browser and visual checks

The browser journey adds Lunch for 250 and Cab for 400, checks the 650.00 total and count, filters to Food and checks the remaining row, count and 250.00 total, then restores All. The invalid-input spec rejects an empty title and a negative amount. The delete spec removes one row and then the last row, checking totals and counts.

Inspected Cypress screenshots at desktop width 1100 and phone width 375. Form fields, filters, summary, rows and delete buttons are readable, with the layout stacked on the phone. Screenshots are generated locally under cypress/screenshots/expenses.cy.js and ignored by Git.

Cypress initially failed before opening its browser because the IDE environment set ELECTRON_RUN_AS_NODE=1. Removing that variable only from the test process fixed startup. No system environment settings were changed.

## Review and repository status

An independent agent reviewed the implementation and tests. Its fractional-paise finding was reproduced, fixed and covered by regression tests; no further blocking concerns were reported. This review is not a human GitHub PR approval.

The starter is committed on main. Implementation files remain in the working tree on assignment/expense-tracker. No remote was configured and no PR or merge was performed. The student-specific workflow steps are listed in submission-checklist.md.
