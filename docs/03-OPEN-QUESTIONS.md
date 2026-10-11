# Open questions

Written 10 Oct 2026. Nothing is known yet about Precious Aesthetic Studio beyond its domain name, so nothing
about it is assumed in the other two documents. Each question below says what it changes and what the plan
does until it is answered.

## About the studio — these block phase 3

| # | Question | What it changes |
|---|---|---|
| 4 | **The name, exactly, and where it is.** Is it "Precious Aesthetic Studio"? Country, city, locality, street address, a landmark; opening hours; languages spoken; how clients pay. | `src/data/site.ts`, every page title, the place-specific copy and two FAQs. The country decides the currency, the tax line and whether the two legal rules of plan §7 apply as written. |
| 5 | **Who runs it.** Name and title, training and certificates, years of experience, why she or he opened it, a portrait. The source's `HANDOFF-FOUNDER.md` already asks all of this in order — reuse it. | The artist page, the about page, the team collection, the booking page's wording. |
| 6 | **Laser and mole removal.** Does the studio own or have access to a laser, and which one? Is anyone trained to remove moles? Is there a real dermatologist who screens clients — and may she or he be named? | With no real screening arrangement, both treatments, their FAQs and the fourth family go. The source's wording promises that screening on eleven pages; it cannot be shipped as a promise nobody keeps. |
| 7 | **The menu and the prices.** Which of the ten treatments, anything the source does not have, and each price including tax. | The treatments collection, the test's page list, the homepage's price rail. |
| 8 | **How clients reach the studio, and where bookings land.** Phone, WhatsApp, Instagram, email. Booking requests go to a Telegram chat — whose, and is a Discord channel wanted as well? | `site.ts`, the contact page, and the secrets of the new deployment. Until there is a chat of its own, the form must not be switched on. |

## About the site — these can wait until their phase

| # | Question | Phase | Until answered |
|---|---|---|---|
| 9 | **The same design in new colours, or a look of its own?** A logo, a palette, type. Two studios in one market on one design will be recognised as the same hand. | 5 | The same design; palette decided once the name and logo are |
| 10 | **The homepage flight** — keep it on stills, render the six clips (video credits, and prompts rewritten for this studio's rooms), or open on a plain hero picture. | 3–4 | Kept on stills, as the source is |
| 11 | **Pictures.** Has the studio photographs of its own room and its own work — before and after, with each client's permission? | 4 | Stock for treatments; no picture of a room or a person until there is a real one |
| 12 | **Reviews.** Are there real ones, and has each client agreed to be quoted? | 7 | The page stays empty and says so |
| 13 | **Domain and hosting.** Is `preciousaestheticstudio.com` registered, and where? Vercel's free plan is for non-commercial sites — pay for Pro, or host elsewhere (the booking route then needs that host's adapter). The GitHub repository's owner, name and whether it is private. | 6 | Vercel, as the source; a private repository |

## Answers

*(Write each answer here with its date; move the row out of its table when the other documents have been
updated to match.)*

**1. Its own repository — the same owner** (11 Oct 2026, corrected the same day). Precious Aesthetic Studio has
its own repository, history and deployment — instead of renaming Aura Blush inside its repository, because
the two must not share a deployment or a booking chat. It is not a second studio with different people: it is
Roshni Verma's own studio in Varanasi, and her details, the city and the Instagram account are carried over
from the Aura Blush site until she replaces them.

**2. It starts with Aura Blush's content** (11 Oct 2026). The ten treatments, the FAQs and the page copy are
copied as a first draft and edited in phase 3 — instead of empty collections written from scratch, because
editing is faster and the grep of checklist §9 guards against the source's wording surviving.

**3. The `lets-scroll` → `kaiga` rename is committed in aurablush first** (11 Oct 2026) — instead of cloning
from a working tree with five uncommitted files, because a clone taken from one commit can be checked against
it later.

**4, 5, 7, 8 — in part** (11 Oct 2026, from the owner; spec `docs/specs/P3-content.md`).

- *The name and the place (4):* Precious Aesthetic Studio, Varanasi. Address, hours and languages are still the
  Aura Blush site's and wait on Roshni. Nobody pays on the site.
- *Who runs it (5):* Roshni Verma, the owner. Her bio and portrait are carried over for now.
- *The menu and prices (7):* twelve treatments under her names, with her prices — the table in the spec's §1.
  "Whitening" stays in two names, instead of Brightening or Glow, because they are the names she gave.
- *Contact and bookings (8):* Instagram is the Aura Blush account for now. A Telegram bot and chat of this
  studio's own are still to be created; WhatsApp, email and her real Instagram come later.
- *Laser and mole removal (6):* not answered. Both stay on the menu with their screening wording, and the
  question goes to Roshni before the site is public.

What is still open is asked of Roshni in `docs/04-FOR-ROSHNI.md`.

**13 — in part** (11 Oct 2026). The first deployment is a Vercel preview to show Roshni; the domain is attached
after she approves — instead of going straight to `preciousaestheticstudio.com`, because she has not seen the
site. The GitHub repository is public.
