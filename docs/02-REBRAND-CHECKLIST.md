# Rebrand checklist — where Aura Blush is written into the source

Every line below was found by search in `~/Desktop/Projects/aurablush` on 10 Oct 2026 (commit `79e3acc`
plus its uncommitted rename). Line numbers are the source's; they hold until the first edit to a file.

Thirty-two files name the studio, its city, its locality or its founder. Fifteen of them are under `src/`.

## 1. Identity and configuration

- [ ] `package.json:2` — `"name": "aurablush"`
- [ ] `package-lock.json` — the same name, twice; let `npm install` rewrite it
- [ ] `astro.config.mjs:10` — `site: 'https://aurablush.in'` → the live domain (the sitemap is built from it)
- [ ] `src/data/site.ts:10–11` — `name`, `legalName`
- [ ] `src/styles/global.css:2` — the header comment

## 2. The name, typed into pages and components

Replace each with a value read from `site.ts`, not with the new name typed again (plan §5).

- [ ] `src/layouts/Layout.astro` — `:18` default title · `:80` the logo · `:104` footer heading · `:160` copyright
- [ ] `src/pages/index.astro` — `:48` title · `:56` the screen-reader heading · `:119` "The Aura Blush Standard"
- [ ] `src/pages/about.astro` — `:17` title · `:22` heading · `:34` picture's alt text · `:40` opening sentence
- [ ] `src/pages/artist.astro` — `:44` title · `:45` description · `:93` the founder's quote
- [ ] `src/pages/reviews.astro` — `:16` title · `:17` description · `:36` "Aura Blush is just opening…"
- [ ] `src/pages/contact.astro` — `:31` title · `:32` description
- [ ] `src/pages/treatments/index.astro:36` and `src/pages/treatments/[id].astro:37` — titles
- [ ] `src/components/ScrollWorld.astro` — `:28` eyebrow · `:122` the flight's brand mark
- [ ] `src/pages/api/contact.ts` — `:52` the Telegram message · `:95`, `:98`, `:107` the Discord message · `:122` the log line
- [ ] `src/content/team/founder.md:6` — the bio

## 3. Business facts and the place

**`src/data/site.ts`, field by field:**

- [ ] `city` (`:12`), `address` (`:19–27`) — the source's locality is Sigra; building and landmark are blank there
- [ ] `phone`, `whatsapp`, `email` — blank in the source; each shows on the site only once filled
- [ ] `hours` — Tuesday to Sunday 10:00–20:00, Monday closed
- [ ] `social.instagram` (`:44`) — the handle and link are the source founder's
- [ ] `languages` (`:47`) — "Hindi, English, Bhojpuri"
- [ ] `payments`, `gstNote`, `currency`
- [ ] `formEndpoint`, `formAccessKey` — unused; remove with their comment (plan §10)

**The city and locality, typed into copy:**

- [ ] `src/layouts/Layout.astro` — `:19` default description · `:105` footer line
- [ ] `src/pages/index.astro` — `:49` description · `:56`
- [ ] `src/pages/about.astro` — `:18`, `:25`, `:40` — the whole page is this studio's history and is rewritten
- [ ] `src/pages/artist.astro` — `:45`, `:93`
- [ ] `src/pages/contact.astro` — `:32` · `:58` "We're in Sigra…" · `:89` names the founder · `:101` "Visiting Varanasi?"
- [ ] `src/components/ScrollWorld.astro` — `:30` scene text · `:31` tags
- [ ] `src/pages/api/contact.ts:107`
- [ ] `src/content/treatments/pigmentation-correction.md:52` — the city's sun
- [ ] `src/content/treatments/laser-hair-removal.md:50`
- [ ] `src/content/faqs/short-stay.md:2` and `src/content/faqs/sun-varanasi.md:3` — and the second one's file name

## 4. Content collections

**Treatments** — ten files in `src/content/treatments/`. Prices in the source are estimates.

| File | Family | Source price | Keep? |
|---|---|---|---|
| `microblading` | Permanent Makeup | ₹12,000 | |
| `lip-blush` | Permanent Makeup | ₹14,000 | |
| `glass-skin` | Skin Renewal | ₹3,000 | |
| `microneedling` | Skin Renewal | ₹3,500 | |
| `collagen-restore` | Skin Renewal | ₹4,500 | |
| `japanese-brightening` | Tone & Pigment | ₹3,200 | |
| `pigmentation-correction` | Tone & Pigment | ₹3,000 | |
| `under-eye` | Tone & Pigment | ₹3,500 | |
| `laser-hair-removal` | Laser & Clinical | from ₹1,200 | question 6 |
| `mole-removal` | Laser & Clinical | from ₹2,000 | question 6 |

- [ ] Dropping a treatment also drops its page from `test/ci.test.js`, its picture, and its FAQs.
- [ ] Dropping both clinical treatments leaves the fourth family empty: remove `clinical` from
      `src/data/categories.ts`, and the dermatologist wording from the eleven files that carry it.

**FAQs** — seventeen files in `src/content/faqs/`, by the family each is filed under.

- [ ] General (6): `consultation`, `does-it-hurt`, `payment`, `pregnancy`, `short-stay`, `whitening`
- [ ] Permanent makeup (2): `how-long-brows`, `pmu-touchup`
- [ ] Skin (2): `skin-combine`, `skin-course`
- [ ] Pigment (3): `pigment-laser`, `pigment-timeline`, `sun-varanasi`
- [ ] Clinical (4): `indian-skin`, `laser-hair-colour`, `laser-patch-test`, `mole-clearance` — all four go
      if the clinical family goes; `indian-skin` is worth re-filing instead
- [ ] Written about the place: `short-stay` and `sun-varanasi` (§3)
- [ ] `whitening` stays whatever the menu; it is the legal line of plan §7

**Team** — `src/content/team/founder.md`: name, role, specialty, picture, bio. All of it is one person's.

**Reviews** — `src/content/reviews/` is empty and stays empty until there are real ones.

## 5. Pictures

Thirteen files in `public/images/`.

- [ ] `hero.jpg`, `studio.jpg`, `artist.jpg` — the source's own identity. Replace all three.
- [ ] Ten treatment pictures, one per slug, 1024×1024, from Pexels (free for commercial use). Legal to
      reuse; two studios showing the same ten pictures is the reason not to.
- [ ] `public/favicon.ico`, `public/favicon.svg`
- [ ] `IMAGE-BRIEF.md`, `PORTRAIT-BRIEF.md` — written for the source's pictures; re-brief.

The flight borrows `hero.jpg`, `studio.jpg` and several treatment pictures as its stills
(`src/components/ScrollWorld.astro`), so replacing them changes the homepage too.

## 6. The homepage flight

- [ ] `world/HANDOFF.md:1`, `world/encode.sh:3` — headings only, in phase 2.
- [ ] `world/` holds twenty-seven files: for each of the six scenes a leg prompt and a still prompt, each in
      a desktop and a phone version, plus the style preamble, the handoff and the encode script. The prompts
      are written for the source's rooms. They are rewritten **only if** question 10 says the clips will be
      rendered. The `brows` and `lips` legs must go on describing brow and lip suites.
- [ ] Rendered media is never committed (`.gitignore`), and `world/renders/` and `world/frames/` are not
      copied, so the clone starts with none.

## 7. Project scaffolding

- [ ] `AGENTS.md` — the "Business details" section names the city and a dermatologist; rewrite it for this
      studio and keep every rule. The treatment count and the family list follow the menu.
- [x] `.agents/skills/` — nothing to rename. The source's seven skills are not copied; this project's twelve
      (11 Oct 2026) were written for it. Where they name the source, they do so on purpose.
- [ ] `AGENTS.md` — after the clone, add a short section naming the twelve skills, the order they run in and
      `kura`'s git rules (the table in `README.md`), and drop the source's mention of its own skills.
- [ ] `DEPLOY.md` — `:36` the domain, and the two stale statements of plan §10.
- [ ] `HANDOFF-FOUNDER.md` — an intake written for the source's founder. Rewrite it as this studio's; its
      questions feed `03-OPEN-QUESTIONS.md`.
- [ ] `test/ci.test.js` — the list of expected pages names the ten treatment slugs.
- [ ] `.env.example` — lists `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`; the route also reads
      `DISCORD_WEBHOOK_URL`. This studio needs its own values for each it uses.

## 8. The look — only if question 9 asks for a different one

- [ ] `src/styles/global.css` — colour tokens `:8–18` (light; the accent is a rose, `#d47a82`) and from `:37`
      (dark)
- [ ] Type — `:20–21` Cormorant Garamond for display, Outfit for body; loaded in `src/layouts/Layout.astro:56`
- [ ] `src/data/categories.ts` — one accent pair per family: `:36–37` permanent makeup, `:46–47` skin,
      `:56–57` pigment, `:66–67` clinical. Nowhere else.

## 9. The check

Run from the project root. `docs/`, `README.md` and the skills (`.agents/`, `.claude/`) name the source on
purpose and are left out.

```bash
# after phase 2 — the name is gone
grep -rIilE 'aura ?blush|aurablush' . \
  --exclude-dir={node_modules,dist,.astro,.git,docs,.agents,.claude} --exclude=README.md

# after phase 3 — the place and the people are gone too
grep -rIilE 'aura ?blush|aurablush|varanasi|sigra|roshni|1leeja10|bhojpuri' . \
  --exclude-dir={node_modules,dist,.astro,.git,docs,.agents,.claude} --exclude=README.md
```

Both print nothing when the work is done.
