# Precious Aesthetic Studio — website

**Status: ready to be shown, not launched.** The site shows Roshni Verma's twelve treatments and prices, lists
every price on the homepage, keeps a booking button within reach on a phone, and describes itself to search
engines and AI agents. Until `launched` in `src/data/site.ts` is set to `true`, every page asks not to be
indexed. Pictures are generated illustrations (`docs/IMAGE-SOURCES.md`), several pages are short on purpose,
and nothing is deployed yet.

This project is a full clone of the Aura Blush site (`~/Desktop/Projects/aurablush`), rebranded and
re-contented for Precious Aesthetic Studio and served at `preciousaestheticstudio.com`.

| | |
|---|---|
| Source | `aurablush` at commit `5a2aef2` (11 Oct 2026) — see plan §2 |
| Stack | Astro 7, MDX, sitemap, the Vercel adapter, Node ≥ 22.12 |
| Planned on | 10 Oct 2026 |

## Planning docs

| Doc | What it holds |
|---|---|
| [`docs/01-CLONE-PLAN.md`](docs/01-CLONE-PLAN.md) | What is copied and what is left behind, the phases in order, and how each is checked |
| [`docs/02-REBRAND-CHECKLIST.md`](docs/02-REBRAND-CHECKLIST.md) | Every file and line in the source that names Aura Blush, its city or its founder |
| [`docs/03-OPEN-QUESTIONS.md`](docs/03-OPEN-QUESTIONS.md) | What has to be answered about the studio, and what is assumed until it is |
| [`docs/04-FOR-ROSHNI.md`](docs/04-FOR-ROSHNI.md) | What the owner is asked to confirm when she sees the preview |
| [`docs/IMAGE-SOURCES.md`](docs/IMAGE-SOURCES.md) | Where every picture comes from, and the ones that were turned down |
| [`docs/specs/`](docs/specs/) | One short spec per piece of work, approved before it is built |

## Skills

Twelve agent skills, adapted on 11 Oct 2026 from the HoppingCars project and rewritten for this site. They
live in `.agents/skills/`; `.claude/skills/` links to them.

The order of work: `hoshin → takumi → shiken → kensa → kura → gemba → hansei`, with `muda` and `dojo` when
needed.

| Skill | What it is for |
|---|---|
| `hoshin` | Plan: check the work against the phases and open questions, write a short spec, wait for approval |
| `takumi` | Build: surgical edits, then check, build and test; stop when confused |
| `shiken` | Test: run the gates, never weaken a check, and the greps that prove Aura Blush is gone |
| `kensa` | Review: a fresh session, three passes, a written verdict |
| `kura` | Git and GitHub: audit, then branch, commit, push and open the PR — each on the owner's yes |
| `gemba` | Acceptance: walk the running site on a phone, a tablet and a desktop; a dated UAT report |
| `hansei` | Reflect after a phase: at most three changes, proposed and never applied |
| `muda` | Sweep for leftovers, unused fields, orphan pictures, hard-coded colours |
| `dojo` | The local environment: the dev server and the booking route's settings |
| `invariants` | Guardrail — the seven site rules the other skills cite |
| `contracts-first` | Guardrail — schema and data modules before pages |
| `migration-bridge` | Guardrail — what the clone carries and what it never carries |

Git rules (`kura`): the owner approves each branch, commit and PR · no AI attribution · `main` moves only by
pull request · paths are staged by name. `.claude/settings.json` and `.githooks/commit-msg` enforce the
second and third; the hook is switched on per checkout with `git config core.hooksPath .githooks` (git does not carry that
setting).

## Next step

A Vercel deployment to show Roshni (`DEPLOY.md`), a Telegram bot and chat for booking requests, then her
answers to `docs/04-FOR-ROSHNI.md`.

```bash
npm ci
npm run check && npm run build && npm test
```
