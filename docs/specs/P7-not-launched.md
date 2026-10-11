# Spec: P7 - Not launched yet: keep the preview out of search

- **Phase**: 6 (deploy), first part
- **Status**: Built on the owner's go-ahead to deploy a preview (11 Oct 2026); the commit and the pull request
  are the approval gate
- **Goal**: The site can be put on Vercel and shown to Roshni without search engines or AI crawlers picking it
  up. Launching is a one-line change.
- **Branch**: `chore/prepare-client-preview` (first commit)

## Why

Importing the repository into Vercel deploys `main` as the production site at a public `.vercel.app` address.
Vercel marks its per-branch preview addresses as not-to-be-indexed by itself; the production address is open
to search engines. The site still carries content the owner has not confirmed — the Vitiligo page, the
dermatologist wording, the two Whitening treatments (`docs/04-FOR-ROSHNI.md`, items 1–5).

## 1. Files

- `src/data/site.ts` — `launched: false`.
- `src/layouts/Layout.astro` — while not launched, every page carries
  `<meta name="robots" content="noindex, nofollow">`.
- `src/pages/robots.txt.ts` — while not launched, `Disallow: /` and no sitemap line.
- `test/ci.test.js` — one check: the pages and `robots.txt` both follow the switch, in either state.
- `DEPLOY.md` — the preview-first order, and the stale "before it goes live" list replaced.
- `docs/01-CLONE-PLAN.md` §8 — the launch list brought up to date, with the switch as its last item.
- `AGENTS.md` — a paragraph. `docs/specs/P7-not-launched.md`.

## 2. Site rules

- [x] **1 facts from `site.ts`** — the switch lives there; `robots.txt` reads the name from it.
- [x] **6 nothing invented** — the reason for the switch: unconfirmed content is not published to search.
- [ ] 2, 3, 4, 5, 7 — not touched.

## 3. Decisions

- **A switch in `site.ts`** — instead of an environment variable set in Vercel, because launching is then a
  reviewed pull request that shows in git, and a forgotten or unset variable cannot make the site public.
  (11 Oct 2026)
- **Both a `noindex` tag and `Disallow: /`** — instead of one of them. `robots.txt` keeps well-behaved
  crawlers, including AI crawlers that ignore `noindex`, from reading unconfirmed content at all; the tag is
  for anything that fetches a page anyway. The known limit: a crawler that obeys `robots.txt` never sees the
  tag, so a search engine could still list the bare address, with no content, if a public page linked to it.
  (11 Oct 2026)
- **No "preview" banner on the pages** — instead of one, because it would have to sit over the fixed header
  and the homepage flight, and the aim is not being indexed, not labelling. (11 Oct 2026)
- **`/llms.txt` and `/treatments.json` are still generated** — instead of being removed until launch, because
  the pages and the tests then stay the same in both states; `robots.txt` tells crawlers to stay out of them
  too. (11 Oct 2026)

## 4. Not in this spec

On a preview address, absolute links (the social-preview picture, the canonical link, the links inside
`/llms.txt`) point at `preciousaestheticstudio.com`, which is not live yet. A link shared on WhatsApp will
therefore show its title and description but may show no picture. To be checked on the real preview first.

*Checked on 12 Oct 2026 and fixed: `docs/specs/P8-preview-fixes.md`.*

## 5. Done when — and what was seen (11 Oct 2026)

| State | `robots.txt` | Pages | `npm test` |
|---|---|---|---|
| `launched: false` (committed) | `Disallow: /`, no sitemap line | `noindex, nofollow` on every page | 36 of 36 |
| `launched: true` (tried locally, then put back) | `Allow: /`, `Disallow: /api/`, the sitemap line | no robots tag | 36 of 36 |

The not-launched `robots.txt` carries two comment lines saying why; without them it was under the 100 bytes
the existing "page is not abnormally small" check asks of every expected file.

Not checked: the response headers and the tag on a real Vercel deployment — that is the first thing to look at
once the preview is up.

## 6. Verify

```bash
npm run check && npm run build && npm test
```
