---
name: hoshin
description: Hōshin (方針) — planning for the Precious Aesthetic Studio website. Checks a piece of work against the phase table in docs/01-CLONE-PLAN.md and the open questions in docs/03-OPEN-QUESTIONS.md before any file is edited, applies the simplicity filter, and writes one short spec for the owner to approve. Activate on "hoshin", "plan this", "plan phase <n>", or before any feature, content or styling change.
---

# 📋 `hoshin` — Hōshin (方針) — planning and specification

> **Objective**: Write a short, approved spec before modifying anything under `src/`, `public/`, `test/` or
> `world/`.

---

## 🧭 Pre-Flight Authority Check

Before proposing any change, check it against the project's own documents:

1. **Phase check**: Which phase of [`docs/01-CLONE-PLAN.md`](../../../docs/01-CLONE-PLAN.md) §5 does this
   belong to? Is the phase above it green? No phase starts before the one above it passes its "Done when".
2. **Open-question check**: Does the work depend on a row of
   [`docs/03-OPEN-QUESTIONS.md`](../../../docs/03-OPEN-QUESTIONS.md) that has no answer? If the row has an
   "Until answered" default, plan on the default and say so. If it has none, the work waits for the owner —
   do not plan around a guess about the studio (rule 6).
3. **Checklist check**: For rename, content and picture work, the lines to change are already listed in
   [`docs/02-REBRAND-CHECKLIST.md`](../../../docs/02-REBRAND-CHECKLIST.md). Plan from that list.
4. **Out of scope** (plan §9): a shared template for two studios · new features during the clone · rendering
   the flight's clips unless question 10 says so.
5. **Every decision names the road not taken.** A decision in a spec, and every answer written under
   `docs/03-OPEN-QUESTIONS.md` → Answers, carries one clause: **"instead of X, because Y"**, with its date.
   The owner reads it months later without this conversation; the alternative is what makes it re-readable.

---

## 🧠 Karpathy Simplicity Filter
- What is the smallest set of files to touch?
- Can this be done with the existing schema, `site.ts` and `categories.ts`, without a new field?
- Reject speculative abstractions and anything the owner did not ask for.
- Touch only what is needed; leave neighbouring formatting and copy alone.

---

## 📝 Generated Artifact

One file: `docs/specs/P{{PHASE}}-{{SLUG}}.md`

```markdown
# Spec: P{{PHASE}} - {{TITLE}}
- **Phase**: {{PHASE}} (docs/01 §5)
- **Status**: Draft | Approved
- **Goal**: one sentence — what the visitor or the owner gets.
- **Branch**: feat/… | fix/… | content/… | style/… | chore/…

## 1. Files to create or modify
- `src/...`
(the exact list — `takumi` stays inside it and `kura` audits against it)

## 2. Site rules touched
- [ ] 1 facts from `site.ts`   - [ ] 2 no whitening claim   - [ ] 3 medical wording
- [ ] 4 colour from `--cat`    - [ ] 5 the flight           - [ ] 6 nothing invented
- [ ] 7 secrets and the booking channel
(tick the ones this work could break, and say how each is kept)

## 3. Decisions
- {{decision}} — instead of {{alternative}}, because {{reason}}. ({{date}})

## 4. Done when
- {{what is true when it is finished — one line each}}

## 5. Verify
`npm run check && npm run build && npm test`
(plus the grep of checklist §9 for phases 2 and 3)
```

A change of a line or two — a typo, one price the owner confirmed — needs no spec file: state the file, the
line and the verify command in the conversation and go to the gate.

---

## 🚦 Gate
Pause for the owner's approval:
`[1] Approve Spec ➔ Proceed to Build (takumi)  [2] Ideate / Refine  [3] Reject`
