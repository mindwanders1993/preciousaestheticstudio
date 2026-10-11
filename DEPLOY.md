# Deploying to Vercel

The pages are a **static build** with no database. There is one server route,
`src/pages/api/contact.ts`, which the booking form posts to; it runs as a Vercel
function through the `@astrojs/vercel` adapter and needs two secrets (below).
All of it sits comfortably inside Vercel's free Hobby tier.

| | |
|---|---|
| Build output | 2.2 MB, 37 files |
| Hobby bandwidth | 100 GB/month — a studio site uses a fraction of it |
| Cost | Free, provided it stays non-commercial in Vercel's sense (see below) |
| Framework preset | Astro (auto-detected) |

## One-time setup

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project**, import the repo.
3. Accept the detected settings — `vercel.json` already pins them:
   - Build command `astro build`
   - Output directory `dist`
4. **Settings → Environment Variables**: add `TELEGRAM_BOT_TOKEN` and
   `TELEGRAM_CHAT_ID` — this studio's own bot and chat, never another studio's —
   and, if a second destination is wanted, `DISCORD_WEBHOOK_URL`. `.env.example`
   says how to get each. Without them the form answers with an error and no
   booking is delivered.
5. **Deploy.** First build takes about a minute.

Every push to `main` redeploys automatically. Pull requests get their own
preview URL, which is a good way to show her a change before it goes live.

## A preview first — the site is not launched

`src/data/site.ts` holds `launched: false`. While it does:

- every page carries `<meta name="robots" content="noindex, nofollow">`;
- `/robots.txt` says `Disallow: /`.

So the first deployment can be shown to Roshni at its `.vercel.app` address
without turning up in search. Vercel only does this by itself for pull-request
previews; the address `main` deploys to is otherwise open to search engines.

**To launch:** settle the list below, then change `launched` to `true` in a
pull request. That one line removes the tag, opens `robots.txt` and adds the
sitemap to it. Attach the domain (next section) in the same sitting.

## Custom domain

The domain is `preciousaestheticstudio.com`. Vercel does not charge to attach
one.

1. Register the domain (BigRock, GoDaddy, Namecheap, Cloudflare), if it is not
   registered already.
2. Vercel → Project → **Settings → Domains** → add it.
3. Point the registrar's nameservers or records at Vercel as instructed.
4. HTTPS is issued automatically and free.

**`astro.config.mjs`** — on Vercel, `site` follows the project's production
domain by itself: the `.vercel.app` address now, the custom domain once it is
attached (the next deployment picks it up). After attaching the domain, open
`/sitemap-index.xml` and check the addresses in it. On any other host `site` is
`https://preciousaestheticstudio.com`, and must be changed if the domain is.

## The free-tier caveat, honestly

Vercel's Hobby plan is for **non-commercial** use. A studio site that
advertises paid services and takes bookings is, strictly read, commercial —
Vercel's own guidance points such sites to the Pro plan (~$20/month).

In practice a small site like this is very unlikely to attract attention, but
it is their call, not ours. If it matters, the equally free alternatives with
no commercial restriction are **Cloudflare Pages** and **Netlify**. Either
needs one code change: its own Astro adapter in place of `@astrojs/vercel`, so
that the booking route still runs.

## Before it goes live

`docs/01-CLONE-PLAN.md` §8 is the list, and `docs/04-FOR-ROSHNI.md` is what the
owner is asked. In short:

- [ ] The "must be answered" items of `docs/04-FOR-ROSHNI.md` — the
      dermatologist arrangement behind laser and mole removal, and what the
      Vitiligo, PPET and Whitening treatments are. A treatment that cannot be
      backed comes off the site.
- [ ] Real address, hours, phone, WhatsApp and email in `src/data/site.ts`.
- [ ] **Keep the reviews page empty** until there are real reviews, each given
      with the client's permission. An invented one is illegal advertising.
- [ ] Booking requests arrive in this studio's own Telegram chat — send one
      from the deployed site and see it land.
- [ ] Last of all: `launched: true`.

## Notes

- `public/images/` is cached for a year via `vercel.json`. If you replace an
  image, change its filename or visitors keep the old one.
- The homepage scroll flight runs on placeholder stills; nothing about
  deployment changes when the real clips land (see `world/HANDOFF.md`).
