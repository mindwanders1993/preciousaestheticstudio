# P11 — Treatment pictures back, clinical not spa (13 Oct 2026)

**Asked:** "add the photos, only remove spa like feature more like professional treatment". P10 took all
thirteen pictures off the site; the owner wants the treatment pictures back with the spa gone, each one
showing a treatment being carried out professionally.

## Decided with the owner

1. **The eleven treatment pictures come back.** The homepage and the About page keep the drawn art until there
   is a photograph of the real room; a generated room would be an invented one (site rule 6). `PPET Treatment`
   keeps its motif: what the treatment is, is still not known.
2. **They are generated new**, not retouched from the old set. In the old pictures the bed, the towels, the
   headband and the plaster room were the composition itself. Made with the owner's Gemini subscription
   through the Antigravity CLI (`agy`), as the three pictures of P4 were.

## What changes

1. `IMAGE-BRIEF.md` — the house style was already clinical (P10). Five rows still described a spa scene and are
   rewritten:

   | Row | Was | Is |
   |---|---|---|
   | `skin-whitening` | face down on a bed, bare back, a cream mask brushed on | a skin assessment under a lit magnifying lamp, seated upright; nothing applied, no change of skin tone |
   | `japanese-glow` | palms pressing serum into the face | a clear solution swept across the cheek with sterile gauze |
   | `glass-skin` | looking into a lit mirror | a clear hydrating layer laid on with a small flat brush |
   | `under-eye` | a gold hydrogel eye patch | the diagnosis the page describes: the skin gently stretched under an examination light |
   | `mole-removal` | a blush-pink background | the same dermatoscope close-up against a white drape |

2. Eleven pictures in `public/images/`, each 1024×1024 JPEG, and `image:` set in eleven treatment files.
3. **The files are named `<slug>-2.jpg`.** `/images/*` is served `immutable` for a year (`vercel.json`), and
   anyone who saw the site before 12 Oct has the spa pictures cached under the old names.
4. `docs/IMAGE-SOURCES.md` gets a row for each picture; `CLAUDE.md`, `AGENTS.md`, the rebrand checklist and the
   next-steps list follow.

## What does not change

Components, schema, copy, prices, the flight, the seven site rules, the tests. Cards, treatment pages, the
structured data and the social picture already read `image` and fall back to `TreatmentArt` without it. The
footer line "Pictures on this site are illustrative; they do not show the studio's clients or their results"
stays, and is needed again.

## Each picture is looked at before it goes in

No plant, candle, towel, turban, headband, linen, cushion, bed, plaster, brass, wood or terracotta. No hospital
blue or green. An Indian subject. The practitioner gloved, no ring over a glove, **and her face out of frame**:
one artist works here, her real portrait is on the site, and a generated face at work would read as hers (site
rule 6; now hard rule 7 of the brief). No text, logo or label. No
before-and-after and no change of skin tone (site rule 2). Hands and tools drawn correctly. Nobody reclining to
be pampered. A picture that fails is generated again, three tries at most; a treatment whose picture still fails
keeps its motif.

## Where it stands (13 Oct 2026, afternoon)

Nine pictures were generated before the generator's quota ran out (`gemini-3.1-flash-image`, about nine
pictures in five hours).

| Treatment | Picture | Note |
|---|---|---|
| Microblading | in | cropped to lose a green object at the left edge |
| Microneedling | in | cropped: the practitioner's face was in frame |
| Korean Glass | in | the second of two; cropped to the face and hands |
| Japanese Glow | in | a pink cushion behind the client painted out |
| Dark Under-Eye | in | as generated |
| Laser Hair Removal | in | as generated |
| Mole Removal | in | the generator drew a real maker's name on the dermatoscope; painted out |
| Lip Blushing | **not yet** | the one generated shows a headband; to generate again |
| Skin Whitening, Aura Whitening, Vitiligo | **not yet** | not generated: quota |
| PPET | motif | by decision |

The four without a picture draw their family's motif meanwhile.

## What was seen (13 Oct 2026)

Headless Chrome on the dev server; pictures in `docs/reviews/shots/2026-10-13-clinical-pictures-*.png`.

| What | Width | Result |
|---|---|---|
| The cards on `/treatments`, all four families | 1280 px, light and dark | seven cards show their picture, five their motif; no card is distorted |
| Microblading, Laser Hair Removal, Dark Under-Eye pages | 375 px, light | each shows its picture; nothing runs past 375 px |
| Japanese Glow page | 1280 px, dark | the picture sits in the hero frame |
| Microblading page, built | — | the social picture and the `Service` data name `/images/microblading-2.jpg` |

Not checked: a real phone, and the four treatments still to generate.

## Gates

`npm run check`, `npm run build`, `npm test` — all three green before landing.
