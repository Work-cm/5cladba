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

// quantity = number of A4 sheets (each sheet infused with 25 ml of liquid K2)
const SHEETS = (prices) => [1, 2, 3, 4, 5, 10].map((q, i) => ({ quantity: q, price: prices[i] }));
const STD_TIERS = SHEETS([200, 350, 450, 550, 680, 1200]);

const SHARED_FACTS = `Each A4 sheet is infused with 25 ml (0.845 fl oz) of high-potency liquid K2. The paper is completely odorless and colorless, making it indistinguishable from a regular sheet of paper. Every order ships in plain, unmarked, discreet packaging.`;

const products = [
  {
    name: 'Diablo K2 Spray on Paper',
    slug: 'diablo-k2-spray-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/diablo-k2-paper.webp'],
    description: `Diablo K2 Spray on Paper is our strongest infused paper product — each A4 sheet is saturated with the famously potent Diablo blend. If you want maximum potency per sheet, this is the one.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: SHEETS([150, 220, 320, 420, 500, 8200]),
    countInStock: 60, rating: 4.9, numReviews: 9, featured: true,
  },
  {
    name: 'AK-47 Adios Liquid Spray on Paper',
    slug: 'ak47-adios-k2-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/ak47-k2-paper.webp'],
    description: `AK-47 Adios Liquid Spray on Paper is infused with the popular AK-47 blend, known for its fast-acting, hard-hitting profile. A favourite for customers who want a strong, reliable infused sheet.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: SHEETS([230, 350, 450, 650, 700, 1300]),
    countInStock: 45, rating: 5.0, numReviews: 14, featured: true,
  },
  {
    name: 'K2 Liquid on Paper',
    slug: 'k2-liquid-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/k2-liquid-on-paper.jpg'],
    description: `K2 Liquid on Paper is the classic wholesale option — premium A4 sheets infused with our standard-strength liquid K2 blend. Ideal for bulk buyers looking for consistent quality at a competitive price.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: STD_TIERS,
    countInStock: 80, rating: 5.0, numReviews: 21, featured: false,
  },
  {
    name: 'Kush Liquid Incense on Paper',
    slug: 'kush-liquid-incense-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/kush-k2-paper.webp'],
    description: `Kush Liquid Incense on Paper delivers the smooth, mellow Kush blend infused directly into A4 sheets. A balanced, well-rounded option that's been a consistent best-seller.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: STD_TIERS,
    countInStock: 55, rating: 5.0, numReviews: 17, featured: false,
  },
  {
    name: 'Bizarro Liquid K2 on Paper',
    slug: 'bizarro-liquid-k2-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/bizarro-k2-paper.jpg'],
    description: `Bizarro Liquid K2 on Paper is infused with the intense Bizarro blend — one of the most requested exotic incense blends on the market. Strong, fast, and reliable.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: STD_TIERS,
    countInStock: 50, rating: 5.0, numReviews: 12, featured: false,
  },
  {
    name: 'K2 E-Liquid Spray on Paper',
    slug: 'k2-e-liquid-spray-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/k2-e-liquid-paper.jpg'],
    description: `K2 E-Liquid Spray on Paper uses our premium e-liquid formulation infused into A4 sheets. Clean, consistent potency in every sheet.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: STD_TIERS,
    countInStock: 65, rating: 5.0, numReviews: 11, featured: false,
  },
  {
    name: 'K2 E-Liquid Code Red on Paper',
    slug: 'k2-code-red-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/code-red-k2-paper.jpg'],
    description: `K2 E-Liquid Code Red on Paper is infused with the legendary Code Red blend — known for its extra-strong, fast-acting profile. A premium option for experienced buyers.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: SHEETS([200, 350, 475, 550, 750, 1200]),
    countInStock: 48, rating: 5.0, numReviews: 8, featured: true,
  },
  {
    name: 'Cannabinoid C-Liquid Spray on Paper',
    slug: 'cannabinoid-c-liquid-on-paper',
    category: 'k2-paper-sheets',
    images: ['/images/k2-paper/c-liquid-k2-paper.webp'],
    description: `Cannabinoid C-Liquid Spray on Paper is infused with a pure synthetic cannabinoid C-liquid — a full-agonist blend that delivers the strongest possible effect per sheet.

${SHARED_FACTS}

Available in packs of 1, 2, 3, 4, 5 or 10 A4 sheets.`,
    priceVariants: STD_TIERS,
    countInStock: 40, rating: 5.0, numReviews: 6, featured: false,
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
