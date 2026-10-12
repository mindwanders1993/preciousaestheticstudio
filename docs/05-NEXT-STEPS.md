# Next steps — from "ready to show" to the first customer

Written 12 Oct 2026, after the UI/UX review of the live site (`preciousaestheticstudio.vercel.app`).
Verdict: 7/10 for getting a first message; the missing points are inputs only Roshni can give.

## The order, and what each step unlocks

| # | Step | Who | What it changes on the site |
|---|---|---|---|
| 1 | **Roshni's WhatsApp number** (`+91…`) into `src/data/site.ts` | Roshni → developer | Every "Message" button, the phone bar and each treatment page become a WhatsApp chat with the text already written. The biggest single lever. |
| 2 | **One photo of Roshni in her real room** (phone-quality is fine) | Roshni | Goes on the homepage hero and the About page in place of the drawn motif. Customers book a person. |
| 3 | **Address, landmark, hours** | Roshni | Contact page, footer, structured data; a "Get directions" link to Google Maps. |
| 4 | **Google Business Profile** (needs the phone number and address to verify) | Roshni or developer | "Microblading Varanasi" searches reach Maps before websites. Link it from the site's structured data. |
| 5 | **Answers to the five "must" questions** (`docs/04-FOR-ROSHNI.md` §1) | Roshni | The four thin treatment pages get real content, or come off; the dermatologist wording is confirmed or the two treatments go. |
| 6 | **Hindi on every treatment page** for price, pain and number of visits | developer, Roshni checks | The three questions her audience asks, in the language they ask them. |
| 7 | **Launch**: `launched: true` by pull request, attach the domain, redeploy, check the sitemap | developer | The site becomes visible to search engines. Not before 1, 3 and 5. |
| 8 | **After the first ten customers**: ask each for a line, with permission | Roshni | Reviews return to the navigation and replace "Your first visit" as the trust engine. |

## Open on the developer's side

- The **test booking** from the live contact page: confirm it arrives in the Telegram group (A), or report the
  error (B). Nothing is launched until a booking is seen to arrive.
- **Analytics**: open the live site once and confirm the Vercel Analytics page counts a visitor.
- Add Roshni to the Telegram group once she is ready to receive requests herself.
- Confirm the origin of the eight older pictures (`docs/IMAGE-SOURCES.md`).

## Remaining weaknesses, for honesty

In order: no real face or room on the site · the contact form as the only live channel (the Instagram handle was the source site's, removed 12 Oct 2026) · no address · copy still
long and formal in places · four placeholder treatment pages · the "Whitening" names (hers; a legal line is
held) · no reviews (correct, but felt). Each is addressed by a row above.

## How to know it is working

Vercel Analytics: visitors who reach `/prices` or the homepage price list; taps on the message buttons;
where phone visitors leave. Ask every first consultation "how did you find us?" and write it down. Review
monthly; change one thing at a time.
