# Spec: P9 - The first customer

- **Status**: Built on the owner's instruction of 12 Oct 2026 — "do not wait for her … think on a first-principles
  basis"; the commit and the pull request are the approval gate
- **Goal**: A woman in Varanasi who lands on the site from a reel, a friend or a search sends a first message.
- **Branch**: `feat/first-customer`

## First principles

The site exists to get one message. Before she sends it she needs three answers — what does it cost, is it
safe, who are you — and one easy way to send it. Everything that stood between her and those was moved or
removed; everything that had to be invented to look established was left out (rule 6). A new studio's only
social proof is honesty, so the site says it is new.

## What changed

| Where | Before | Now |
|---|---|---|
| Homepage | Opened on a nine-screen camera flight of a room that is not hers | Opens on the offer (a free consultation), two buttons, three prices, the trust strip, the full price list, how a first visit works, then the treatments |
| The flight | The homepage | Its own page, `/studio` ("A look around"), linked from the footer and the About page; still the first element on its page (rule 5). Its scene tags no longer claim "Laser certified" or "Vegan pigments"; the brow and lip prices are read from the collection (they said ₹12,000 and ₹14,000) |
| Every button | "Book Appointment" | "Book a free consultation" — the easiest yes on the site |
| Message channel | A form that required an Instagram ID | `src/lib/contact.ts`: a WhatsApp link with the text written, the moment `site.whatsapp` is filled; Instagram until then. On every page, in the booking bar, on each treatment page with the treatment named |
| The form | Instagram required | Phone required, Instagram optional, three fields and a note |
| Navigation | Treatments · The Artist · About · Reviews | Treatments · Prices · Your first visit · About Roshni. Reviews leaves the nav and the footer until there are three real ones; the page stays reachable |
| `/first-visit` | — | New: five steps from the first message to the aftercare, what to bring, the general FAQ (with FAQ structured data) |
| `/prices` | — | New: the price list as one shareable link |
| About | Aura Blush's history as this studio's | "New in Varanasi, with standards from day one" — the idea and the standards, no history |
| Artist | A first-person story written for someone else | Third person, only what she has given (training, three years, works alone); her story in her words comes later |
| Treatment pages | A long clinical essay between the facts and the button | The essentials on one screen; the essay folds under "Read the full explanation" |
| 404 | Astro's rocket | A branded page with three ways on |
| Hindi | None | The four trust lines, each with its Hindi; flagged for her to check |
| Analytics | None | Vercel Web Analytics script; records once enabled in the Vercel project |

Not done, because it needs her: her WhatsApp number (the single biggest lever), her address and a map, her own
story and photographs, a Google Business Profile. Each is in `docs/04-FOR-ROSHNI.md` and switches on without
code changes where the site already reads `site.ts`.

## Site rules

- [x] **1** every fact — name, place, handle, number — read from `site.ts`; prices from the collection.
- [x] **2** no promise of lighter skin anywhere new.
- [x] **3** medical wording untouched; `/first-visit` repeats the patch test and clearance as written.
- [x] **4** colour from `--cat` (the price list).
- [x] **5** the flight is the first element on `/studio`; the engine is not edited; the leg ids and order are
  unchanged; rule 5 reworded to say where the flight lives.
- [x] **6** nothing invented: the About page says the studio is new; the Artist page uses her given facts;
  the flight's credential tags are gone; the "100% disposable tools" stat became "1 artist".
- [x] **7** untouched.

## Decisions

- **The flight moved rather than was deleted** — instead of removing it, because it is the one piece of the
  site with real craft in it and will carry her real rooms one day; it just must not be the front door.
  (12 Oct 2026)
- **"Free consultation" as the offer everywhere** — instead of "book appointment", because the consultation
  is already free and costs her nothing to promise; it is the smallest step a nervous first-timer can take.
- **WhatsApp built before the number exists** — instead of waiting, because the number is the one thing she
  will give first, and the site should be ready the same minute.
- **Reviews out of the nav, page kept** — instead of deleting the page, because the honest "no reviews yet"
  text is right for anyone who finds it, and it returns to the nav with the first three real reviews.
- **The essay folds, not deleted** — instead of cutting the clinical text, because it is what earns the
  expert reader's trust and search engines still read it.
- **Hindi on four lines only** — instead of a bilingual site, because four short promises are checkable by
  her in a minute and a wrong sentence elsewhere would cost more than it gains.

## What was seen (12 Oct 2026)

Dev server, true 375 px frames and 1280 px, light and dark: the homepage (offer, buttons, three prices, trust
strip with Hindi, price list, steps), `/first-visit`, a treatment page, the contact form opening with the
treatment chosen, `/studio` with the flight first, the 404 page, the About page. Page width 375 px everywhere.

## Verify

```bash
npm run check && npm run build && npm test     # 43 checks
```
