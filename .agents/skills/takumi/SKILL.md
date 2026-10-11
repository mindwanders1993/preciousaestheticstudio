---
name: takumi
description: Takumi (匠) — the build loop for the Precious Aesthetic Studio website. Makes the approved spec's changes surgically, runs astro check, the build and the test after each round, checks the seven site rules, and stops when confused instead of guessing. Activate on "takumi", "build it", or once a hoshin spec is approved.
---

# 🔨 `takumi` — Takumi (匠) — the build loop

> **Objective**: Make the approved change, and only that change, and prove it at every round.

---

## ⚡ The Inner Engineering Loop

```
1. Edit Surgical Code ──▶ 2. Check ──▶ 3. Build ──▶ 4. Test ──▶ 5. Reflect
```

```bash
npm run check    # types and content schemas — the fast one; run it after every edit
npm run build    # the site
npm test         # test/ci.test.js — every expected page is in dist/ (needs the build first)
```

- **Red** → read the message, find the root cause, fix the component, content or style, run again.
- **Green** → the site-rule checkpoints below, then report.

---

## 🚫 The "Stop When Confused" Gate
- If a type error, a schema error or a build failure survives **two consecutive repair attempts**, STOP.
- Do NOT guess a field name, loosen a schema to make content pass, or silence an error with `any` or
  `@ts-ignore`.
- Show the owner the exact diagnostic and the two fixes that were tried.

---

## 🎫 Building to the Spec

- **Stay inside the spec's file list** (`docs/specs/P<phase>-<slug>.md` §1). A change needed anywhere else is
  not made quietly: say which file and why, and wait — the spec is corrected first.
- **No git writes.** `git status`, `git diff` and `git log` only. Commits are `kura`'s.
- **Prove it.** Run the spec's Verify command after the last file change and show its output and exit code.
- **Clean up.** Remove any scratch file made along the way. Leave neighbouring code and copy as they were.
- **End with a short report**: what changed (one line per file), the verification run, each "Done when" line
  with what covers it, anything left open, and a proposed commit message (`type(scope): summary`).

---

## 🛡️ Site-Rule Checkpoints During Build
1. **Facts check** (rule 1): Did the studio's name, city or phone get typed into a page? Read it from `site.ts`.
2. **Claims check** (rule 2): Does any new copy promise fairer, whiter or lighter skin?
3. **Medical check** (rule 3): Are the patch-test and dermatologist-clearance sentences exactly as they were?
4. **Colour check** (rule 4): Did a category's hex value appear outside `src/data/categories.ts`?
5. **Flight check** (rule 5): Is `git diff public/world/scrub-engine.js` empty, and is `<ScrollWorld />` still
   first in `src/pages/index.astro`?
6. **Invention check** (rule 6): Is every new fact about the studio one the owner gave?
7. **Decision citation**: a branch, guard or constant that exists because of a decision — not because the
   code could work no other way — carries a one-line comment naming where the decision lives (the spec, a
   site rule, an answered question). A comment that restates the code is not a citation.
