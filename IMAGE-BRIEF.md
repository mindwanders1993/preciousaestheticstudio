# Image generation brief — Precious Aesthetic Studio

For generating the site's imagery elsewhere (Antigravity, Midjourney, etc.) and
dropping the results back in.

**Drop finished files into `public/images/` using the exact filenames below.**
Nothing else changes — the site picks them up on the next build.

---

## House style — prepend to every treatment prompt

> Editorial clinical photography for a modern permanent-makeup and skin clinic in
> India. Bright, even daylight; crisp focus on hands, tools and skin; precise and
> professional, not relaxing. Clean neutral palette — white, pale grey, warm
> off-white — with blush and rosewood only as small accents. Shot on 50mm at
> f/2.8. Interior: matte white walls, white cabinetry, brushed steel, glass, a
> treatment chair, sealed instrument trays. The practitioner is gloved and at
> work. Photorealistic, no text, no logos, no watermarks, no visible product
> branding.

**Not a spa (12 Oct 2026, `docs/specs/P10-no-spa.md`):** no plants, candles,
towels, turbans, linen, cushions, massage beds, steam or petals. No pale
plaster, brass or terracotta. Nobody reclines with eyes closed being pampered;
people are being treated, precisely.

**Palette to steer toward:** `#ffffff` white · `#fffcfb` warm off-white ·
`#d47a82` blush (accent only) · `#5c2a30` rosewood (accent only)

### Hard rules

1. **Indian / South Asian subjects.** The studio is in Varanasi and most clients
   are Fitzpatrick IV–V. Current stock images skew pale and Western — that is
   the single biggest thing to fix.
2. **No hospital blue or green.** Clinical means precise and clean, not cold:
   white and warm off-white, never teal scrubs or blue drapes.
3. **No before/after framing, ever.** These illustrate a service. They are not
   Roshni's results and must never be presentable as such.
4. **No text, logos, product labels or watermarks.**
5. **Square, 1024×1024, JPEG.** Cropped to square in-frame — the site crops
   centrally, so keep the subject centred with breathing room.
6. Faces should look composed and present. Not grimacing, not model-glamorous,
   and not drifting off at a spa.

---

## The 11 treatment images

| # | Filename | Prompt (append to house style) |
|---|---|---|
| 1 | `microblading.jpg` | Extreme close-up of an Indian woman's eyebrow being shaped by a gloved artist holding a fine microblading tool. Focus on the brow and the tool tip. Her eye is closed. Warm skin tone, bright daylight. |
| 2 | `lip-blush.jpg` | Close-up of an Indian woman's lower face, lips relaxed and softly tinted a natural rose. Gloved hand just entering frame with a fine PMU tool. Bright even light, shallow focus on the lips. |
| 3 | `microneedling.jpg` | An Indian woman in a treatment chair, eyes closed, while a gloved practitioner passes a microneedling pen across her cheek. Bright daylight, white drape. |
| 5 | `glass-skin.jpg` | An Indian woman with luminous, dewy, exceptionally hydrated skin, hair tied back, looking into a lit mirror. Light reflecting off her skin in one continuous sheen. Bright and precise. |
| 7 | `japanese-glow.jpg` | Gloved hands pressing a hydrating serum into an Indian woman's face with flat palms. Eyes closed, composed. Bright light, no product bottle visible. |
| 8 | `under-eye.jpg` | Extreme close-up of an Indian woman's under-eye area with a soft gold hydrogel eye patch applied. Eye closed, lashes visible. Bright, precise, shallow focus. |
| 9 | `laser-hair-removal.jpg` | Close-up of a laser handpiece against smooth Indian skin on a forearm or underarm, gloved hand holding it. White drape. Abstract and precise — no face in frame. |
| 10 | `mole-removal.jpg` | Close-up of a gloved hand holding a dermatoscope over a small mole on Indian skin, on a soft blush-pink background. Reads as *examination*, not surgery. Minimal, precise, no blades or blood. |
| 11 | `skin-whitening.jpg` | An Indian woman lies face down on a treatment bed, shoulders and upper back bare, a white drape across her lower back, while a practitioner in white gloves brushes a smooth cream-white treatment mask across her shoulders with a wide soft fan brush. Her face is turned away and not visible. Precise and clinical, warm brown skin tone. |
| 12 | `aura-whitening.jpg` | Extreme close-up of an Indian woman's cheek, jawline and closed eye, her warm brown skin luminous and even with a soft dewy sheen, as a hand in a cream glove holds a slim glass pipette releasing a single drop of clear serum onto her cheekbone. Shallow focus on the droplet. Composed, not glamorous. |
| 13 | `vitiligo.jpg` | Close-up of a practitioner's hands in plain smooth cream gloves, with no rings and no jewellery on the gloved hands, gently cradling an Indian woman's hand that has natural vitiligo, with irregular lighter patches of skin across the knuckles and fingers, resting on a white treatment-chair armrest, as at a consultation. No faces in frame. Respectful, precise, dignified. |

> Rows 4 and 6 went with their treatments (11 Oct 2026); rows 11 to 13 were added the same day, and their
> pictures generated from exactly these lines. `PPET Treatment` has no row: what it is, is not known yet.
> Every picture's origin is recorded in `docs/IMAGE-SOURCES.md`.

> **9 and 10 deliberately show no faces.** Those pages are about screening and
> caution; abstract framing keeps them from looking alarming.

---

## Supporting images

| Filename | Prompt |
|---|---|
| `hero.jpg` | Interior of a small modern permanent-makeup clinic in India. A white treatment chair, matte white walls, white cabinetry with glass doors, brushed-steel fittings, bright daylight through a large window. Empty and precise, no people. |
| `studio.jpg` | A second angle of the same clinic — a corner with a lit mirror, a steel trolley of sealed sterile tools, a sharps bin. Clean, uncluttered, no people. |

Keep these two consistent with each other: same room, same light, same palette. Neither is on the site
now (12 Oct 2026): the homepage and About page draw a motif until there is a photograph of the real room.

---

## Roshni's portrait — `artist.jpg`

**Do not AI-generate this one.** It must be a real photo of her, or the page is
lying to clients about who treats them.

The café selfie needs reshooting or editing. What works:

- Plain wall behind her, no busy background
- Daylight from a window **facing** her, not behind
- Phone at **eye level**, propped on something — not held above
- Whatever she'd actually wear to treat a client
- Relaxed, natural, looking at the camera
- Cropped **square**, head and shoulders, 1024×1024

Free tools that will cut the background out of the existing photo in two
minutes: Canva, Photoroom, Pixlr.

Until a real photo lands, the page shows a labelled placeholder frame — which
is correct, and much better than a stranger's face.

---

## After generating

1. Save all files into `public/images/`, exact filenames above.
2. Keep each under ~250KB. To compress on macOS:
   ```
   sips -s format jpeg -s formatOptions 72 IMAGE.jpg --out IMAGE.jpg
   ```
3. Rebuild: `npm run build`
4. Filenames are cached for a year in production (see `vercel.json`) — if you
   swap an image *after* deploying, either keep the same filename and redeploy,
   or rename it.

## Consistency check

Generated in separate sessions, these will drift apart. Once all 12 exist, view
them as a grid before shipping — the giveaway is inconsistent white balance
(some warm, some cold). If one looks out of place, regenerate it rather than
letting it sit in the row.
