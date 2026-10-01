import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Updates etomidate products' images[] to point at files placed in
// public/images/etomidate/. Drop files named after the product slug,
// e.g. etomidate-powder-pure.jpg, then run: node src/scripts/update-etomidate-images.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const IMG_DIR = path.resolve(__dirname, '../../public/images/etomidate');

const SLUGS = [
  'etomidate-powder-pure',
  'etomidate-crystal',
  'cychlorphine-hcl-powder',
  'medetomidine-powder',
  'tiletamine-powder',
  'spirochlorphine-r6890',
];

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String, images: [String],
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);

  const files = fs.existsSync(IMG_DIR) ? fs.readdirSync(IMG_DIR) : [];
  if (files.length === 0) {
    console.log(`No images found in ${IMG_DIR}`);
    console.log('Save product images there named like: etomidate-powder-pure.jpg');
    await mongoose.disconnect();
    return;
  }

  let updated = 0;
  for (const slug of SLUGS) {
    const match = files.find(f => f.startsWith(slug + '.'));
    if (!match) { console.log(`  no file for ${slug}`); continue; }
    const local = `/images/etomidate/${match}`;
    const res = await Product.updateOne({ slug }, { $set: { images: [local] } });
    if (res.modifiedCount > 0) {
      console.log(`  UPDATED ${slug} -> ${local}`);
      updated++;
    } else {
      console.log(`  no change for ${slug} (already set or missing)`);
    }
  }

  console.log(`\nDone — updated ${updated} products`);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
