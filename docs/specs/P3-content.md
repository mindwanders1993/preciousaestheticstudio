# Spec: P3 - Content: Roshni's menu, prices and studio facts

- **Phase**: 3 (docs/01 §5)
- **Status**: Approved (11 Oct 2026)
- **Goal**: The site shows the treatments and prices Roshni Verma gave, under her names, with nothing
  contradicting them — ready to show her as a first preview.
- **Branch**: `content/menu-and-prices`

What the owner gave on 11 Oct 2026: the client is Roshni Verma, owner of Precious Aesthetic Studio, Varanasi;
two lists (names, and names with prices); nobody pays on the site; her details, the city and the Instagram
account are taken from the Aura Blush site for now; WhatsApp, email and her real Instagram come later.

## 1. The menu

Twelve treatments. Titles are hers; spelling slips in the lists ("grass", "class", "Microblanding",
"Vitilligo") are corrected.

| File in `src/content/treatments/` | Title | Family | Price | From |
|---|---|---|---|---|
| `lip-blush` | Lip Blushing (Semi-Permanent Tattooing) | Permanent Makeup | ₹5,000 | was ₹14,000 |
| `microblading` | Microblading | Permanent Makeup | ₹5,000 | was ₹12,000 |
| `microneedling` | Microneedling | Skin Renewal | ₹8,000 | was ₹3,500 |
| `glass-skin` | Korean Glass Treatment | Skin Renewal | ₹20,000 | was ₹3,000 |
| `ppet` — new | PPET Treatment | Skin Renewal | ₹7,500 | her list; **what it is, is not known** |
| `japanese-glow` — renamed from `japanese-brightening` | Japanese Glow Treatment | Tone & Pigment | ₹10,000 | was ₹3,200 |
| `skin-whitening` — new | Skin Whitening Treatment | Tone & Pigment | ₹15,000 | her list |
| `aura-whitening` — new | Aura Whitening Treatment | Tone & Pigment | Price on consultation | her names list; no price given |
| `under-eye` | Dark Under-Eye Treatment | Tone & Pigment | ₹5,000 per sitting | was ₹3,500 |
| `vitiligo` — new | Vitiligo Treatment | Tone & Pigment | ₹6,000 | her list |
| `laser-hair-removal` | Laser Hair Removal Treatment | Laser & Clinical | ₹25,000 full body | was "From ₹1,200" |
| `mole-removal` | Mole Removal Treatment | Laser & Clinical | ₹4,500 | was "From ₹2,000" |

Removed, because they are in neither list: `collagen-restore`, `pigmentation-correction`.

## 2. Files to create or modify

- `src/content/treatments/` — the twelve files of §1: eight edited (title, price, and any line the new name or
  price makes untrue), one renamed, four new, two deleted.
- **The four new pages are short on purpose.** Nothing is known about what Roshni does in them, so each holds
  her title, her price, a one-line description that makes no claim, and "confirmed at consultation" for
  sessions, downtime and results. Nothing about the procedure is invented (rule 6).
- `src/content/faqs/` — delete `whitening` (it says the studio does not do whitening), `pigment-laser` and
  `pigment-timeline` (written for the removed treatment); `payment` reworded so it says nothing unconfirmed
  about tax or cards.
- `src/layouts/Layout.astro` — the footer's sentence "We do not offer skin-lightening or fairness treatments"
  removed; the rest of the legal line stays.
- `src/data/site.ts` — `gstNote` no longer claims prices include 18% GST (not confirmed); `payments` says
  payment is taken at the studio; the unused `formEndpoint` and `formAccessKey` removed; the comments that
  call values placeholders updated.
- `src/data/categories.ts` — family copy only where it names a removed treatment. No colour changes.
- `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/treatments/index.astro` — any sentence or count
  that names a removed treatment or the old menu's size.
- `test/ci.test.js` — the page list: two slugs out, one renamed, four in (`shiken` rule 3).
- `public/images/` — `collagen-restore.jpg` and `pigmentation-correction.jpg` deleted;
  `japanese-brightening.jpg` renamed with its page. The four new pages have no picture and fall back to the
  drawn motif (`TreatmentArt.astro`) until phase 4.
- `.agents/skills/invariants/SKILL.md`, `AGENTS.md` — rule 2 rewritten (§4 below); the phase 3 grep retired.
- `.agents/skills/shiken/SKILL.md`, `docs/02-REBRAND-CHECKLIST.md` §9 — the second grep (the place and the
  people) removed: Roshni, Varanasi and the Instagram handle are hers and stay.
- `docs/03-OPEN-QUESTIONS.md` — what was answered, with dates; answer 1 corrected.
- `docs/04-FOR-ROSHNI.md` — new: the list she is asked to confirm when she sees the preview (§5 below).
- `README.md`, `docs/specs/P3-content.md`.

**Added during the build** (the same kind of edit, in files §2 did not name):
- `src/pages/contact.astro`, `src/pages/reviews.astro`, `src/content/faqs/short-stay.md`,
  `src/content/faqs/skin-combine.md` — a sentence each that named a removed or renamed treatment.
- `src/components/ScrollWorld.astro` — the first scene's "10 treatments" tag now counts the collection.
- `src/pages/about.astro` — the "Honest naming" line, which said the studio does not sell whitening, removed.
- `test/ci.test.js` — beyond the page list: the count is 12, and the check that the Japanese page *disclaims*
  whitening is replaced by one that fails if any treatment or FAQ *promises* fairer, lighter or whiter skin.
  This is the one check that was removed; rule 2 changed under it (§4).
- `.agents/skills/` — `muda`, `gemba`, `kensa`, `kura`, `hoshin`, `migration-bridge`: the lines that cited the
  old rule 2 or the retired second grep.
- `src/data/categories.ts` — not changed after all: its copy names no removed treatment.

Not in this spec: pictures (phase 4), the logo and the header's fit on a phone, search and agent readiness,
and the Vercel preview. Each gets its own spec after this one.

## 3. Site rules touched

- [x] **1 facts from `site.ts`** — new copy reads the name from it.
- [x] **2 whitening** — changed by this spec; see §4.
- [x] **3 medical wording** — the patch-test and dermatologist-clearance sentences on laser and mole removal
  are not edited. Whether the arrangement is real is question 1 for Roshni; the site is not public until she
  answers.
- [ ] 4 colour from `--cat` — not touched.
- [ ] 5 the flight — not touched; its scene copy names no treatment that is removed.
- [x] **6 nothing invented** — the reason the four new pages are short. The eight kept pages still carry the
  source's researched text on sessions, downtime and aftercare; that is flagged for her, not presented to her
  as fact.
- [ ] 7 secrets — not touched.

## 4. Decisions

- **"Whitening" stays in two treatment names** (Skin Whitening, Aura Whitening), as Roshni wrote them —
  instead of renaming them Brightening or Glow, because the owner gave these as the names (11 Oct 2026).
  Rule 2 becomes: *the word may appear in a treatment's name; no page promises fairer or lighter skin, shows a
  skin-tone before-and-after picture, or presents darker skin as a problem.* What was checked: India's
  advertising standards body has guidelines against the last two; no law banning the word itself was found.
- **The Japanese treatment is "Japanese Glow"** — instead of "Japanese Whitening" from the names list, because
  her priced list, sent later, calls it Glow. (11 Oct 2026)
- **"Vitiligo Treatment" is listed under her name with no description of a cure** — instead of leaving it
  off, because it is on both her lists. Leucoderma is on the schedule of the Drugs and Magic Remedies
  (Objectionable Advertisements) Act, which bars advertising a treatment for it; whether that reaches a studio
  procedure is a lawyer's question. It is question 2 for Roshni and must be settled before the site is public.
  (11 Oct 2026)
- **"PPET" and "Aura Whitening" are listed as given** — instead of guessing what they are (PRP was one guess)
  or leaving them off, because a wrong guess on a preview is worse than a short page she can correct.
  (11 Oct 2026)
- **Laser Hair Removal shows one price, ₹25,000 for the full body** — instead of keeping "From ₹1,200" per
  area, because the per-area prices were the source's estimates and hers is the only real figure.
  (11 Oct 2026)
- **No price says it includes tax** — instead of the source's "all prices include 18% GST", because she has
  not said so. (11 Oct 2026)

## 5. `docs/04-FOR-ROSHNI.md` — what she is asked

1. Laser and mole removal: is there a dermatologist who screens clients, and may they be named? Which laser?
2. Vitiligo: what the treatment is, and who performs it.
3. PPET: the full name and what it involves.
4. Skin Whitening and Aura Whitening: what each involves; the price of Aura Whitening.
5. Do the prices include GST?
6. For each of the eight older pages: are the session counts, durations and aftercare right for how she works?
7. Address, hours, phone, WhatsApp, email, her Instagram; her training and certificates.
8. Her own photographs of the room and of her work, with each client's permission.

## 6. Done when

- `/treatments` lists the twelve treatments of §1 with those titles and prices, grouped in four families.
- No page says the studio does not offer whitening.
- `git grep -niE 'collagen-restore|pigmentation-correction|japanese-brightening' -- src test public` prints
  nothing.
- `git diff main -- public/world/scrub-engine.js` is empty, and the medical sentences in `laser-hair-removal`
  and `mole-removal` are unchanged.

## 7. Verify

```bash
npm run check && npm run build && npm test
```
