---
name: kensa
description: Kensa (検査) — three-pass review for the Precious Aesthetic Studio website, run by a fresh session that fixes nothing. Reviews content and schema, the booking route and its secrets, and the seven site rules, and writes docs/reviews/P<phase>-REVIEW.md with a verdict. Activate on "kensa", "review this", "review phase <n>".
---

# 🔍 `kensa` — Kensa (検査) — the review

> **Objective**: Audit a change or a finished phase against the spec and the seven site rules, and write a
> committed `docs/reviews/P{{PHASE}}-REVIEW.md` before it reaches `main`.

---

## 👤 Who Reviews

- **A fresh session, never the author's.** The session that built the work does not review it. The reviewer
  reads and reports; it fixes nothing and runs no git write.
- **A phase is reviewed once, when its "Done when" is claimed** (`docs/01-CLONE-PLAN.md` §5). A small change
  between phases is reviewed against its own spec.
- **Findings go back to a build session.** After the fix, a second look at the fix diff only is added to the
  same file.

---

## 🔬 The 3-Pass Audit Protocol

```
Pass 1: Content & Schema ──▶ Pass 2: Booking Route & Secrets ──▶ Pass 3: Site Rules
```

### Pass 1: Content & Schema
- **Spec**: Is each "Done when" line met? Is anything dropped, or built that the spec did not ask for?
- **Schema**: Does every content file match `src/content.config.ts`, with no schema loosened to make it pass?
- **Page list**: Does `test/ci.test.js` list exactly the treatments in `src/content/treatments/`?
- **Links and pictures**: Does every internal link resolve, and every `image` name a file in `public/images/`?
- **Tests**: Was any check weakened, skipped or deleted (`shiken`)?
- **Decision citations**: Does every non-obvious branch or constant in the diff say which decision it comes
  from? One that a reader could only explain from the spec, with no citation beside it, is FLAGGED.

### Pass 2: Booking Route & Secrets
- **Where it lands**: Does `src/pages/api/contact.ts` send to this studio's chat and no other (rule 7)?
- **Secret safety**: Are the bot token, chat id and webhook read only from the environment? Is any of them,
  or `.env.local`, in the diff?
- **Input**: Is what the visitor typed validated and escaped before it is put into a message?
- **Failure**: Does the visitor get a clear answer when the request cannot be delivered?
- **`site:`** in `astro.config.mjs` matches the live domain, so the sitemap lists the right addresses.

### Pass 3: The 7 Site Rules
1. **Facts**: no name, city or contact detail typed outside `src/data/site.ts`.
2. **Claims**: no promise of fairer, lighter or whiter skin, and no skin-tone before-and-after picture.
3. **Medical**: the patch-test and dermatologist-clearance sentences unchanged; `medical: true` kept.
4. **Colour**: no category hex outside `src/data/categories.ts`.
5. **Flight**: `scrub-engine.js` unedited; `<ScrollWorld />` first; leg ids and order unchanged.
6. **Invention**: no review, person, credential, picture or confirmed price that the studio did not give.
7. **Secrets**: none in source; no trace of the other studio's deployment.

Run the rebrand kata (`shiken`) and paste its output.

---

## 📝 Generated Artifact: `docs/reviews/P{{PHASE}}-REVIEW.md`

```markdown
# Review Report: P{{PHASE}} - {{TITLE}}
- **Auditor**: kensa
- **Date**: {{DATE}}
- **Branch**: {{BRANCH}}

### Pass 1: Content & Schema: PASS | FLAGGED
### Pass 2: Booking Route & Secrets: PASS | FLAGGED
### Pass 3: Site Rules: PASS | FLAGGED

### Findings
- {{file:line — what is wrong — which rule or spec line}}

### Diff Summary:
- Files Changed: {{COUNT}}
- Additions: +{{LINES}} / Deletions: -{{LINES}}

### Verdict: APPROVED | CHANGES REQUIRED
```
