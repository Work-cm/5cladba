// Import the research chemicals product catalog (name, images, price, variants,
// verbatim descriptions) captured from cannabinoidsite.com into the local DB.
// Run: node src/scripts/import-research-chemicals-products.js

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

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'research-chemicals-products.json'), 'utf8').replace(/^﻿/, ''));
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
          category: 'research chemicals',
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

  const total = await Product.countDocuments({ category: 'research chemicals' });
  console.log(`research chemicals now has ${total} product(s)`);

  list.forEach((p) => console.log(` - ${p.slug} | ${p.name} | ${p.images.length} img`));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
