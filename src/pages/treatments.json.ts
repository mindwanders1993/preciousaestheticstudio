import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories, getCategory } from '../data/categories';
import { site } from '../data/site';
import { absolute, priceNumber } from '../lib/structured-data';

/**
 * The menu as data, for AI agents and anything else that would otherwise scrape the pages. It is built from the
 * same collection the pages are, so it cannot drift from them.
 */
export const GET: APIRoute = async ({ site: base }) => {
  const order = categories.map(c => c.id);
  const treatments = (await getCollection('treatments')).sort(
    (a, b) =>
      order.indexOf(a.data.category) - order.indexOf(b.data.category) || a.data.order - b.data.order,
  );

  const body = {
    studio: site.legalName,
    city: site.city,
    currency: 'INR',
    booking: absolute('/contact', base),
    note: 'Prices are confirmed at consultation. Nothing is paid on the site.',
    treatments: treatments.map(t => ({
      id: t.id,
      name: t.data.title,
      family: getCategory(t.data.category).label,
      price: t.data.price,
      priceInr: priceNumber(t.data.price) ?? null,
      priceNote: t.data.priceNote ?? null,
      duration: t.data.duration,
      sessions: t.data.sessions,
      requiresScreening: t.data.medical,
      summary: t.data.description,
      url: absolute(`/treatments/${t.id}`, base),
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
