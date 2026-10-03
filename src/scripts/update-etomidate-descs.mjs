import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Extracts real product descriptions + spec lists from dumped HTML pages
// (.debug/etomidate/<slug>.html) and writes them to MongoDB.
// Run: node src/scripts/update-etomidate-descs.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const DIR = path.resolve(__dirname, '../../.debug/etomidate');

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String, description: String,
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

const stripTags = (s) => s.replace(/<[^>]+>/g, '');

const NAMES = {
  'etomidate-powder-pure': 'Etomidate Powder Pure',
  'etomidate-crystal': 'Etomidate Crystal',
  'cychlorphine-hcl-powder': 'Cychlorphine HCL Powder',
  'medetomidine-powder': 'Medetomidine Powder',
  'tiletamine-powder': 'Tiletamine Powder',
  'spirochlorphine-r6890': 'Spirochlorphine R6890',
};

function extract(html, slug) {
  // The product description lives in one big <p> that also contains the
  // breadcrumb/title/rating text: "Home Shop {Name} In Stock 5.0 (N reviews) {Name} {DESC...}"
  const descMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>\s*<div class="mb-6">/i);
  let desc = '';
  if (descMatch) {
    let text = decodeEntities(stripTags(descMatch[1]));
    // Drop everything up to and including "(N reviews)"
    const cut = text.search(/\(\d+\s*reviews?\)/i);
    if (cut !== -1) {
      text = text.slice(text.indexOf(')', cut) + 1).trim();
    }
    // Drop the repeated product name that follows the review count
    const name = NAMES[slug];
    if (name && text.toLowerCase().startsWith(name.toLowerCase())) {
      text = text.slice(name.length).trim();
    }
    desc = text;
  }

  const specSection = html.match(/Specifications<\/h3>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i);
  const specs = specSection
    ? [...specSection[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map(m => decodeEntities(stripTags(m[1])).trim())
        .filter(s => s && !/product image/i.test(s))
    : [];

  return { desc, specs };
}

async function run() {
  await mongoose.connect(MONGODB_URI);

  const files = readdirSync(DIR).filter(f => f.endsWith('.html'));
  for (const f of files) {
    const slug = f.replace('.html', '');
    const html = readFileSync(path.join(DIR, f), 'utf8');
    const { desc, specs } = extract(html, slug);

    if (!desc) { console.error(`${slug}: NO DESCRIPTION extracted`); continue; }

    const full = specs.length
      ? `${desc}\n\nSpecifications:\n${specs.map(s => `- ${s}`).join('\n')}`
      : desc;

    const res = await Product.updateOne({ slug }, { $set: { description: full } });
    console.log(`${slug}: ${desc.length} chars + ${specs.length} specs -> ${res.matchedCount ? 'UPDATED' : 'NOT FOUND'}`);
    console.log(`  preview: ${desc.slice(0, 110)}...`);
  }

  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
