# P10 — No spa feel (12 Oct 2026)

**Asked:** the owner saw the homepage on a phone and said the treatment-room picture had to go, then that the
whole site must lose its spa feel. Asked what should replace it, they chose *clinical and precise*; asked what
to show meanwhile, they chose the drawn motif now.

## Where the spa feel was

In the pictures, not the words. All thirteen generated pictures followed the house style of `IMAGE-BRIEF.md`:
"calm and unhurried", pale plaster, brass, a plant, towels, treatment beds. The copy was already direct and
is untouched. The `/studio` flight borrowed five of those pictures as stills and its render prompts described
the same rose-plaster room.

## What changes

1. The thirteen generated pictures are deleted; `artist.jpg` stays. Each treatment loses its `image:` and
   draws its family's motif (`TreatmentArt.astro`), as PPET already did.
2. The homepage hero and the About page draw the same motif (brow strokes; skin contours) in place of the
   room, until there is a photograph of the real room.
3. The social picture becomes `public/images/social-card.png`: the name and city on a plain ground, drawn by
   a script from `site.ts`. `Layout.astro` and the structured data point to it.
4. The flight runs on six flat tinted stills in `public/world/stills/`. Its 24 render prompts keep their room,
   legs and seam rule, re-styled to a white, steel and glass clinic.
5. `IMAGE-BRIEF.md` is rewritten to the clinical house style, with a list of what is never in frame.
6. `docs/IMAGE-SOURCES.md`, `CLAUDE.md`, the rebrand checklist and the next-steps list follow.

## What does not change

Copy, prices, the menu, the schema, the seven site rules, the flight engine, the leg ids.

## Gates

`npm run check`, `npm run build`, `npm test` — all three green before landing.
