# Where every picture comes from

No picture goes into `public/images/` without a row here — `test/ci.test.js` fails if one is missing. And
nothing is taken from a search engine's image results, from another business's site, or from a stock library
whose licence has not been read.

## Pictures on the site

| File | What it shows | How it was made | Added |
|---|---|---|---|
| `skin-whitening.jpg` | A practitioner brushing a cream mask across a client's shoulders; the client's face is turned away | Generated: the Antigravity CLI's image generator (the CLI reports Google's Imagen 3), from the house style of `IMAGE-BRIEF.md` | 11 Oct 2026 |
| `aura-whitening.jpg` | A gloved hand placing a drop of clear serum on a client's cheek | Generated, the same way | 11 Oct 2026 |
| `vitiligo.jpg` | Gloved hands holding a hand with vitiligo patches, as at a consultation; no faces | Generated, the same way. Second attempt — the first drew a ring over a glove | 11 Oct 2026 |
| `artist.jpg` | Roshni Verma | Her own photograph, with the setting and light edited as `PORTRAIT-BRIEF.md` describes; her face is not altered | carried from the earlier draft |
| `hero.jpg`, `studio.jpg` | A treatment room; a corner with a mirror | Carried from the earlier draft. They match the prompts and house style of `IMAGE-BRIEF.md` and are taken to be generated from it — *to be confirmed by the developer* | carried from the earlier draft |
| `microblading.jpg`, `lip-blush.jpg`, `microneedling.jpg`, `glass-skin.jpg`, `japanese-glow.jpg`, `under-eye.jpg`, `laser-hair-removal.jpg`, `mole-removal.jpg` | One treatment each, as its prompt in `IMAGE-BRIEF.md` describes | Carried from the earlier draft; taken to be generated from that brief — *to be confirmed by the developer*. (The earlier `AGENTS.md` said "sourced from Pexels"; the pictures do not look like that set.) | carried from the earlier draft |

What follows from "generated":

- No photographer and no model holds rights in these pictures; they are used under the terms of the tool that
  made them. No real client appears in any of them.
- **They illustrate a treatment. They are not Roshni's results** and are never captioned as such. The footer
  says so on every page. No picture shows a before and an after, or a change of skin tone (site rule 2).
- `hero.jpg` and `studio.jpg` are not photographs of the real studio. They are replaced when there are real ones.
- `PPET Treatment` has no picture, because what the treatment is, is not known. Its page shows the drawn motif.

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
