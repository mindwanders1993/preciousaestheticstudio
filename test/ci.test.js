import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const baseDistDir = path.resolve('dist');
const distDir = fs.existsSync(path.join(baseDistDir, 'client')) 
  ? path.join(baseDistDir, 'client') 
  : baseDistDir;
const treatmentsDir = path.resolve('src/content/treatments');

let passed = 0;
let failed = 0;

function it(title, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${title}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${title}\n    -> ${err.message}`);
  }
}

console.log('\n=== CI/CD Quality Gate & Verification Suite ===\n');

console.log('--- 1. Static Build Output Verification ---');
it('dist directory exists', () => {
  assert(fs.existsSync(distDir), 'dist directory missing. Run `npm run build` first.');
});

const expectedPages = [
  'index.html',
  'treatments/index.html',
  'treatments/aura-whitening/index.html',
  'treatments/glass-skin/index.html',
  'treatments/japanese-glow/index.html',
  'treatments/laser-hair-removal/index.html',
  'treatments/lip-blush/index.html',
  'treatments/microblading/index.html',
  'treatments/microneedling/index.html',
  'treatments/mole-removal/index.html',
  'treatments/ppet/index.html',
  'treatments/skin-whitening/index.html',
  'treatments/under-eye/index.html',
  'treatments/vitiligo/index.html',
  'artist/index.html',
  'about/index.html',
  'reviews/index.html',
  'contact/index.html',
  'sitemap-index.xml',
  'robots.txt',
  'llms.txt',
  'treatments.json'
];

for (const page of expectedPages) {
  it(`dist/${page} exists and has valid content`, () => {
    const fullPath = path.join(distDir, page);
    assert(fs.existsSync(fullPath), `dist/${page} is missing`);
    const size = fs.statSync(fullPath).size;
    assert(size > 100, `dist/${page} is abnormally small (${size} bytes)`);
  });
}

console.log('\n--- 2. Content & Clinical Rules Compliance ---');
const treatmentFiles = fs.readdirSync(treatmentsDir).filter(f => f.endsWith('.md'));
it('exactly 12 treatments are declared in content collection', () => {
  assert.strictEqual(treatmentFiles.length, 12, `Expected 12 treatments, found ${treatmentFiles.length}`);
});

// Site rule 2 (docs/specs/P3-content.md §4): "whitening" may appear in a treatment's name, as the owner
// gave it; no page may promise fairer or lighter skin.
it('No treatment or FAQ promises fairer or lighter skin (site rule 2)', () => {
  const promise = /\bfairer\b|\bfairness\b|\blighter (skin|complexion)\b|\blighten(s|ing)? (your|the) (skin|complexion)\b|\bwhiter\b/i;
  const faqsDir = path.resolve('src/content/faqs');
  const files = [
    ...treatmentFiles.map(f => path.join(treatmentsDir, f)),
    ...fs.readdirSync(faqsDir).filter(f => f.endsWith('.md')).map(f => path.join(faqsDir, f)),
  ];
  for (const file of files) {
    const hit = fs.readFileSync(file, 'utf8').match(promise);
    assert(!hit, `${path.basename(file)} promises a skin-tone change: "${hit && hit[0]}"`);
  }
});

it('Mole removal requires written dermatologist clearance', () => {
  const content = fs.readFileSync(path.join(treatmentsDir, 'mole-removal.md'), 'utf8');
  assert(content.includes('dermatologist'), 'Dermatologist clearance missing');
  assert(content.includes('radiofrequency'), 'RF specification missing');
});

it('Laser Hair Removal mandates Nd:YAG 1064nm and patch test', () => {
  const content = fs.readFileSync(path.join(treatmentsDir, 'laser-hair-removal.md'), 'utf8');
  assert(content.includes('Nd:YAG') || content.includes('1064nm'), 'Nd:YAG 1064nm spec missing');
  assert(content.includes('patch test') || content.includes('Patch test'), 'Patch test requirement missing');
});

console.log('\n--- 3. Category Tokens & Engine Integrity ---');
it('Layout HTML emits all 4 category custom properties (--cat-*)', () => {
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  assert(indexHtml.includes('--cat-pmu:'), 'PMU category token missing');
  assert(indexHtml.includes('--cat-skin:'), 'Skin category token missing');
  assert(indexHtml.includes('--cat-pigment:'), 'Pigment category token missing');
  assert(indexHtml.includes('--cat-clinical:'), 'Clinical category token missing');
});

it('scrub-engine.js exists in public and dist', () => {
  assert(fs.existsSync(path.resolve('public/world/scrub-engine.js')), 'public/world/scrub-engine.js missing');
  assert(fs.existsSync(path.join(distDir, 'world/scrub-engine.js')), 'dist/world/scrub-engine.js missing');
});

console.log('\n--- 3b. Search & Agent Readiness (docs/specs/P6-discoverability.md) ---');
const ldBlocks = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));

it('every page carries the studio as structured data, a canonical link and a social picture', () => {
  for (const page of ['index.html', 'treatments/index.html', 'contact/index.html']) {
    const html = fs.readFileSync(path.join(distDir, page), 'utf8');
    assert(ldBlocks(html).some(b => b['@type'] === 'BeautySalon'), `${page}: BeautySalon data missing`);
    assert(html.includes('<link rel="canonical"'), `${page}: canonical link missing`);
    assert(html.includes('property="og:image"'), `${page}: social picture missing`);
  }
});

it('each treatment page describes itself as a Service, priced in INR where it has a price', () => {
  for (const file of treatmentFiles) {
    const slug = file.replace(/\.md$/, '');
    const html = fs.readFileSync(path.join(distDir, 'treatments', slug, 'index.html'), 'utf8');
    const service = ldBlocks(html).find(b => b['@type'] === 'Service');
    assert(service, `${slug}: Service data missing`);
    if (service.offers) assert.strictEqual(service.offers.priceCurrency, 'INR', `${slug}: currency`);
  }
});

it('the treatments page marks up exactly the questions it shows', () => {
  const html = fs.readFileSync(path.join(distDir, 'treatments/index.html'), 'utf8');
  const faq = ldBlocks(html).find(b => b['@type'] === 'FAQPage');
  assert(faq, 'FAQPage data missing');
  const shown = (html.match(/<details class="faq-item"/g) || []).length;
  assert.strictEqual(faq.mainEntity.length, shown, `FAQ data has ${faq.mainEntity.length}, page shows ${shown}`);
});

it('llms.txt and treatments.json list every treatment', () => {
  const llms = fs.readFileSync(path.join(distDir, 'llms.txt'), 'utf8');
  const menu = JSON.parse(fs.readFileSync(path.join(distDir, 'treatments.json'), 'utf8'));
  assert.strictEqual(menu.treatments.length, treatmentFiles.length, 'treatments.json is missing treatments');
  for (const t of menu.treatments) assert(llms.includes(t.url), `llms.txt does not link ${t.id}`);
});

it('no structured data states a rating, a review or opening hours (site rule 6)', () => {
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const text = JSON.stringify(ldBlocks(html));
  assert(!/aggregateRating|"review"|openingHours/i.test(text), 'unconfirmed facts in structured data');
});

console.log('\n--- 3d. Pictures (docs/IMAGE-SOURCES.md) ---');
it('every picture a treatment names exists', () => {
  for (const file of treatmentFiles) {
    const image = fs.readFileSync(path.join(treatmentsDir, file), 'utf8').match(/^image:\s*"([^"]+)"/m)?.[1];
    if (image) assert(fs.existsSync(path.resolve('public', image.replace(/^\//, ''))), `${file}: ${image} is missing`);
  }
});

it('every picture in public/images has its origin recorded', () => {
  const sources = fs.readFileSync(path.resolve('docs/IMAGE-SOURCES.md'), 'utf8');
  for (const file of fs.readdirSync(path.resolve('public/images'))) {
    if (file.startsWith('.')) continue;
    assert(sources.includes('`' + file + '`'), `${file} has no row in docs/IMAGE-SOURCES.md`);
  }
});

console.log('\n--- 3c. Launch Switch (docs/specs/P7-not-launched.md) ---');
// `launched` in src/data/site.ts decides whether the site may be indexed. The pages and robots.txt must
// both follow it — one saying "stay out" while the other says "come in" is the failure this guards.
const launched = /\blaunched:\s*true\b/.test(fs.readFileSync(path.resolve('src/data/site.ts'), 'utf8'));
it(`pages and robots.txt agree with site.launched (${launched})`, () => {
  const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
  const blocksAll = /^Disallow: \/$/m.test(robots);
  assert.strictEqual(blocksAll, !launched, `robots.txt ${blocksAll ? 'blocks' : 'allows'} crawlers`);
  assert.strictEqual(/^Sitemap: /m.test(robots), launched, 'robots.txt sitemap line');
  for (const page of expectedPages.filter(p => p.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(distDir, page), 'utf8');
    const noindex = /<meta name="robots" content="noindex, nofollow">/.test(html);
    assert.strictEqual(noindex, !launched, `${page}: noindex is ${noindex ? 'present' : 'absent'}`);
  }
});

console.log('\n--- 4. Inbound Booking & Telegram Notification Route ---');
it('src/pages/api/contact.ts exists with Telegram bot integration', () => {
  const contactApi = fs.readFileSync(path.resolve('src/pages/api/contact.ts'), 'utf8');
  assert(contactApi.includes('TELEGRAM_BOT_TOKEN'), 'TELEGRAM_BOT_TOKEN environment check missing');
  assert(contactApi.includes('api.telegram.org/bot'), 'Telegram sendMessage API call missing');
  assert(contactApi.includes('export const prerender = false'), 'prerender = false missing for serverless execution');
});

console.log('\n===============================================');
console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('===============================================\n');

if (failed > 0) {
  process.exit(1);
}
