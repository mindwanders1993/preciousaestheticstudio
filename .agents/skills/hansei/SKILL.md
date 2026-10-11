---
name: hansei
description: Hansei (反省) — honest reflection at the end of a phase of the Precious Aesthetic Studio website, or whenever the owner says "hansei", "kaizen check", "what went wrong", "are we looping". Reads what actually happened - git, the review, the UAT report - and proposes at most three changes to how the work is done. Proposes; never applies a change without the owner's yes.
---

# 🪞 `hansei` — Hansei (反省) Reflection

> **Objective**: After each phase, find what cost time or went wrong twice, and change at most three things.
> Kaizen is small, continuous improvement — not a redesign.

## When

- At the end of every phase of `docs/01-CLONE-PLAN.md` §5, after its PR is merged and before the next is
  planned.
- Whenever the owner asks: "hansei", "kaizen check", "are we going in a loop?".

## What to read — facts, not memory

1. `git log` for the phase: how many commits, how many of them fixes to an earlier commit of the same phase.
2. The phase's spec against what was built — which "Done when" lines needed a second attempt.
3. The review file, `docs/reviews/P<phase>-REVIEW.md` — findings by round. Did the second look find anything?
4. The UAT report — what failed on the real site that the gates had passed.
5. `docs/03-OPEN-QUESTIONS.md` — which unanswered question the phase had to stop for, and for how long.
6. GitHub, not local refs: open PRs, the last CI runs, any check that cannot fail
   (`grep -rn "continue-on-error\|[|][|] true" .github/workflows`).

## What to answer — one screen

1. **What went well** — one or two lines, so it is kept.
2. **What went wrong twice** — only things seen at least twice, each with its evidence (a commit, a finding,
   a count).
3. **At most three changes**, each one line: what to change, in which file (`AGENTS.md`, a skill, a hook, the
   test), and what it removes. A rule that must always hold becomes a hook or a check in `test/ci.test.js`,
   not another paragraph.
4. **What to stop doing** — a step, a document or a skill nobody used.

## Rules

- **Propose, never apply.** The owner says yes to each change; then it is one small commit of its own.
- **No new process unless it removes a manual step.** If a change adds a step, name the step it retires.
- **When a mistake repeats, the correction goes into `AGENTS.md`** — and its rules section stays under a page.
- **This is a small site.** If the answer to "what went wrong twice" is nothing, say so in one line and stop.
