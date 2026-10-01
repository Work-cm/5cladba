import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Updates etomidate products:
//  - priceVariants: 50g / 100g / 200g / 500g / 1kg tier pricing
//  - images[]: fetches each product page, extracts the /api/images/<id> URL,
//    downloads it to public/images/etomidate/<slug>.<ext> and links it.
//    (If a file already exists locally it is reused instead of re-downloaded.)
// Run: node src/scripts/update-etomidate.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const IMG_DIR = path.resolve(__dirname, '../../public/images/etomidate');

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  images: [String],
  priceVariants: [{ quantity: Number, price: Number }],
  price: Number,
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// quantity is in grams; 1000 = 1kg
const TIERS_700 = [
  { quantity: 50, price: 700 },
  { quantity: 100, price: 1250 },
  { quantity: 200, price: 2200 },
  { quantity: 500, price: 4500 },
  { quantity: 1000, price: 7500 },
];

const TIERS_800 = [
  { quantity: 50, price: 800 },
  { quantity: 100, price: 1400 },
  { quantity: 200, price: 2500 },
  { quantity: 500, price: 5200 },
  { quantity: 1000, price: 8500 },
];

const PRODUCTS = [
  { slug: 'etomidate-powder-pure', tiers: TIERS_700, page: 'https://www.etomidatesite.com/shop/etomidate-powder-pure' },
  { slug: 'etomidate-crystal', tiers: TIERS_700, page: 'https://www.etomidatesite.com/shop/etomidate-crystal' },
  { slug: 'cychlorphine-hcl-powder', tiers: TIERS_800, page: 'https://www.etomidatesite.com/shop/cychlorphine-hcl-powder' },
  { slug: 'medetomidine-powder', tiers: TIERS_800, page: 'https://www.etomidatesite.com/shop/medetomidine-powder' },
  { slug: 'tiletamine-powder', tiers: TIERS_800, page: 'https://www.etomidatesite.com/shop/tiletamine-powder' },
  { slug: 'spirochlorphine-r6890', tiers: TIERS_800, page: 'https://www.etomidatesite.com/shop/spirochlorphine-r6890' },
];

const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36' };

async function fetchProductImageUrl(pageUrl) {
  const res = await fetch(pageUrl, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/\/api\/images\/[a-z0-9]+/i);
  return m ? `https://www.etomidatesite.com${m[0]}` : null;
}

async function downloadImage(url, outBase) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = (res.headers.get('content-type') || '').split(';')[0].trim();
  const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif' }[type] || '.jpg';
  const buf = Buffer.from(await res.arrayBuffer());
  const outPath = `${outBase}${ext}`;
  fs.writeFileSync(outPath, buf);
  return { filename: path.basename(outPath), bytes: buf.length };
}

async function run() {
  await mongoose.connect(MONGODB_URI);

  fs.mkdirSync(IMG_DIR, { recursive: true });
  const files = fs.readdirSync(IMG_DIR);

  let updated = 0, imgOk = 0;
  for (const { slug, tiers, page } of PRODUCTS) {
    const set = { priceVariants: tiers, price: tiers[0].price };

    // Prefer an existing local file; otherwise scrape + download
    let match = files.find(f => f.startsWith(slug + '.'));
    if (!match) {
      try {
        const imgUrl = await fetchProductImageUrl(page);
        if (imgUrl) {
          const { filename, bytes } = await downloadImage(imgUrl, path.join(IMG_DIR, slug));
          files.push(filename);
          match = filename;
          imgOk++;
          console.log(`  image downloaded: ${filename} (${bytes} bytes)`);
        } else {
          console.warn(`  no /api/images URL found on ${page}`);
        }
      } catch (e) {
        console.error(`  image FAIL ${slug}: ${e.message}`);
      }
    }
    if (match) set.images = [`/images/etomidate/${match}`];

    const res = await Product.updateOne({ slug }, { $set: set });
    if (res.matchedCount === 0) {
      console.log(`  MISSING: ${slug}`);
      continue;
    }
    console.log(`  UPDATED: ${slug} -> ${tiers.length} tiers (from €${tiers[0].price}/50g)${match ? ` + image ${match}` : ''}`);
    updated++;
  }

  console.log(`\nDone — updated ${updated}/${PRODUCTS.length} products, ${imgOk} images downloaded`);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
