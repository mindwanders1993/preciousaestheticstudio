# Spec: P6 - Found by search and by agents, priced at a glance, booked from a phone

- **Phase**: beyond the clone plan — the owner lifted "the clone does what the source does" on 11 Oct 2026
  ("you can also improve the site … surprise me")
- **Status**: Built under that instruction; the commit and the pull request are the approval gate
- **Goal**: Someone searching, or asking an AI assistant, can find the studio, its treatments and its prices;
  a visitor sees every price on one screen; and on a phone the booking button is always within reach.
- **Branch**: `feat/discoverability-and-booking`

## 1. What was built

**For search engines**
- Every page: a canonical link, social-preview tags (title, description, picture), `lang="en-IN"`, theme colour.
- Structured data (`src/lib/structured-data.ts`): the studio as a `BeautySalon` on every page; each treatment
  as a `Service` with its price in INR and a breadcrumb trail; the questions on `/treatments` as a `FAQPage`.
- `/robots.txt`, generated, pointing at the sitemap.

**For AI agents**
- `/llms.txt` — a plain-text map of the site: what the studio is, the facts an assistant may rely on, every
  treatment with its price and link, how to book, the questions and answers.
- `/treatments.json` — the menu as data.
- Both are generated from `site.ts` and the content collections, so they cannot drift from the pages. Both are
  linked from every page's `<head>`.

**For visitors**
- **The price list** (`src/components/PriceList.astro`), on the homepage after the flight: all twelve
  treatments by family, name and price on one line, each a link to its page. `/#prices` links straight to it.
- **The phone booking bar** (`Layout.astro`): below 900 px, on every page but the homepage flight and the
  booking page, a bar fixed to the bottom with "Book a consultation" and a link to message the studio
  (WhatsApp once there is a number; Instagram until then).
- **Booking opens on the right treatment**: a treatment page's buttons lead to `/contact?treatment=<slug>`, and
  the form arrives with that treatment chosen.

**A defect found on the way, and fixed**
- The contact page was 434 px wide in a 375 px frame and scrolled sideways: its grid column grew to fit the
  treatment select's longest option. `minmax(0, 1fr)` holds it to the screen.

## 2. Files

New: `src/lib/structured-data.ts`, `src/components/PriceList.astro`, `src/pages/robots.txt.ts`,
`src/pages/llms.txt.ts`, `src/pages/treatments.json.ts`.
Changed: `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/pages/treatments/[id].astro`,
`src/pages/treatments/index.astro`, `src/pages/contact.astro`, `test/ci.test.js`, `AGENTS.md`, `README.md`,
`docs/01-CLONE-PLAN.md`, `docs/03-OPEN-QUESTIONS.md`.

## 3. Site rules

- [x] **1 facts from `site.ts`** — structured data, `llms.txt` and the JSON all read it; none types a fact.
- [x] **2 no promise of lighter skin** — `llms.txt` tells assistants not to make one on the studio's behalf.
- [x] **3 medical wording** — untouched; `llms.txt` repeats the patch-test and clearance requirements.
- [x] **4 colour from `--cat`** — the price list colours each family's heading from `--cat`.
- [x] **5 the flight** — untouched; the price list sits after it, inside `.after-flight`.
- [x] **6 nothing invented** — structured data states no rating, no review and no opening hours, and no street
  address until `site.ts` has one. A test holds that. `llms.txt` does repeat the hours and languages the site
  shows, which are still the earlier draft's (`docs/04-FOR-ROSHNI.md`, item 8).
- [x] **7 secrets** — `/api/` is disallowed in `robots.txt`; the booking route is unchanged.

## 4. Decisions

- **Structured data mirrors the page and adds nothing** — instead of filling in every field a search engine
  accepts (hours, geo-coordinates, ratings), because none of those is confirmed and a wrong one is published
  to every search result. (11 Oct 2026)
- **`llms.txt` and the JSON are generated endpoints** — instead of files written by hand in `public/`, because
  a hand-written copy of the menu is a second source of truth and the menu is about to change. (11 Oct 2026)
- **A price list on the homepage** — instead of leaving prices on the treatments page only, because the price
  is the first thing a visitor wants and Roshni's menu is short enough to show whole. (11 Oct 2026)
- **A booking bar fixed to the bottom of a phone** — instead of a menu button, because booking is the one
  action the site exists for and the header scrolls away. (11 Oct 2026)
- **The bar's second button is Instagram for now** — instead of WhatsApp, because there is no number yet; it
  switches by itself when `site.whatsapp` is filled in. (11 Oct 2026)

## 5. What was seen (11 Oct 2026)

Headless Chrome on the dev server; pictures in `docs/reviews/shots/`.

| What | Width | Theme | Result |
|---|---|---|---|
| Price list | 1280 px | light | two columns, four families, prices aligned |
| Price list | 375 px | light, dark | one column; long names wrap and keep their price |
| Booking bar | 375 px | light, dark | on treatment pages, clear of the content and the footer |
| Booking form from a treatment page | 375 px | light | opens with "Microblading" chosen |
| Contact page | 375 px | light | 375 px wide — was 434 px |

Not checked: a real phone, Safari, how a search engine or an assistant actually reads the new data (that
needs the site to be live), and the flight's own header over the price list while scrolling — the screenshot
tool jumps to the section, a visitor scrolls to it.

## 6. Verify

```bash
npm run check && npm run build && npm test     # 35 checks; eight are new with this work
```
