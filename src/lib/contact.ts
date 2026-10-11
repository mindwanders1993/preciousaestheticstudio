import { site } from '../data/site';

/**
 * How a visitor reaches the studio (docs/specs/P9-first-customer.md).
 *
 * The one action the site exists for is a first message. In India that message is a WhatsApp, so the
 * moment `site.whatsapp` is filled in every "message us" button becomes a WhatsApp link with the text
 * already written. Until then the buttons lead to Instagram, which is the account the studio has today.
 * Nothing here is typed twice: the number and the handle live in `site.ts` (rule 1).
 */

export const BOOK_LABEL = 'Book a free consultation';

/** A WhatsApp click-to-chat link with a prefilled message, or null while there is no number. */
export function whatsappLink(treatment?: string): string | null {
  const digits = (site.whatsapp.href || site.whatsapp.display).replace(/\D/g, '');
  if (!digits) return null;
  const text = treatment
    ? `Hi, I'd like a free consultation for ${treatment} at ${site.legalName}.`
    : `Hi, I'd like a free consultation at ${site.legalName}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** The best live channel for a message right now, with a label a button can show. */
export function messageLink(treatment?: string): { label: string; href: string; channel: 'whatsapp' | 'instagram' } {
  const wa = whatsappLink(treatment);
  return wa
    ? { label: 'Message on WhatsApp', href: wa, channel: 'whatsapp' }
    : { label: 'Message on Instagram', href: site.social.instagram.href, channel: 'instagram' };
}
