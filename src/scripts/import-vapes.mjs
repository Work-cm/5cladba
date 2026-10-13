// Import the 8 Etomidate Vape / K-Pod products scraped from etomidatesite.com.
// Reads src/scripts/eto-vapes-import.json and upserts by slug.
// Run: node src/scripts/import-vapes.mjs

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
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

const products = JSON.parse(
  readFileSync(path.resolve(__dirname, 'eto-vapes-import.json'), 'utf8').replace(/^﻿/, '')
);
console.log(`Vape products to import: ${products.length}`);

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
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const p of products) {
    const doc = {
      name: p.name.trim(),
      slug: p.slug,
      category: p.category,
      images: p.images || [],
      description: p.description,
      price: typeof p.price === 'number' ? p.price : p.priceVariants?.[0]?.price ?? 0,
      priceVariants: (p.priceVariants || []).map((v) => ({
        quantity: v.quantity,
        label: v.label,
        price: v.price,
      })),
      countInStock: p.countInStock ?? 100,
      rating: p.rating ?? 0,
      numReviews: p.numReviews ?? 0,
      featured: !!p.featured,
    };
    await Product.updateOne({ slug: doc.slug }, { $set: doc }, { upsert: true });
    console.log(`Upserted: ${doc.slug}`);
  }

  const count = await Product.countDocuments({ category: 'vapes-kpods' });
  console.log(`vapes-kpods products in DB: ${count}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
