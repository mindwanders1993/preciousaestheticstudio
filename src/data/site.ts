/**
 * Business details, in one place.
 *
 * These were hardcoded in both the Layout footer and the contact page, which
 * meant relocating the studio required editing the same address twice. Anything
 * that would change if the studio moved, or changed its hours or its number,
 * belongs here.
 */
export const site = {
  name: 'Precious Aesthetic',
  legalName: 'Precious Aesthetic Studio',
  city: 'Varanasi',

  /**
   * Is the site public yet?
   *
   * While this is false, every page tells search engines not to index it and
   * `/robots.txt` tells crawlers to stay out, so the site can sit on a host and
   * be shown to the owner without turning up in search. Set it to true to launch
   * — and only once the "must be answered" items of docs/04-FOR-ROSHNI.md are
   * settled (docs/specs/P7-not-launched.md).
   */
  launched: false as boolean,

  /**
   * Locality confirmed as Sigra. The building/street line and the landmark are
   * still unknown — leave them blank rather than inventing them; both render
   * only when filled in. See HANDOFF-FOUNDER.md §16.
   */
  address: {
    /** e.g. 'Shop 4, Ravi Complex' — awaiting the actual building/street. */
    line1: '',
    line2: 'Sigra, Varanasi',
    state: 'Uttar Pradesh, India',
    /** Landmark directions matter more than a postcode here, once known. */
    landmark: '',
  },

  /**
   * PLACEHOLDER — awaiting Roshni's real numbers. Both render only when
   * `display` is filled in, so the site shows no phone at all rather than a
   * dummy one. Set `display` and `href` together. See HANDOFF-FOUNDER.md §17.
   */
  phone: { display: '', href: '' },
  whatsapp: { display: '', href: '' },
  /** PLACEHOLDER — no studio address yet. Instagram DM is the live channel. */
  email: '',

  hours: [
    { days: 'Tuesday – Sunday', time: '10:00 – 20:00' },
    { days: 'Monday',           time: 'Closed' },
  ],

  social: {
    instagram: { handle: '@1leeja10', href: 'https://www.instagram.com/1leeja10' },
  },

  languages: 'Hindi, English, Bhojpuri',
  payments: 'Payment is taken at the studio.',

  /**
   * Shown in the footer and on the contact page. It says nothing about tax:
   * whether the studio's prices include GST is not confirmed (docs/04-FOR-ROSHNI.md).
   */
  gstNote: 'Prices are confirmed with you at consultation. Nothing is paid on this site.',
  currency: '₹',
} as const;
