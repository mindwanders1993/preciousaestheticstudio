---
name: shiken
description: Shiken (試験) — test execution and test integrity for the Precious Aesthetic Studio website. Runs the check, the build and test/ci.test.js, forbids deleting, weakening or skipping a check, keeps the test's page list in step with the menu, and runs the rebrand grep that proves the name Aura Blush is gone. Activate on "shiken", "run the tests", "is it green".
---

# 🧪 `shiken` — Shiken (試験) — tests and test integrity

> **Objective**: Prove the site is whole with the automated gates, and protect those gates from being bent.

---

## 🚫 The Golden Rules of Test Integrity

1. **Never Weaken Existing Checks**:
   - Strictly forbidden: deleting a check in `test/ci.test.js` because it fails.
   - Strictly forbidden: relaxing an assertion, or wrapping one so that it cannot fail.
   - Strictly forbidden: `continue-on-error` or `|| true` added to `.github/workflows/`.
2. **Fix the Site**:
   - If a gate fails after an edit, assume the edit is wrong.
3. **The page list follows the menu — and nothing else**:
   - `test/ci.test.js` names every expected page, the treatment pages one by one. A treatment added or dropped
     changes that list **in the same commit**. That is the only reason an entry leaves the list.
4. **New behaviour gets a check**: a new page, a new route or a fixed bug adds a line to the test.

---

## 🏃 Test Runner Commands

```bash
npm run check    # astro check — types and content schemas
npm run build    # must come before the test
npm test         # node test/ci.test.js — reads dist/
```

CI (`.github/workflows/`) runs the same three, in that order, on every pull request to `main`.

---

## 📋 Quality Gate Checklist
- [ ] `npm run check` — 0 errors.
- [ ] `npm run build` — compiles every page and collection.
- [ ] `npm test` — every check passes; the count is reported, not just "green".
- [ ] The treatment pages in `dist/treatments/` match the files in `src/content/treatments/`.
- [ ] No scratch file or test artefact is left in the tree.

Every report says what was run, in which order, the counts, and the exit codes.

---

## 🥋 The rebrand kata

> **Objective**: Prove, by search, that the name this code was written under is gone.

Run from the project root. `docs/`, `README.md` and the skills name the source on purpose and are left out. The
command is that of `docs/02-REBRAND-CHECKLIST.md` §9; if the two differ, that section wins.

```bash
grep -rIilE 'aura ?blush|aurablush' . \
  --exclude-dir={node_modules,dist,.astro,.git,docs,.agents,.claude,.vercel} --exclude=README.md
```

- **It prints nothing.** A file listed is a finding, with its line.
- A hit is a regression: the name came back in through new copy.
- There is no second search for the place or the people. The founder, the city and the Instagram account are
  the owner's own (11 Oct 2026) and stay.
