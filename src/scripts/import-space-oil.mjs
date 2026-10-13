// Import "Space Oil" (etomidate liquid) scraped from etomidatesite.com
// into the vapes-kpods category. Upserts by slug.
// Run: node src/scripts/import-space-oil.mjs

import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

const priceVariantSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    label: { type: String },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    priceVariants: [priceVariantSchema],
    countInStock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{ name: String, rating: Number, comment: String, createdAt: Date }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Exact copy of https://www.etomidatesite.com/shop/etomidate-space-oil
const product = {
  name: 'Space Oil',
  slug: 'etomidate-space-oil',
  category: 'vapes-kpods',
  images: ['/images/vapes/etomidate-space-oil.jpg'],
  price: 500,
  priceVariants: [
    { quantity: 100, label: '100ml', price: 500 },
    { quantity: 250, label: '250ml', price: 1250 },
    { quantity: 500, label: '500ml', price: 2500 },
    { quantity: 1000, label: '1000ml', price: 5000 },
  ],
  description: `Pure pharmaceutical-grade etomidate liquid solution. Smooth, clean, and precisely dosed.

Space Oil is our flagship liquid etomidate solution, carefully formulated for consistent potency and maximum purity. Each batch is synthesised from pharmaceutical-grade etomidate (CAS 33125-97-2) and prepared in our ISO-certified facility to a verified concentration, ensuring you receive exactly what you order every time.

The refined carrier base preserves the integrity of the active compound over extended storage periods. It is designed for researchers and professionals who require a reliable, repeatable liquid etomidate source without compromise.

Every bottle is individually batch-coded, hermetically sealed, and accompanied by a full Certificate of Analysis (COA) confirming ≥99.8% purity via HPLC testing. Discreet, secure worldwide shipping with delivery within 24–48 hours of dispatch.

Available in 100ml, 250ml, 500ml, and 1000ml volumes to suit both sample testing and large-scale research requirements.

Specifications:
- Purity: ≥99.8% (HPLC verified)
- Form: Pharmaceutical-grade liquid solution
- Concentration: Precisely measured per batch
- Carrier: Pharmaceutical-grade solvent base
- Packaging: Hermetically sealed amber glass bottle
- COA included with every order
- Batch-coded for full traceability
- Storage: Keep in a cool, dark place`,
  countInStock: 100,
  rating: 0,
  numReviews: 0,
  featured: false,
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Product.updateOne(
    { slug: product.slug },
    { $set: product },
    { upsert: true }
  );
  console.log(`Upserted: ${product.slug}`);

  const doc = await Product.findOne({ slug: product.slug }).lean();
  console.log(`Verified in DB: ${doc.name} | ${doc.category} | ${doc.priceVariants.length} variants | ${doc.images[0]}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
