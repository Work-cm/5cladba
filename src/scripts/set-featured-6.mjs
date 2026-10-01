import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const FEATURED_SLUGS = [
  // K2 Paper Sheets
  'diablo-k2-spray-on-paper',
  'ak47-adios-k2-paper',
  // K2 Liquid Spray
  'k2-e-liquid-code-red-spray',
  'diablo-k2-spray',
  // K2 Powder
  'jwh-018-powder',
  '5f-mdmb-2201-powder',
  // Etomidate
  'etomidate-powder-pure',
  'etomidate-crystal',
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  const col = mongoose.connection.db.collection('products');

  // Unfeature everything first, then feature the chosen slugs (2 per category)
  await col.updateMany({}, { $set: { featured: false } });
  const res = await col.updateMany({ slug: { $in: FEATURED_SLUGS } }, { $set: { featured: true } });
  console.log(`Featured set on ${res.modifiedCount} products`);
  console.log(`Total featured now: ${await col.countDocuments({ featured: true })}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
