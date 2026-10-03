import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Extracts description text + spec list items from dumped product page HTML.
// Run: node src/scripts/extract-etomidate-descs.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '../../.debug/etomidate');

function decodeEntities(s) {
  return s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '');
}

export function extractDescription(html) {
  // All <p> blocks; the description is the cluster of long paragraphs
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => decodeEntities(stripTags(m[1])).trim())
    .filter(t => t.length > 80);

  // Spec list items under the "Specifications" heading
  const specSection = html.match(/Specifications<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i);
  let specs = [];
  if (specSection) {
    specs = [...specSection[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(m => decodeEntities(stripTags(m[1])).trim())
      .filter(Boolean);
  }

  return { paras, specs };
}

for (const f of readdirSync(DIR).filter(f => f.endsWith('.html'))) {
  const html = readFileSync(path.join(DIR, f), 'utf8');
  const { paras, specs } = extractDescription(html);
  console.log(`\n===== ${f.replace('.html', '')} =====`);
  console.log(`paragraphs: ${paras.length}, specs: ${specs.length}`);
  paras.forEach((p, i) => console.log(`  P${i}: ${p.slice(0, 90)}...`));
  specs.forEach(s => console.log(`  SPEC: ${s}`));
}
