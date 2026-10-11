import { site } from '../data/site';

/**
 * Structured data for search engines and AI agents (docs/specs/P6-discoverability.md).
 *
 * Everything here mirrors what a visitor can already read on the page. Nothing is stated that the site does
 * not show — no rating, no opening hours until the owner confirms them, no street address until there is one
 * (site rule 6).
 */

export const absolute = (path: string, base: URL | undefined) =>
  base ? new URL(path, base).href : path;

/** "₹25,000" → 25000; "Price on consultation" → undefined. */
export const priceNumber = (price: string): number | undefined => {
  const digits = price.match(/₹\s*([\d,]+)/)?.[1];
  return digits ? Number(digits.replace(/,/g, '')) : undefined;
};

export const salonId = (base: URL | undefined) => absolute('/#studio', base);

export function salonSchema(base: URL | undefined) {
  const sameAs = [site.social.instagram.href].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': salonId(base),
    name: site.legalName,
    url: absolute('/', base),
    image: absolute('/images/hero.jpg', base),
    address: {
      '@type': 'PostalAddress',
      ...(site.address.line1 ? { streetAddress: site.address.line1 } : {}),
      addressLocality: site.city,
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: site.city,
    currenciesAccepted: 'INR',
    ...(site.phone.display ? { telephone: site.phone.display } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function treatmentSchema(
  t: { id: string; data: { title: string; description: string; price: string; image?: string } },
  familyLabel: string,
  base: URL | undefined,
) {
  const price = priceNumber(t.data.price);
  const url = absolute(`/treatments/${t.id}`, base);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: t.data.title,
    description: t.data.description,
    serviceType: familyLabel,
    url,
    ...(t.data.image ? { image: absolute(t.data.image, base) } : {}),
    provider: { '@id': salonId(base) },
    areaServed: site.city,
    ...(price !== undefined
      ? { offers: { '@type': 'Offer', price, priceCurrency: 'INR', url } }
      : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[], base: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absolute(step.path, base),
    })),
  };
}

export function faqSchema(faqs: { data: { question: string; answer: string } }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.data.question,
      acceptedAnswer: { '@type': 'Answer', text: f.data.answer },
    })),
  };
}
