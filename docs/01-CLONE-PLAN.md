# Clone plan — Aura Blush → Precious Aesthetic Studio

Written 10 Oct 2026 from a read of `~/Desktop/Projects/aurablush`. Nothing here has been run.

## 1. Goal

A separate repository for Precious Aesthetic Studio that starts as an exact copy of the Aura Blush site and
ends with no trace of Aura Blush in it: its own name, facts, menu, people, pictures, domain and booking
channel.

## 2. The source

| | |
|---|---|
| Path | `~/Desktop/Projects/aurablush` |
| Commit | `79e3acc` on `main`, 1 Sep 2026 |
| Uncommitted there | Five files, eleven lines: the scroll engine renamed from `lets-scroll` to `kaiga` (`.gitignore`, `AGENTS.md`, `public/world/scrub-engine.js`, `src/components/ScrollWorld.astro`, `world/encode.sh`) |
| Remote | `github.com/mindwanders1993/aurablush` |

**Commit the rename in aurablush first**, then clone from that commit. The installed skill is already called
`kaiga`, so the committed code is the stale half, and a clone taken from one commit hash can be checked
against it later. (Open question 3.)

What the source contains:

- **Pages** — home, about, artist, reviews, contact, a treatments index and one page per treatment.
- **Content collections** — ten treatments in four families, seventeen FAQs, one team member, and a reviews
  collection that is empty.
- **Two data modules** — `src/data/site.ts` (business facts) and `src/data/categories.ts` (the four
  families and their colours).
- **A booking route** — `src/pages/api/contact.ts`, a server route that sends each request to a Telegram
  chat and, optionally, a Discord webhook. The contact page posts to it.
- **The homepage flight** — the kaiga scroll engine, running on placeholder stills borrowed from
  `public/images/`. No clip has been rendered.
- **Project scaffolding** — `AGENTS.md` (with `CLAUDE.md` linked to it), seven agent skills, a CI workflow
  and a build check in `test/ci.test.js`. The seven skills are **not copied**: this project has its own
  twelve in `.agents/skills/`, adapted from HoppingCars on 11 Oct 2026 (see `README.md`).

## 3. Assumptions

Each is a default until `03-OPEN-QUESTIONS.md` says otherwise.

1. Precious is a second, separate studio — not Aura Blush renamed.
2. It is in India, so prices stay in ₹ including GST and the two legal rules of §7 still apply.
3. It starts with the same ten treatments and the same design; both are then edited.
4. The homepage flight is kept as it is, on stills.
5. It is hosted the same way: its own GitHub repository and its own Vercel project.

## 4. What is copied, and what is not

| Copied as it is | Left behind |
|---|---|
| `src/`, `public/`, `test/`, `world/` | `.git/` — the new project starts its own history |
| `.github/`, `.vscode/` | `node_modules/`, `dist/`, `.astro/` — rebuilt |
| `AGENTS.md` and the `CLAUDE.md` link | `.vercel/`, `.env.local` — belong to Aura Blush's deployment |
| `package.json`, `package-lock.json`, `tsconfig.json` | `kaiga/` — a nested clone of the skill, ignored by git |
| `astro.config.mjs`, `vercel.json`, `.env.example`, `.gitignore` | `.claude/settings.local.json` — local to that checkout |
| `DEPLOY.md`, `HANDOFF-FOUNDER.md`, `IMAGE-BRIEF.md`, `PORTRAIT-BRIEF.md` | `README.md` — the Astro starter text; this project's own stays |
| | `world/renders/`, `world/frames/` — working folders for the flight's media, ignored by git |
| | `.agents/` — the source's seven skills; this project's own set is already here and must not be overwritten |

Already in this folder, and not touched by the copy: `.agents/skills/`, `.claude/`, `.githooks/`, `docs/`,
`README.md`.

The copy, for reference:

```bash
rsync -a \
  --exclude /.git --exclude /node_modules --exclude /dist --exclude /.astro \
  --exclude /.vercel --exclude /.env.local --exclude /kaiga --exclude /.claude \
  --exclude /.agents --exclude /.githooks --exclude /docs \
  --exclude /world/renders --exclude /world/frames \
  --exclude /README.md --exclude .DS_Store \
  ~/Desktop/Projects/aurablush/ ~/Desktop/Projects/preciousaestheticstudio/
```

## 5. Phases

Each phase is one commit or a few, and none starts before the one above it is green.

| # | Phase | What happens | Done when |
|---|---|---|---|
| 0 | **Decide** | Questions 1–3 answered | the source commit is named |
| 1 | **Clone** | On a branch, `chore/scaffold-from-aurablush` (the repository and its first commit, the planning docs and skills, exist since 11 Oct 2026): the copy of §4; `npm ci`; one commit `chore: scaffold from aurablush@<hash>`; a pull request to `main` | `npm run check`, `npm run build` and `npm test` pass **before any edit** — proof the copy is whole |
| 2 | **Rename** | The name, the domain and every hard-coded brand string — checklist §1, §2 and §7 | the grep of checklist §9 finds no brand name; the three commands pass |
| 3 | **Content** | Business facts, the menu, the team, the FAQs, the place-specific copy — checklist §3, §4 | every page reads as this studio; the grep of §9 finds nothing at all; `test/ci.test.js` lists this menu's pages |
| 4 | **Pictures** | Hero, studio and portrait replaced; treatment pictures reviewed — checklist §5 | no picture of Aura Blush's studio or founder remains |
| 5 | **Look** | Palette, fonts, family colours — checklist §8. Only if question 9 asks for it | both colour schemes checked on a phone and a desktop |
| 6 | **Deploy** | A GitHub repository, a Vercel project, the booking channel's secrets, the domain, `site:` in `astro.config.mjs` | a booking sent from the live site arrives in the right chat |
| 7 | **Launch** | The list of §8 | the owner says so |

**In phase 2, point the pages at `site.ts` instead of typing the new name.** Fifteen files under `src/`
carry the name or the city as plain text — page titles such as `"Treatments | Aura Blush Studio"`, the logo,
the footer, the booking message. Replacing each with `site.name`, `site.legalName` or `site.city` makes the
brand a one-file change, which is what `site.ts` was written for.

## 6. Checks

```bash
npm run check    # types and content schemas
npm run build    # the site
npm test         # test/ci.test.js — every expected page exists in dist/
```

The test names the ten treatment pages one by one. Any change to the menu changes that list in the same
commit.

## 7. Rules that come with the code

These are in the source's `AGENTS.md` and stay true here:

- **No fairness, whitening or lightening claim anywhere.** It is restricted advertising in India. The
  `whitening` FAQ and the *Brightening* treatment's wording exist to hold that line.
- **The medical wording is not marketing copy.** The patch test before laser, and a dermatologist's written
  clearance before any pigmented lesion is removed, are stated on purpose. They stay as written, or the
  treatment goes (question 6).
- **A family's colour comes only from `--cat`**, emitted once from `categories.ts`.
- **`public/world/scrub-engine.js` is vendored and not edited.** The flight is the first element on the
  homepage; whatever follows sits above it on an opaque background.
- **The flight's leg ids and their order are fixed**; `world/` is keyed to them.

## 8. Before it goes live

- [ ] Real name, address, phone, WhatsApp and hours in `src/data/site.ts`.
- [ ] Every price confirmed — the source's are researched estimates.
- [ ] Laser and mole removal either backed by a real screening arrangement or removed.
- [ ] The founder's own name, credentials and portrait; nothing of Aura Blush's founder.
- [ ] The reviews page still empty unless real reviews, given with permission, are in.
- [ ] Booking requests go to this studio's chat, not Aura Blush's.
- [ ] `site:` matches the live domain, so the sitemap lists the right addresses.

## 9. Not in this plan

- A shared template or a monorepo for both studios. Two copies are cheaper than an abstraction; a third
  studio is when to look again.
- New features. The clone does what the source does.
- Rendering the flight's clips (question 10).

## 10. Where the source's own documents are out of date

Fix these in the clone; do not copy them as facts.

| Document | Says | The code says |
|---|---|---|
| `DEPLOY.md` | a static build with no API routes | `src/pages/api/contact.ts` is a server route and needs the adapter and two secrets |
| `DEPLOY.md` | remove the eight placeholder reviews | `src/content/reviews/` is already empty |
| `AGENTS.md` | a named consulting dermatologist is in the `team` collection | the collection holds the founder only; the arrangement is asserted in the copy of eleven files and nobody is named |
| `src/data/site.ts` | the booking form waits for a form service's key (`formEndpoint`, `formAccessKey`) | the contact page posts to `/api/contact` and reads neither |
