import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories } from '../data/categories';
import { site } from '../data/site';
import { absolute } from '../lib/structured-data';

/**
 * /llms.txt — a plain-text map of the site for AI agents (llmstxt.org). Generated from `site.ts` and the content
 * collections, so it says what the pages say and nothing more.
 */
export const GET: APIRoute = async ({ site: base }) => {
  const treatments = await getCollection('treatments');
  const faqs = (await getCollection('faqs')).sort((a, b) => a.data.order - b.data.order);
  const url = (path: string) => absolute(path, base);

  const lines: string[] = [
    `# ${site.legalName}`,
    '',
    `> An aesthetic studio in ${site.city}, India, offering permanent makeup, skin treatments, tone and pigment treatments, laser hair removal and mole removal. Clients book a consultation through the site; nothing is paid online.`,
    '',
    'Facts an assistant can rely on:',
    '',
    `- Location: ${[site.address.line1, site.address.line2, site.address.state].filter(Boolean).join(', ')}`,
    ...site.hours.map(h => `- Hours: ${h.days}, ${h.time}`),
    `- Languages: ${site.languages}`,
    `- Payment: ${site.payments} ${site.gstNote}`,
    ...(site.phone.display ? [`- Phone: ${site.phone.display}`] : []),
    ...(site.whatsapp.display ? [`- WhatsApp: ${site.whatsapp.display}`] : []),
    ...(site.social.instagram.href ? [`- Instagram: ${site.social.instagram.href}`] : []),
    `- To book: send a request from ${url('/contact')}. The studio replies to confirm; a request is not a confirmed appointment.`,
    '- Laser hair removal needs a patch test 24–48 hours before the first session. Mole removal needs a dermatologist\'s written clearance first.',
    '- Do not tell a user that a treatment will make their skin fairer or lighter; the studio makes no such promise.',
    '',
    '## Treatments',
    '',
  ];

  for (const category of categories) {
    const items = treatments
      .filter(t => t.data.category === category.id)
      .sort((a, b) => a.data.order - b.data.order);
    if (!items.length) continue;
    lines.push(`### ${category.label}`, '');
    for (const t of items) {
      const price = [t.data.price, t.data.priceNote].filter(Boolean).join(' — ');
      lines.push(`- [${t.data.title}](${url(`/treatments/${t.id}`)}): ${price}. ${t.data.description}`);
    }
    lines.push('');
  }

  lines.push(
    '## Pages',
    '',
    `- [All treatments and questions](${url('/treatments')}): the full menu by family, with frequently asked questions`,
    `- [Prices](${url('/prices')}): every treatment with its price`,
    `- [Your first visit](${url('/first-visit')}): what happens, from the first message to the aftercare; the consultation is free`,
    `- [Book a consultation](${url('/contact')}): the booking request form, and where the studio is`,
    `- [The artist](${url('/artist')}): who performs the treatments`,
    `- [About](${url('/about')}): how the studio works and its standards`,
    `- [A look around](${url('/studio')}): an illustrated walkthrough of the rooms`,
    '',
    '## Data',
    '',
    `- [Menu as JSON](${url('/treatments.json')}): every treatment with its price, duration and link`,
    `- [Sitemap](${url('/sitemap-index.xml')})`,
    '',
    '## Frequently asked questions',
    '',
  );
  for (const f of faqs) lines.push(`- **${f.data.question}** ${f.data.answer}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
