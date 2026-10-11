---
name: invariants
description: The seven site rules of the Precious Aesthetic Studio website - brand facts only from site.ts, no fairness or whitening claims, medical wording kept as written, family colours only from --cat, the vendored flight engine, nothing invented about the studio, and secrets only from the environment.
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

## 2. No fairness, whitening or lightening claim
- **Rule**: Nowhere on the site — copy, FAQ, picture alt text, page description — is skin promised to become
  fairer, whiter or lighter. It is restricted advertising in India.
- The Japanese treatment is named *Brightening*, and the `whitening` FAQ says plainly that whitening is not
  offered. Both exist to hold this line and stay whatever the menu becomes.

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
  permission. Prices are in ₹ including GST and are estimates until the owner confirms each one.
- A fact that is not known yet is left blank in `site.ts` (blank fields do not render) — never filled with a
  plausible guess, and never left as Aura Blush's.

## 7. Secrets and the booking channel
- **Rule**: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` and `DISCORD_WEBHOOK_URL` come only from the environment
  (`.env.local` on a laptop, the host's settings when deployed). Never in source, never committed, never read
  into a conversation.
- Booking requests go only to this studio's own chat. Until it has one, the form is not switched on.
