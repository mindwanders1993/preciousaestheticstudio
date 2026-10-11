---
name: migration-bridge
description: The clone bridge from the Aura Blush site to Precious Aesthetic Studio. Says what is carried across unchanged, what is never carried, and the order - copy, prove the copy, then rename - so that the code arrives whole and nothing of the other studio arrives with it.
user-invocable: false
---

# 🌉 `migration-bridge` — The clone bridge

> **Objective**: Bring the site from `~/Desktop/Projects/aurablush` into this project **working exactly as it
> does there**, then remove every trace of the studio it was written for.

> ### 🔒 The source's code is the starting contract
> The clone does what the source does. Layout, components, the booking route and the flight are carried as
> they are. What changes is whose studio the site describes. New features are not part of the clone.

---

## 🧭 Source & Target

| | |
|---|---|
| Source | `~/Desktop/Projects/aurablush`, at one named commit (`docs/01-CLONE-PLAN.md` §2) |
| Target | this project's root |
| The copy command | `docs/01-CLONE-PLAN.md` §4 — use it as written; do not improvise the exclusions |
| Where the source names itself | `docs/02-REBRAND-CHECKLIST.md` — every file and line |

---

## ✅ What is carried across unchanged

`src/` · `public/` · `test/` · `world/` (prompts and scripts) · `.github/` · `.vscode/` · `AGENTS.md` and the
`CLAUDE.md` link · `package.json`, `package-lock.json`, `tsconfig.json` · `astro.config.mjs`, `vercel.json`,
`.env.example`, `.gitignore` · `DEPLOY.md`, `HANDOFF-FOUNDER.md`, `IMAGE-BRIEF.md`, `PORTRAIT-BRIEF.md`.

## 🚫 What is NEVER carried across

1. **`.git/`** — this project starts its own history; the first commit names the source's hash.
2. **`.vercel/` and `.env.local`** — they belong to the other studio's deployment and booking chat (rule 7).
3. **`.agents/` and `.githooks/`** — this project has its own skills and hooks; the source's seven skills
   are replaced, not merged.
4. **`node_modules/`, `dist/`, `.astro/`** — rebuilt here.
5. **`kaiga/`, `world/renders/`, `world/frames/`** — a nested skill checkout and working media.
6. **`README.md`** — the source's is starter text; this project's own stays.
7. **The other name and its deployment** — the name Aura Blush, its domain and its booking chat. The founder,
   the city and the Instagram account are the owner's own and stay (11 Oct 2026); pictures are replaced in
   phase 4.
8. **The source's stale statements** — `docs/01-CLONE-PLAN.md` §10 lists where its documents disagree with
   its code. They are corrected here, not copied as facts.

---

## 🛠️ The order

1. **Name the commit.** The source's uncommitted rename is committed there first (open question 3), so the
   clone can be traced to one hash.
2. **Copy** with the command of plan §4, into this folder. Nothing already here is overwritten: check with
   `--dry-run` first that no line names `.agents/`, `.githooks/`, `.claude/`, `docs/` or `README.md`.
3. **Prove the copy before any edit.** `npm ci`, then `npm run check`, `npm run build`, `npm test`. All three
   green on untouched code is the proof the copy is whole. A failure here is a copy problem, not a code one.
4. **One commit**, on the branch `chore/scaffold-from-aurablush`: `chore: scaffold from aurablush@<hash>` —
   through `kura`, and to `main` by pull request.
5. **Rename, then content, then pictures** — phases 2 to 4, each closed by its grep in checklist §9.

---

## Stop conditions

- The three gates are not green on the untouched copy → stop; find what the copy missed. Do not edit to fix it.
- A file in this project would be overwritten by the copy → stop and correct the exclusions.
- Removing the other studio's wording would leave a medical or legal statement unbacked (rules 2, 3) → stop
  and ask; the treatment goes or the arrangement is confirmed. The wording is not softened.
- A fact is needed that the studio has not given (`docs/03-OPEN-QUESTIONS.md`) → leave it blank and say so;
  never keep the source's value as a stand-in.
