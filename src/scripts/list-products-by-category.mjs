import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

async function run() {
  await mongoose.connect(MONGODB_URI);
  const col = mongoose.connection.db.collection('products');
  const products = await col.find({}, { projection: { slug: 1, name: 1, category: 1, featured: 1 } }).toArray();

  const byCat = {};
  for (const p of products) {
    (byCat[p.category] ||= []).push(`${p.slug}${p.featured ? ' [featured]' : ''}`);
  }
  for (const [cat, slugs] of Object.entries(byCat)) {
    console.log(`\n== ${cat} (${slugs.length}) ==`);
    slugs.forEach(s => console.log('  ' + s));
  }
  await mongoose.disconnect();
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
