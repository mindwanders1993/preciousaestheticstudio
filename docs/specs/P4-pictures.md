# Spec: P4 - Pictures: a copyright check, three new pictures, and no borrowed results

- **Phase**: 4 (docs/01 §5)
- **Status**: Built at the owner's request (11–12 Oct 2026: "check the copyright … search for similar pictures
  … do that for her"); the commit and the pull request are the approval gate
- **Goal**: Every picture on the site is one the studio may use, its origin is written down, and none is
  presented as Roshni's own work.
- **Branch**: `chore/prepare-client-preview` (second commit)

## 1. The check on Roshni's ten pictures

Each of the ten is a search-engine image result — another studio's client, a clinic's promotional frame, or
agency stock on someone else's page. **None can be used.** The table, picture by picture, is in
`docs/IMAGE-SOURCES.md`. Three of them are before-and-after comparisons of skin tone, which the site does not
show whatever their source (rule 2).

They did settle one open point: the ten pictures follow her ten treatment names in order, so they show what
she means by each name.

## 2. What was done instead

The site's existing pictures turned out to be one generated set — Indian subjects, one room, one palette —
made from `IMAGE-BRIEF.md` for the earlier draft. Eight of Roshni's ten treatments already had a picture in
that set, close in subject to her examples. The gap was the new pages.

- **Three pictures generated in the same house style**, with the owner's Gemini subscription through the
  Antigravity CLI: `skin-whitening.jpg`, `aura-whitening.jpg`, `vitiligo.jpg`. Their prompts are rows 11–13 of
  `IMAGE-BRIEF.md`. Four generations were run; the first Vitiligo picture drew a ring over a glove and was
  replaced.
- **`PPET Treatment` keeps the drawn motif.** What the treatment is, is not known, and a picture would show a
  procedure.
- **`docs/IMAGE-SOURCES.md`** — where every picture comes from, the ten that were turned down, and how to add
  one. Two tests: every picture a treatment names exists, and every file in `public/images/` has a row.

## 3. Two things found and corrected

- **The Artist page had a "Signature Portfolio".** It showed two of the generated pictures captioned "Healed
  nano brows" and "Healed lip blush" — illustrations presented as her results. The section is removed until
  there are photographs of her own work, shown with each client's permission.
- **The About page's picture was described as "Inside Precious Aesthetic Studio".** It is a generated room.
  Its description now says what it shows.

And one line added to the footer of every page: *Pictures on this site are illustrative; they do not show the
studio's clients or their results.*

## 4. Files

New: `public/images/skin-whitening.jpg`, `aura-whitening.jpg`, `vitiligo.jpg`; `docs/IMAGE-SOURCES.md`.
Changed: the three treatments' files (`image:`), `src/pages/artist.astro`, `src/pages/about.astro`,
`src/layouts/Layout.astro` (footer), `test/ci.test.js`, `IMAGE-BRIEF.md`, `AGENTS.md`, `docs/04-FOR-ROSHNI.md`,
`README.md`; screenshots under `docs/reviews/shots/`.

## 5. Site rules

- [x] **2 no promise of lighter skin** — none of the three pictures shows a before and an after or a change of
  skin tone. The Skin Whitening picture shows a cream mask being applied, as her example does.
- [x] **6 nothing invented** — the reason for §3. The room pictures remain generated, and the footer now says
  pictures are illustrative; they are replaced when there are real ones.
- [x] **5 the flight** — untouched; it still borrows `hero.jpg`, `studio.jpg` and three treatment pictures.
- [ ] 1, 3, 4, 7 — not touched.

## 6. Decisions

- **Generated in the site's own style** — instead of the search for free stock that was asked for, because the
  existing pictures are a generated set and stock beside them would not match; because the brief itself records
  that stock "skews pale and Western"; and because a real model's face beside "Vitiligo" or "Whitening" raises
  questions a generated picture does not. The stock route stays open if the owner prefers it. (12 Oct 2026)
- **The Vitiligo picture shows a consultation, hands only** — instead of a face or a before-and-after like her
  example, because the page claims no cure and the picture should not either. (12 Oct 2026)
- **The portfolio is removed, not relabelled** — instead of keeping the two pictures under a softer caption,
  because any caption under "Portfolio" on the artist's page reads as her work. (12 Oct 2026)
- **A footer line rather than a caption on each picture** — because the pictures appear on cards, pages and
  the homepage flight, and one line on every page covers them all. (12 Oct 2026)

## 7. What was seen (12 Oct 2026)

Headless Chrome on the dev server; pictures in `docs/reviews/shots/`.

| What | Width | Result |
|---|---|---|
| The Tone & Pigment cards on `/treatments` | 1280 px | the two new pictures sit beside the Japanese Glow picture and match it |
| The three treatment pages | 375 px | each shows its picture; page width 375 px |
| The Artist page | 1280 px | ends with the booking buttons; no portfolio; the footer follows |
| The footer | 375 px, 1280 px | the illustrative-pictures line is there; the two-line wordmark sits correctly |

Not checked: dark theme on these pages, a real phone, and whether the earlier pictures are in fact generated —
that is the developer's to confirm (`docs/IMAGE-SOURCES.md`).

## 8. Verify

```bash
npm run check && npm run build && npm test     # 38 checks
```
