import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  priceVariants: [{ quantity: Number, price: Number }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Uniform ladder for every k2-powder product (quantity in grams)
const LADDER = [
  { quantity: 50, price: 470 },
  { quantity: 100, price: 630 },
  { quantity: 500, price: 1100 },
  { quantity: 1000, price: 2300 },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const products = await Product.find({ category: 'k2-powder' });
  for (const p of products) {
    p.priceVariants = LADDER.map(v => ({ ...v }));
    await p.save();
    console.log(`${p.slug}: ${p.priceVariants.map(v => `${v.quantity}g=€${v.price}`).join(' | ')}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
