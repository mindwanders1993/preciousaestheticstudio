---
name: gemba
description: Gemba (現場) — acceptance on the running Precious Aesthetic Studio website. Walks seven journeys - look and themes, navigation, the homepage flight, treatments, medical wording, a real booking, the footer - at phone, tablet and desktop widths, and writes a dated UAT report. Activate on "gemba", "UAT", "walk the site".
---

# 👀 `gemba` — Gemba (現場) — acceptance on the real site

> **Objective**: Go and see. Walk the running site as a visitor would, at the widths visitors use, and record
> what was seen — not what the code suggests.

---

## 🏃 Before the walk

```bash
npm run build && npm test        # walk a build that passes its gates
astro dev --background           # or `npm run preview` for the built site; see `dojo`
```

Read the studio's name, the family names and the treatment list from `src/data/site.ts`,
`src/data/categories.ts` and `src/content/treatments/` first — the journeys below check the site against
those, not against a list typed here.

Widths: **375 px** (phone), **768 px** (tablet), **1280 px** (desktop). Both themes. Most visitors are on a
phone: when time is short, the phone walk is the one that is not skipped.

---

## 🎭 The 7 Journeys

1. **J-01: Look and themes**
   - Toggle the theme on every page → every colour switches; no wrong-theme patch remains.
   - On `/treatments`, each family renders in its own colour; none bleeds into another (rule 4).
   - Display and body fonts load; no system-font fallback after loading.
   - Home, `/treatments`, a treatment page, `/artist`, `/about`, `/reviews`, `/contact` at all three widths:
     nothing overflows sideways, nothing overlaps, every tap target is reachable with a thumb.
2. **J-02: Navigation**
   - The logo shows the name from `site.ts` and returns to `/`.
   - Every header link lands on its page; the current page is marked.
   - The header's booking button goes to `/contact`.
   - On the homepage the header stays hidden during the flight and slides in after it.
3. **J-03: The homepage flight** (rule 5)
   - The flight is the first thing on the page, with no gap above it.
   - Scrolling moves through all six scenes in order; each shows its eyebrow, title, body and tags.
   - The last scene shows the booking button and the link to the menu.
   - The sections after the flight cover it completely.
   - On a real iPhone, or its simulator: the first scene shows at once and scrolling stays smooth.
4. **J-04: Treatments**
   - `/treatments` lists every treatment, grouped by family; the count matches the content folder.
   - Each card opens its page; price, sessions, downtime, `bestFor` and `notFor` all render.
   - Each price is in ₹ and says it includes GST.
5. **J-05: Medical wording** (rules 2, 3)
   - Every `medical: true` treatment shows the marker on its card and the screening notice on its page.
   - The patch-test and dermatologist-clearance sentences are present and not softened.
   - No page promises fairer, whiter or lighter skin; the `whitening` FAQ is shown.
6. **J-06: A booking, end to end** (rule 7)
   - Submit the form empty → each required field says what is missing.
   - Submit a real request → the visitor sees a confirmation, and **the message arrives in this studio's
     chat**. Say which chat it was seen in. Not run until the studio has a chat of its own.
   - With the secrets unset → the visitor gets a clear failure, not a blank page.
7. **J-07: Footer and facts** (rules 1, 6)
   - Each family link carries its coloured dot.
   - Address, hours, phone and WhatsApp match `site.ts`; a blank field shows nothing rather than a placeholder.
   - The legal line is present; the year is current.
   - `/reviews` shows only real reviews, or says there are none yet.

---

## 📋 Acceptance Gate
Every walk writes `docs/reviews/UAT-{{DATE}}.md`:

```markdown
# UAT: {{DATE}}
- **Build**: {{commit}} — dev server | preview | the live address
- **Browsers and devices**: {{which, at which widths}}
- **Themes**: light, dark

| Journey | Result | What was seen |
|---|---|---|
| J-01 … J-07 | PASS / FAIL / NOT RUN | one line, with the page and width for any failure |

- [ ] Rule 2: no whitening claim seen.
- [ ] Rule 3: medical wording intact on every medical treatment.
- [ ] Rule 7: the test booking arrived in the right chat (or J-06 not run, and why).

**Owner's sign-off**: ___
```

A journey that was not walked is written **NOT RUN**, with the reason — never PASS. The owner signs the report;
phase 7 (launch) needs a signed one with nothing failing.
