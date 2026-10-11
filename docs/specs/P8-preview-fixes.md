# Spec: P8 - Two fixes found on the first deployment

- **Phase**: 6 (deploy)
- **Status**: Built after checking the live deployment (12 Oct 2026); the commit and the pull request are the
  approval gate
- **Goal**: A booking request that reaches nobody is never answered with "received"; and on the preview address
  a shared link shows its picture.
- **Branch**: `fix/booking-delivery-and-preview-links`

## What the first deployment showed (12 Oct 2026)

`https://preciousaestheticstudio.vercel.app`, deployed by the owner from `main` at `3a2664f`. Checked with
`curl`, reading only:

| Checked | Result |
|---|---|
| Home, `/treatments`, a treatment page, `/contact`, `/artist` | 200, each with `noindex, nofollow` |
| `/robots.txt` | `Disallow: /` |
| `/llms.txt`, `/treatments.json`, the sitemap, the three new pictures, the favicon | 200 |
| Canonical link, `og:url`, `og:image` | point at `preciousaestheticstudio.com` — which does not answer yet |
| Vercel's own `X-Robots-Tag` | not sent on this address, as expected; the tag in the page is what keeps it out |

## Fix 1 — an undelivered booking is not "received"

`src/pages/api/contact.ts` answered *"Your booking request has been received"* whenever the request was well
formed — also when no Telegram or Discord destination was configured, and when Telegram refused the message.
The request then existed only in the server's log. On the first deployment no destination was set, so every
request would have been lost this way.

Now, when nothing accepted the request, the route answers **503** with: *"We could not send your request just
now. Please message us on Instagram (…) instead."* The form already shows a route's error to the visitor. The
request is still written to the log.

This also makes three statements true that were written before the behaviour was checked — in `DEPLOY.md`,
and in the `dojo` and `gemba` skills — that the form fails clearly when the values are unset.

Seen on the dev server:

| Case | Answer |
|---|---|
| No destination configured | 503, the message above |
| A dummy token, so Telegram answers "Unauthorized" | 503, the message above; Telegram's error is in the log |
| No name | 400, as before |

Not seen: a delivered request. That is the owner's test from the deployed site once the two values are set.

## Fix 2 — the site's address follows the deployment

Absolute links were built from a fixed `site:` in `astro.config.mjs`, so on the preview address they pointed at
a domain that is not live: a link shared on WhatsApp would show no picture, and the links inside `/llms.txt` and
`/treatments.json` led nowhere.

`site` now takes Vercel's `VERCEL_PROJECT_PRODUCTION_URL` when it is present — the `.vercel.app` address until
a custom domain is attached, the custom domain afterwards — and falls back to the studio's domain anywhere
else. Built both ways locally:

| Build | Canonical, `og:image`, sitemap, `/llms.txt`, `/treatments.json` |
|---|---|
| with the variable set to `preciousaestheticstudio.vercel.app` | all under that address |
| without it | all under `https://preciousaestheticstudio.com` |

Not seen: the real value Vercel passes. The first thing to check after this is deployed is the page's
`og:image`.

## Also corrected

The `dojo` skill said a booking can be tested locally from `.env.local`. The route reads `process.env`, and
the dev server does not put `.env.local` there: with a dummy file the route saw no destination; with the same
values in the shell it called Telegram. The skill now says to export the file's values first.

## Files

`src/pages/api/contact.ts`, `astro.config.mjs`, `test/ci.test.js` (one check: an undelivered request is not
answered with success), `DEPLOY.md`, `docs/01-CLONE-PLAN.md` §8, `.agents/skills/dojo/SKILL.md`, `AGENTS.md`,
`docs/specs/P7-not-launched.md` (a pointer here), `docs/specs/P8-preview-fixes.md`.

## Site rules

- [x] **7 secrets and the booking channel** — the route still reads its destinations only from the environment;
  what changes is what it tells the visitor when there is none.
- [x] **1 facts from `site.ts`** — the error message reads the Instagram handle from it.
- [ ] 2, 3, 4, 5, 6 — not touched.

## Decisions

- **An error to the visitor, with another way to reach the studio** — instead of keeping "received" and relying
  on the log, because nobody reads the log and the visitor believes they have booked. (12 Oct 2026)
- **Vercel's production-domain variable** — instead of a second hand-set address for the preview, because it
  changes by itself when the domain is attached and nothing has to be remembered at launch. If the site is ever
  served at `www.` while the bare domain is also attached, check the sitemap: Vercel reports the shorter name.
  (12 Oct 2026)
- **The `dojo` instructions changed, not the route** — instead of making the route also read `.env.local`,
  because that would build the secrets into the server bundle. (12 Oct 2026)

## Verify

```bash
npm run check && npm run build && npm test     # 39 checks
```
