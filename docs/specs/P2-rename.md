# Spec: P2 - Rename to Precious Aesthetic Studio

- **Phase**: 2 (docs/01 §5)
- **Status**: Approved (11 Oct 2026)
- **Goal**: The site names Precious Aesthetic Studio and its own domain everywhere, and reads the name from
  one file, so a later rename is a one-file change.
- **Branch**: `chore/rename-to-site-ts`

Scope is the **name and the domain only** (checklist §1, §2, §7). The city, the locality, the founder, the
menu and the pictures are still the source's after this phase; they are phases 3 and 4 and wait on open
questions 4–8.

## 1. Files to create or modify

**Identity and configuration**
- `package.json` — `"name": "preciousaestheticstudio"`
- `package-lock.json` — rewritten by `npm install --package-lock-only`, not by hand
- `astro.config.mjs` — `site: 'https://preciousaestheticstudio.com'`
- `src/data/site.ts` — `name`, `legalName`
- `src/styles/global.css` — the header comment (line 2)

**The name, replaced by a value read from `site.ts`**
- `src/layouts/Layout.astro` — default title, logo, footer heading, copyright
- `src/pages/index.astro` — title, screen-reader heading, "The … Standard"
- `src/pages/about.astro` — title, heading, picture's alt text, opening sentence
- `src/pages/artist.astro` — title, description, the founder's quote
- `src/pages/reviews.astro` — title, description, "… is just opening"
- `src/pages/contact.astro` — title, description
- `src/pages/treatments/index.astro`, `src/pages/treatments/[id].astro` — titles
- `src/components/ScrollWorld.astro` — the first scene's eyebrow, the flight's brand mark
- `src/pages/api/contact.ts` — the Telegram message, the Discord message, the log line

Where the city is typed on a line that is being changed anyway, it becomes `site.city` in the same edit. The
locality ("Sigra") and any line that names only the place are left for phase 3.

**Where a module cannot be read**
- `src/content/team/founder.md` — the bio's last sentence loses the studio's name and city ("Founder of the
  studio."). The whole file is replaced in phase 3.
- `world/HANDOFF.md`, `world/encode.sh`, `IMAGE-BRIEF.md` — the name in the heading line
- `HANDOFF-FOUNDER.md` — the name in question 3

**Inherited documents (checklist §7, plan §10)**
- `DEPLOY.md` — the domain; and its two stale statements corrected: the site has a server route and needs the
  adapter and two secrets; the reviews folder is already empty
- `AGENTS.md` — a new section naming the twelve skills, their order and `kura`'s git rules; and the stale line
  that names a consulting dermatologist in the `team` collection corrected to what the code holds (the founder
  only, nobody named)

**This project's own documents**
- `README.md` — status and next step
- `docs/02-REBRAND-CHECKLIST.md` — §1, §2 and the finished lines of §7 ticked
- `docs/specs/P2-rename.md` — this file

## 2. Site rules touched

- [x] **1 facts from `site.ts`** — this phase is what makes the rule true for the name.
- [x] **2 no whitening claim** — no copy about treatments changes.
- [x] **3 medical wording** — no treatment or FAQ file is edited.
- [ ] 4 colour from `--cat` — not touched.
- [x] **5 the flight** — `ScrollWorld.astro` changes two strings only; `scrub-engine.js` is not edited, the
  legs' ids and order do not change. Checked with `git diff --stat public/world/scrub-engine.js` (empty).
- [x] **6 nothing invented** — only the name and the domain, both given by the owner, are written. The source's
  founder and place stay visible until phase 3; the site is not deployed.
- [x] **7 secrets** — `contact.ts` changes message text only; where it sends is untouched.

## 3. Decisions

- `site.name` is **"Precious Aesthetic"** and `site.legalName` is **"Precious Aesthetic Studio"** — instead of
  the short name "Precious", because the source pairs its names the same way ("Aura Blush" / "Aura Blush
  Studio"), so every sentence and heading keeps its shape, and "Precious" alone is a common word that reads
  oddly as a logo. (11 Oct 2026)
- The logo, the footer heading and the flight's brand mark show `site.name` in capitals, made by
  `.toUpperCase()` — instead of a third field `logoText`, because the source's mark is its short name in
  capitals and a new field would have one reader. (11 Oct 2026)
- The domain lives in `astro.config.mjs` only — instead of a `url` field in `site.ts`, because Astro reads it
  there and hands it to every page as `Astro.site`; a second copy could disagree with the first. (11 Oct 2026)
- Each page builds its own title, `` `Treatments | ${site.legalName}` `` — instead of having the layout add the
  suffix, because that would change the layout's interface during a rename. (11 Oct 2026)
- The founder's bio drops the studio's name — instead of typing the new name into a Markdown file, because
  content cannot read `site.ts` and rule 1 allows no second copy. (11 Oct 2026)

## 4. Done when

- The first grep of checklist §9 prints nothing.
- `git grep -n "Precious" -- src` lists `src/data/site.ts` and no other file.
- The logo reads PRECIOUS AESTHETIC and every page title ends "| Precious Aesthetic Studio".
- `dist/client/sitemap-0.xml` lists addresses under `https://preciousaestheticstudio.com`.
- `git diff --stat main -- public/world/scrub-engine.js src/content/treatments src/content/faqs` is empty.

## 5. Verify

```bash
npm run check && npm run build && npm test
grep -rIilE 'aura ?blush|aurablush' . \
  --exclude-dir={node_modules,dist,.astro,.git,docs,.agents,.claude,.vercel} --exclude=README.md
```
