import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const API_URL = 'https://www.researchchems.online/api/products?category=cannabinoids';
const IMG_DIR = path.resolve(__dirname, '../../public/images/k2-powder');

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  images: [String], description: String,
  priceVariants: [{ quantity: Number, price: Number }],
  price: Number,
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

function filenameFromUrl(slug, url) {
  const ext = path.extname(new URL(url).pathname).toLowerCase() || '.jpg';
  const safe = slug.replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-');
  return `${safe}-powder${ext}`;
}

async function downloadImage(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

async function run() {
  const res = await fetch(API_URL);
  if (!res.ok) { console.error(`API failed: ${res.status}`); process.exit(1); }
  const products = await res.json();
  console.log(`Fetched ${products.length} products`);

  fs.mkdirSync(IMG_DIR, { recursive: true });

  await mongoose.connect(MONGODB_URI);

  let added = 0, skipped = 0, failed = 0;
  for (const p of products) {
    const slug = `${p.slug}-powder`;
    const imgUrl = p.images?.[0];
    let localImage = '';
    if (imgUrl) {
      const filename = filenameFromUrl(p.slug, imgUrl);
      const outPath = path.join(IMG_DIR, filename);
      try {
        const bytes = await downloadImage(imgUrl, outPath);
        localImage = `/images/k2-powder/${filename}`;
        console.log(`  image: ${filename} (${bytes} bytes)`);
      } catch (e) {
        console.error(`  image FAIL ${p.name}: ${e.message}`);
        failed++;
      }
    }

    const exists = await Product.findOne({ slug });
    if (exists) { console.log(`  SKIP (exists): ${p.name}`); skipped++; continue; }

    const data = {
      name: p.name,
      slug,
      category: 'k2-powder',
      images: localImage ? [localImage] : [],
      description: p.description || '',
      priceVariants: p.priceVariants?.map(v => ({ quantity: v.quantity, price: v.price })),
      price: p.price ?? (p.priceVariants?.[0]?.price ?? 0),
      countInStock: p.countInStock ?? 50,
      rating: p.rating ?? 4.8,
      numReviews: p.numReviews ?? 10,
      featured: false,
    };

    await Product.create(data);
    console.log(`  ADDED: ${p.name}`);
    added++;
  }

  console.log(`\nDone — added ${added}, skipped ${skipped}, image failures ${failed}`);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
