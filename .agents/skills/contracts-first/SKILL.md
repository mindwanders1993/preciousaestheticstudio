---
name: contracts-first
description: Schema-first protocol for the Precious Aesthetic Studio website. A new field, collection, business fact or category is defined in src/content.config.ts or the data modules, and checked, before any page or component reads it.
user-invocable: false
---

# 📜 `contracts-first` — Schema first

> **Objective**: Keep `src/content.config.ts`, `src/data/site.ts` and `src/data/categories.ts` the only places
> where the shape of the site's content and the studio's facts are defined.

---

## 🚫 Cardinal Rule: No Ad-Hoc Copies
No page or component keeps its own list of treatments, its own copy of a business fact, or its own idea of
what a treatment's frontmatter holds. Each of these has one home:

| What | Home |
|---|---|
| The fields of a treatment, FAQ, team member or review | `src/content.config.ts` |
| The studio's name, place, contact details, hours, payments | `src/data/site.ts` (rule 1) |
| The service families — id, label, copy, colour | `src/data/categories.ts` (rule 4) |

---

## 🛠️ Execution Sequence

### 1. Define it at its home first
- **A new content field**: add it to the collection's schema in `src/content.config.ts`. Make it optional
  unless every existing file will carry it in the same change.
- **A new business fact**: add it to `src/data/site.ts`. Leave it blank if it is not known (rule 6).
- **A new or removed family**: change `src/data/categories.ts` only; the colour tokens follow from it.

### 2. Check before anything reads it
```bash
npm run check
```
It validates every content file against its schema. A red check here is fixed here, not worked around in
the page.

### 3. Then consume it
- Pages read collections with `getCollection()` and facts from the `site` and category modules.
- A treatment added or removed changes the page list in `test/ci.test.js` in the same commit (`shiken`).

### 4. Keep the clinical fields honest
`sessions`, `downtime`, `results`, `bestFor`, `notFor`, `medical` and `medicalNote` are clinical, not
decorative. `medical: true` is what renders the screening notice (rule 3); it is never dropped to tidy a card.
