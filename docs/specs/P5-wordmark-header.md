# Spec: P5 - Wordmark, header on a phone, favicon

- **Phase**: 5 (docs/01 §5), taken before phase 4 because it fixes a defect
- **Status**: Approved (11 Oct 2026)
- **Goal**: A visitor on a phone can see the whole header and reach the booking button, and the studio's mark
  is its full name — with no emblem built on the letter P.
- **Branch**: `fix/header-wordmark`

## The defect

Seen on 11 Oct 2026 in a 375 px frame (`docs/reviews/shots/2026-10-11-header-375-before.png`): on every page
but the homepage, the logo "PRECIOUS AESTHETIC" fills the header, the theme toggle is cut in half and the
**Book Appointment button is off the screen**. The header's three items cannot wrap or shrink, and there is no
rule for narrow screens. The longer name made it worse; the source's shorter name was already tight.

## 1. Files to create or modify

- `src/layouts/Layout.astro`
  - **The wordmark**, in the header and the footer: two lines — the first word of `site.legalName` large in the
    display face, the rest ("AESTHETIC STUDIO") small, tracked, in the body face. Both read from `site.ts`.
  - **Below 480 px**: the button reads "Book" (the full label stays for screen readers), and the header's side
    padding and gaps tighten. Nothing is hidden.
  - The favicon link, if the file name changes.
- `public/favicon.svg`, `public/favicon.ico` — the Astro starter's rocket replaced by a small abstract mark: a
  faceted gem in the site's rose accent. No letter.
- `src/components/ScrollWorld.astro` — **not changed after all.** The full name in the flight's own header wrapped
  onto three lines on a phone; the engine draws that header and is not edited (rule 5), so it keeps `site.name`.
- `docs/reviews/shots/` — the before picture, and after pictures at 375 px (light and dark), 920 px and 1280 px.
- `docs/specs/P5-wordmark-header.md`.

## 2. Site rules touched

- [x] **1 facts from `site.ts`** — the wordmark is built from `site.legalName`; no name is typed.
- [x] **4 colour from `--cat`** — the favicon uses the brand accent, which is a token in `global.css`, not a
  family colour.
- [x] **5 the flight** — one string passed to the engine changes; `scrub-engine.js` is not edited.
- [ ] 2, 3, 6, 7 — not touched.

## 3. Decisions

- **A wordmark of the full name, in two lines** — instead of a monogram or an emblem, because the owner's rule
  is that the logo must not put the focus on the letter P, and two lines are what make the full name fit a
  phone. (11 Oct 2026)
- **Built in the page's own type, not drawn as a picture** — instead of a logo file from a design tool, because
  it stays sharp at any size, follows the light and dark themes, and renames with `site.ts`. A designed logo
  from Adobe Express or Gemini can replace it later with a one-component change. (11 Oct 2026)
- **The first word is split off by code** (`legalName` up to its first space) — instead of a new `site.ts`
  field for each line, because a field with one reader was already turned down in phase 2. (11 Oct 2026)
- **The favicon is a gem, not a letter** — instead of "P" or "PA", for the same rule, and because a gem is what
  the name means. It is a placeholder for a designed mark. (11 Oct 2026)
- **"Book" below 480 px** — instead of hiding the button behind a menu, because booking is the one action the
  site exists for. (11 Oct 2026)

## 4. Done when

- In a 375 px frame, on `/treatments` and `/contact`: the wordmark, the theme toggle and the Book button are
  all fully visible in one row, and the page does not scroll sideways.
- At 768 and 1280 px the header is unchanged except for the wordmark, and the nav links do not collide with it.
- Light and dark themes both checked.
- The browser tab shows the gem.

## 5. Verify

```bash
npm run check && npm run build && npm test
# then screenshots at 375, 768 and 1280 px, both themes, saved under docs/reviews/shots/
```

## 6. What was seen (11 Oct 2026)

Headless Chrome, dev server, pages in frames of the stated width.

| Width | Theme | Pages | Result |
|---|---|---|---|
| 375 px | light, dark | `/treatments`, `/contact` | wordmark, toggle and Book button in one row, nothing cut |
| 375 px | light, dark | `/` | the flight's own header, unchanged |
| 768 px | light | `/treatments` | as 375 px, with the full button label |
| 920 px | dark | `/about` | nav links sit between the wordmark and the button with room to spare |
| 1280 px | light | `/treatments` | as before, with the new wordmark |

Not checked: a real phone, Safari, and the footer's wordmark at each width.

Found and left alone: the theme is remembered under the browser-storage key `aura-theme`. It is invisible to
visitors and the rebrand grep does not match it; renaming it would reset every visitor's saved theme once.
