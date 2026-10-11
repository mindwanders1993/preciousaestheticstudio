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
  'sitemap-index.xml'
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
