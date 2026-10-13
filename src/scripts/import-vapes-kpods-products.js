// Import the vapes-kpods product catalog (name, image, price, variants,
// verbatim descriptions) captured from the live site into the local DB.
// Run: node src/scripts/import-vapes-kpods-products.js

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please define MONGODB_URI in .env.local or .env');
  process.exit(1);
}

const productSchema = new mongoose.Schema({}, { strict: false, collection: 'products' });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'vapes-kpods-products.json'), 'utf8').replace(/^﻿/, ''));
const list = Array.isArray(raw) ? raw : raw.products;

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected:', mongoose.connection.name);

  const ops = list.map((p) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: {
        $set: {
          name: p.name,
          slug: p.slug,
          category: 'vapes-kpods',
          images: p.images,
          description: p.description,
          price: p.price,
          priceVariants: p.priceVariants || [],
          countInStock: p.countInStock ?? 50,
          rating: p.rating ?? 0,
          numReviews: p.numReviews ?? 0,
          featured: !!p.featured,
        },
      },
      upsert: true,
    },
  }));

  const res = await Product.bulkWrite(ops);
  console.log(`Upserted: ${res.upsertedCount} new, ${res.modifiedCount} updated`);

  const total = await Product.countDocuments({ category: 'vapes-kpods' });
  console.log(`vapes-kpods now has ${total} product(s)`);

  list.forEach((p) => console.log(` - ${p.slug} | ${p.name} | ${p.images[0]}`));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
