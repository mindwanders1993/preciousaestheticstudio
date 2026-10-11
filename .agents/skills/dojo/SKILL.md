---
name: dojo
description: Dōjō (道場) — local development SOP for the Precious Aesthetic Studio website. Runs the Astro dev server in the background on port 4321, sets up .env.local for the booking route, and prevents the one trap of a cloned site - sending test bookings to the other studio's chat. Activate on "dojo", "start the site", "run it locally".
---

# 🥋 `dojo` — Dōjō (道場) — the local environment

> **Objective**: Run the site locally, cleanly, and never deliver a test booking to someone else's chat.

---

## 🚫 The Trap (Never the Other Studio's Chat!)
- This site is a clone. The source's `.env.local` holds **Aura Blush's** Telegram bot token and chat id.
- That file is not copied (`migration-bridge`), and its values are never typed in here. A booking sent from
  this project with those values lands in another business's phone (rule 7).
- Until this studio has a bot and a chat of its own, leave the values unset: the form then fails cleanly,
  which is the correct behaviour.

| What | Where |
| :--- | :--- |
| Dev server | `http://localhost:4321/` |
| Booking route | `POST http://localhost:4321/api/contact` |
| Node | **≥ 22.12** (`node -v`) |
| Package manager | `npm` — the lockfile is `package-lock.json` |

---

## 🛠️ Environment Startup Protocol

### 1. Install
```bash
npm ci
```

### 2. Environment file
```bash
cp .env.example .env.local      # once; it is git-ignored
```
| Variable | For |
| :--- | :--- |
| `TELEGRAM_BOT_TOKEN` | this studio's bot |
| `TELEGRAM_CHAT_ID` | the chat that receives booking requests |
| `DISCORD_WEBHOOK_URL` | optional second destination |

The owner fills these in. An agent never reads `.env.local` back into the conversation.

### 3. Run
```bash
astro dev --background          # start
astro dev status                # is it up?
astro dev logs                  # what it printed
astro dev stop                  # stop it when the work is done
```

### 4. The built site
```bash
npm run build && npm run preview
```
The booking form posts to a server route, so it works on the dev server and on a deployment — **not** from
`dist/` files opened straight in a browser. If preview does not serve the route with the Vercel adapter, test
the form on the dev server or on a Vercel preview deployment.

---

## 🔍 Self-Check Command
```bash
curl -sf -o /dev/null http://localhost:4321/ && echo "✓ site up on 4321" || echo "❌ nothing on port 4321 — run: astro dev status"
```

## 🧯 When it will not start
- **Port 4321 is taken** → an old server is still running: `astro dev stop`, then start again. Do not move
  to another port; `gemba` and the notes assume 4321.
- **Schema error on start** → a content file does not match `src/content.config.ts`; `npm run check` names it.
- **Stale output** → delete `.astro/` and `dist/` (both are rebuilt) and start again.
