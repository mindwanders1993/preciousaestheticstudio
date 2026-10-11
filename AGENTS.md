## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## How work is done here

Twelve skills in `.agents/skills/` (linked from `.claude/skills/`) carry the method. The order:
`hoshin` (plan) → `takumi` (build) → `shiken` (test) → `kensa` (review) → `kura` (git) → `gemba` (acceptance) →
`hansei` (reflect), with `muda` (sweep) and `dojo` (local environment) when needed. Three guardrails load with
them: `invariants` (the seven site rules), `contracts-first` (schema before pages) and `migration-bridge` (what
came from the source site and what never does).

The three gates, in order: `npm run check`, `npm run build`, `npm test`.

Git rules — `kura` has them in full:

- The owner says yes before each branch, each commit and each pull request.
- No AI attribution in any commit or pull request: no `Co-Authored-By`, no "Generated with" line.
- `main` moves only by pull request; the owner merges on GitHub. No force-push, no `--no-verify`.
- Paths are staged by name; never `git add .`.

The plan, the rebrand checklist and the open questions about the studio are in `docs/`.

## Business details

The studio operates in **Varanasi**, serving domestic and visiting clients. Name,
address, phone/WhatsApp, hours, languages, payment methods and the GST note live
in `src/data/site.ts` — the Layout footer and the contact page both read from it,
so a relocation is a one-file change. Prices are quoted in ₹ **inclusive of 18%
GST**; the homepage rail parses the first ₹ figure out of each `price`.

Two content rules that are legal, not stylistic:

- **No fairness / whitening / lightening claims anywhere.** Advertising "fairness
  of skin" is restricted under the Drugs and Magic Remedies Act and ASCI's code.
  The Japanese treatment is named *Brightening* and its page says plainly that we
  do not offer whitening. Don't let this drift back.
- **Mole removal and laser are written as running under a consulting
  dermatologist**, who clears every pigmented lesion before it is removed. Nobody
  is named: the `team` collection holds the founder only, and the arrangement is
  asserted in the copy. The clinical menu depends on that arrangement being real
  — if this studio has none, the two treatments go (`docs/03-OPEN-QUESTIONS.md`,
  question 6).

Laser copy leads with **Nd:YAG 1064nm** because most clients are Fitzpatrick IV–V;
the diode is the second half of the course, not the opener. Session counts (8–10)
reflect that. Don't "simplify" this back to a diode-first page.

## The treatment menu

The studio is no longer PMU-only. Ten treatments span four **service families**
defined in `src/data/categories.ts` — that module is the single source of truth
for category ids, labels, copy and colour.

- `Layout.astro` emits `--cat-<id>` custom properties from it once, in `<head>`.
  Any element that carries `data-cat="<id>"` gets a local `--cat` (plus derived
  `--cat-soft` / `--cat-line`), and components style against `--cat` without
  knowing which family they are rendering. **Do not hard-code a category colour
  anywhere else.**
- The treatments schema (`src/content.config.ts`) carries clinical fields
  alongside the marketing ones: `sessions`, `downtime`, `results`, `bestFor`,
  `notFor`, and `medical` + `medicalNote`.
- `medical: true` renders the screening notice on the treatment page and a
  marker on its card. Four treatments use it. The gating language on
  `mole-removal` and `laser-hair-removal` is deliberate and researched — laser
  needs a patch test 24–48h ahead, and no pigmented lesion is removed without a
  dermatologist's written clearance, because radiofrequency destroys the tissue
  a pathologist would need. Don't soften that copy into marketing.
- All ten treatments now carry photography in `public/images/<slug>.jpg`
  (1024x1024, sourced from Pexels — free for commercial use, no attribution
  required). `TreatmentArt.astro` remains the fallback for any treatment added
  without an `image`, drawing a per-family SVG motif tinted from `--cat`.

## The homepage camera flight

The homepage is a scroll-scrubbed camera walkthrough built with the
[kaiga](https://github.com/) skill (installed at `~/.claude/skills/kaiga`).

- Engine: `public/world/scrub-engine.js` — vendored verbatim, **do not port it into a
  component**. Its iOS poster/priming logic is load-bearing.
- Config + scene copy: `src/components/ScrollWorld.astro`.
- Architecture **A** (continuous walkthrough): 6 forward legs, no connectors. Each leg
  opens on the previous leg's actual last frame — that seam rule is the whole trick.
- Leg **ids and order are load-bearing** — `world/leg_*.txt` and `world/HANDOFF.md`
  are keyed to them. Scene copy is safe to edit; the `brows` and `lips` legs must keep
  describing brow and lip suites, because that is what their render prompts specify.
- The clips are not rendered yet; the flight runs on placeholder stills. Everything
  needed to render and drop them in is in `world/HANDOFF.md` (prompts, spec table,
  `bash world/encode.sh`).

The flight must stay the first element on the homepage — the engine reads `window.scrollY`
absolutely — and anything after it needs `position: relative; z-index: 30` over an opaque
background, since the engine's stage is `position: fixed` for the life of the page.
