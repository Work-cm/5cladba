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
  images: [String], description: String,
  priceVariants: [{ quantity: Number, price: Number }],
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// quantity = bottle size in ml
const SHARED_FACTS = `Our liquid spray is made from high-potency engineered cannabinoid blends, lab-tested for strength and consistency. Every bottle is sealed, unmarked and shipped in plain, discreet packaging with worldwide delivery.`;

const products = [
  {
    name: 'K2 E-Liquid CODE RED Spray',
    slug: 'k2-e-liquid-code-red-spray',
    category: 'k2-liquid-spray',
    images: ['/images/k2-spray/code-red-spray.png'],
    description: `K2 E-Liquid CODE RED Spray is the legendary extra-strength blend in a ready-to-use spray bottle. Famous for its fast, hard-hitting effects — a top choice for experienced buyers.

${SHARED_FACTS}

Available in 10ml, 25ml, 50ml and 100ml bottles.`,
    priceVariants: [
      { quantity: 10, price: 95 },
      { quantity: 25, price: 200 },
      { quantity: 50, price: 340 },
      { quantity: 100, price: 559 },
    ],
    countInStock: 55, rating: 5.0, numReviews: 16, featured: false,
  },
  {
    name: 'Diablo K2 Spray',
    slug: 'diablo-k2-spray',
    category: 'k2-liquid-spray',
    images: ['/images/k2-spray/diablo-k2-spray.jpg'],
    description: `Diablo K2 Spray is our most potent liquid spray — the same powerful Diablo blend that made our infused paper famous, in an easy-to-apply spray bottle.

${SHARED_FACTS}

Available in 25ml, 50ml and 100ml bottles.`,
    priceVariants: [
      { quantity: 25, price: 150 },
      { quantity: 50, price: 280 },
      { quantity: 100, price: 450 },
    ],
    countInStock: 45, rating: 4.9, numReviews: 11, featured: false,
  },
  {
    name: 'AK-47 K2 Spray',
    slug: 'ak-47-k2-spray',
    category: 'k2-liquid-spray',
    images: ['/images/k2-spray/ak47-k2-spray.png'],
    description: `AK-47 K2 Spray delivers the fast-acting, hard-hitting AK-47 blend in a convenient spray bottle. Reliable strength and consistent quality in every bottle.

${SHARED_FACTS}

Available in 25ml and 50ml bottles.`,
    priceVariants: [
      { quantity: 25, price: 155 },
      { quantity: 50, price: 300 },
    ],
    countInStock: 50, rating: 5.0, numReviews: 13, featured: false,
  },
  {
    name: 'Bizarro Liquid K2 Spray',
    slug: 'bizarro-liquid-k2-spray',
    category: 'k2-liquid-spray',
    images: ['/images/k2-spray/bizarro-k2-spray.jpg'],
    description: `Bizarro Liquid K2 Spray is infused with the intense Bizarro blend — one of the strongest liquid sprays we stock. Bold, fast-acting and built for experienced users.

${SHARED_FACTS}

Available in 50ml, 100ml and 200ml bottles.`,
    priceVariants: [
      { quantity: 50, price: 210 },
      { quantity: 100, price: 400 },
      { quantity: 200, price: 700 },
    ],
    countInStock: 40, rating: 5.0, numReviews: 9, featured: false,
  },
  {
    name: 'Kush Liquid Incense',
    slug: 'kush-liquid-incense',
    category: 'k2-liquid-spray',
    images: ['/images/k2-spray/kush-liquid-incense.webp'],
    description: `Kush Liquid Incense is the smooth, mellow Kush blend in a spray bottle — a balanced, well-rounded option and a consistent best-seller among returning customers.

${SHARED_FACTS}

Available in 100ml, 125ml, 250ml and 500ml bottles.`,
    priceVariants: [
      { quantity: 100, price: 250 },
      { quantity: 125, price: 300 },
      { quantity: 250, price: 750 },
      { quantity: 500, price: 1100 },
    ],
    countInStock: 60, rating: 5.0, numReviews: 18, featured: false,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB\n');

  let added = 0, skipped = 0;
  for (const p of products) {
    const exists = await Product.findOne({ slug: p.slug });
    if (exists) { console.log(`SKIP (exists): ${p.name}`); skipped++; continue; }
    await Product.create(p);
    console.log(`ADDED: ${p.name}`);
    added++;
  }

  console.log(`\nDone — ${added} added, ${skipped} skipped.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
