# Where every picture comes from

No picture goes into `public/images/` without a row here — `test/ci.test.js` fails if one is missing. And
nothing is taken from a search engine's image results, from another business's site, or from a stock library
whose licence has not been read.

## Pictures on the site

| File | What it shows | How it was made | Added |
|---|---|---|---|
| `artist.jpg` | Roshni Verma | Her own photograph, with the setting and light edited as `PORTRAIT-BRIEF.md` describes; her face is not altered | carried from the earlier draft |
| `social-card.png` | The studio's name and city on a plain ground; the picture social networks show when a page is shared | Drawn by a script from the words in `src/data/site.ts`; no photograph in it | 12 Oct 2026 |
| `/world/stills/*.jpg` (six, outside this folder) | A flat frame tinted to each scene of the `/studio` flight; nothing pictured | Drawn by a script; placeholders until the flight is rendered (`world/HANDOFF.md`) | 12 Oct 2026 |

## Pictures removed on 12 Oct 2026

Thirteen generated pictures — `hero.jpg`, `studio.jpg` and one for each of eleven treatments — were removed on
the owner's instruction (`docs/specs/P10-no-spa.md`): every one of them, following the old house style of
`IMAGE-BRIEF.md`, showed a spa (plaster walls, plants, brass, towels, treatment beds), and the owner does not
want the site to feel like one. Each treatment page and card draws its family's motif instead
(`TreatmentArt.astro`); the homepage and the About page draw the same art. The brief now asks for a clinical,
precise look; new pictures are generated from it, and recorded here, one at a time.

What follows from "generated":

- No photographer and no model holds rights in these pictures; they are used under the terms of the tool that
  made them. No real client appears in any of them.
- **They illustrate a treatment. They are not Roshni's results** and are never captioned as such. The footer
  says so on every page. No picture shows a before and an after, or a change of skin tone (site rule 2).
- No treatment has a picture at the moment; every page shows its family's drawn motif. A photograph of the real
  room, when there is one, goes on the homepage and the About page first.

## Pictures that were turned down

On 11 Oct 2026 the owner passed on ten pictures Roshni had collected as examples, one per treatment. Each is
a search-engine image result. None can be used:

| Roshni's example | Where it is from, as the result itself shows | Why not |
|---|---|---|
| Lip blushing — a before and after of lips | A permanent-makeup studio in Rochester, New York | That studio's own client and its own photograph |
| Microblading — a pen tool at a brow | A beauty blog; the picture looks like agency stock | The rights belong to whoever shot it; the blog's licence does not pass on |
| Microneedling — a pen device on a cheek | Freepik (now Magnific) | Usable only under Freepik's licence: a credit line, or a paid plan. Not needed — the site has its own |
| Korean glass — a serum brushed on a forehead | No source shown | Unknown owner |
| Japanese whitening — hands and a back, darker and lighter | No source shown | Unknown owner; and a skin-tone before-and-after (site rule 2) |
| Skin whitening — "Full body whitening laser" | A clinic's promotional video | That clinic's footage of its client |
| Laser hair removal — a handpiece at a waist | A clinic's price page; agency stock by its look | As for microblading |
| Mole removal — a pen at a mole near an eye | A skin clinic in Kolkata | That clinic's picture |
| Vitiligo — a face with and without patches | A cosmetic surgeon's site in Kolkata | That practice's illustration; and a before-and-after |
| Aura whitening — a cheek, before and after | A clinic in Thailand, with its logo on the picture | That clinic's client and its watermark; and a before-and-after |

They were used for one thing: to see what Roshni means by each treatment's name.

## Adding a picture

1. Generate it from `IMAGE-BRIEF.md` (house style first, then the treatment's line), or take a photograph you
   have the right to use — Roshni's own, with the client's written permission where a client is in it.
2. Square, 1024×1024, JPEG, saved as `public/images/<treatment-slug>.jpg`; set `image:` in the treatment's file.
3. A new file name each time a picture is replaced — pictures are cached for a year (`vercel.json`).
4. Add its row above, in the same commit.
