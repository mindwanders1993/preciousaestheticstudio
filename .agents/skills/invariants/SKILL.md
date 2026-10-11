---
name: invariants
description: The seven site rules of the Precious Aesthetic Studio website - brand facts only from site.ts, no promise of fairer or lighter skin, medical wording kept as written, family colours only from --cat, the vendored flight engine, nothing invented about the studio, and secrets only from the environment.
user-invocable: false
---

# 🛡️ `invariants` — The seven site rules

> **Objective**: Keep the rules that came with the code, and the ones a second studio adds, from drifting.
> The other skills cite these by number (`rule 3`).

---

## 1. The studio's facts live in one file
- **Rule**: The name, legal name, city, address, phone, WhatsApp, email, hours, languages and payment methods
  are read from `src/data/site.ts`. No page, component, route or content file types them again.
- **Why**: the studio's name may still change; it must be a one-file change.
- **Approved**: `site.name`, `site.legalName`, `site.city` in a title, the logo, the footer, the booking message.
- **Rejected**: `"Treatments | Precious Aesthetic Studio"` typed into a page's frontmatter.

## 2. No promise of fairer or lighter skin
- **Rule** (changed 11 Oct 2026, `docs/specs/P3-content.md` §4): "Whitening" may appear in a treatment's
  **name**, as the owner gave it — *Skin Whitening Treatment*, *Aura Whitening Treatment*. No page, FAQ,
  description or alt text promises fairer, lighter or whiter skin; no picture shows a skin-tone
  before-and-after; darker skin is never presented as a problem.
- **Why**: India's advertising standards body (ASCI) has guidelines against the last two. No law banning the
  word itself was found, and the names are the owner's.
- `test/ci.test.js` holds the line: it fails if a treatment or FAQ file uses the promising words.
- **Vitiligo** is listed under the owner's name with no description of a cure. Leucoderma is on the schedule
  of the Drugs and Magic Remedies (Objectionable Advertisements) Act; the wording there is not expanded until
  the owner has said what the treatment is (`docs/04-FOR-ROSHNI.md`, question 2).

## 3. The medical wording is not marketing copy
- **Rule**: The patch test 24–48 hours before laser, and a dermatologist's written clearance before any
  pigmented lesion is removed, stay as written. A treatment with `medical: true` shows its screening notice.
- **If the arrangement is not real** (`docs/03-OPEN-QUESTIONS.md`, question 6), the treatment, its FAQs and
  its family go. The wording is never softened to fit a studio that has no screening.

## 4. A family's colour comes only from `--cat`
- **Rule**: `src/data/categories.ts` is the single source for category ids, labels, copy and colour.
  `Layout.astro` emits `--cat-<id>` once; an element with `data-cat="<id>"` styles against `--cat`.
- **Rejected**: a category's hex value in any `.astro` or `.css` file.

## 5. The homepage flight
- `public/world/scrub-engine.js` is vendored and is not edited or ported into a component.
- `<ScrollWorld />` is the first element on the homepage; whatever follows sits above it
  (`position: relative; z-index: 30`) on an opaque background.
- The legs' ids and their order are fixed: `world/` is keyed to them. Scene copy may change; the `brows` and
  `lips` legs go on describing brow and lip suites.

## 6. Nothing about the studio is invented
- **Rule**: No review, person, credential, certificate, picture of the room or of a client, and no price shown
  as confirmed, unless it is real and the studio gave it.
- The reviews collection stays empty, and its page says so, until real reviews arrive with each client's
  permission. Prices are in ₹ and are the owner's own figures (11 Oct 2026); the site does not say whether they
  include GST until she does.
- A fact that is not known yet is left blank in `site.ts` (blank fields do not render) — never filled with a
  plausible guess.
- **The founder, the city and the Instagram account are the owner's own** (Roshni Verma, Varanasi): they were
  carried from the Aura Blush site on her say-so and stay until she replaces them.

## 7. Secrets and the booking channel
- **Rule**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` and `DISCORD_WEBHOOK_URL` come only from the environment
  (`.env.local` on a laptop, the host's settings when deployed). Never in source, never committed, never read
  into a conversation.
- Booking requests go only to this studio's own chat. Until it has one, the form is not switched on.
