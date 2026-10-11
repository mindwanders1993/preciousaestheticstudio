---
name: muda
description: Muda (無駄) — waste and hazard sweep for the Precious Aesthetic Studio website. Finds leftover Aura Blush strings, unused fields and orphan pictures, hard-coded colours, and stale statements in the inherited documents. Reports; removes nothing without a spec. Activate on "muda", "sweep", "what is dead here".
---

# 🧹 `muda` — Muda (無駄) — waste and hazard sweep

> **Objective**: From time to time — and at the end of phases 2, 3 and 4 — find dead weight (*muda*) and what
> the clone left behind. The sweep reports; each removal is then planned and built like any other change.

---

## 🔍 The 4 Muda Audit Passes

### 1. Leftover Source Audit
The name the code was written under, anywhere in the tree. Run the rebrand kata (`shiken`), which uses the
grep of `docs/02-REBRAND-CHECKLIST.md` §9. For each file listed, show the line:
```bash
grep -rInE 'aura ?blush|aurablush' src public world test \
  AGENTS.md DEPLOY.md HANDOFF-FOUNDER.md IMAGE-BRIEF.md PORTRAIT-BRIEF.md package.json astro.config.mjs
```

### 2. Dead Field and Orphan File Audit
- **Unused fields in `src/data/site.ts`** — the source carries `formEndpoint` and `formAccessKey`, which
  nothing reads. For each field, count its readers:
  ```bash
  git grep -n "site\.<field>" src/
  ```
- **Orphan pictures** — a file in `public/images/` that no content file, page or component names:
  ```bash
  for f in public/images/*; do git grep -q "$(basename "$f")" src/ || echo "orphan: $f"; done
  ```
- **Orphan content** — an FAQ filed under a family that no longer exists; a team member no page shows.
- **Unused components** — a file in `src/components/` that nothing imports.

### 3. Hard-Coded Colour Audit (rule 4)
A hex value in a page or component is a finding. Only `src/data/categories.ts` and the tokens at the top of
`src/styles/global.css` may hold one:
```bash
git grep -nE '#[0-9a-fA-F]{3,8}\b' -- 'src/**/*.astro' 'src/**/*.css' ':!src/styles/global.css'
```

### 4. Stale Document and Hazard Sweep
- The four stale statements of `docs/01-CLONE-PLAN.md` §10 — check each is corrected here, not copied.
- `AGENTS.md`, `DEPLOY.md` and the briefs describe this studio, this domain and this menu's counts.
- No secret in the tree: `git grep -nE 'TELEGRAM_BOT_TOKEN=.+|discord\.com/api/webhooks/'` prints nothing,
  and `.env.local` is in `.gitignore`.
- No `.vercel/` folder that belongs to another deployment.
- No dead link in copy or in the footer.

---

## 📋 Report
One list, worst first: the finding, the file and line, and what removing it would touch. Nothing is deleted by
this skill.
