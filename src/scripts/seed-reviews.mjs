// Seed plausible reviews into products that have none.
// Keeps numReviews/rating consistent with the seeded reviews.
// Run: node src/scripts/seed-reviews.mjs

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

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

const NAMES = [
  'Marcus T.', 'J. Keller', 'Andre B.', 'D. Whitfield', 'Rico M.', 'Sam O.',
  'K. Ngozi', 'T. Alvarez', 'Ben H.', 'L. Fontaine', 'Chris P.', 'M. Osei',
  'Viktor S.', 'Jamal R.', 'P. Donovan', 'E. Castillo', 'Nate W.', 'O. Adeyemi',
  'F. Marchetti', 'Derek C.', 'Yusuf A.', 'G. Petrov', 'H. Lindqvist', 'Ray J.',
];

const COMMENTS = {
  'k2-paper-sheets': [
    'Evenly infused, exactly as described. Burned clean with no hot spots.',
    'Best sheets I have had in a while. Strong and consistent across the whole A4.',
    'Discreet packaging, arrived flat and sealed. Potency is legit.',
    'Ordered the multi-sheet pack — every single one was identical quality.',
    'Fast shipping and the paper is properly saturated. Will reorder.',
    'Very strong, go slow if it is your first time. Quality product.',
    'No smell, no stains, perfectly discreet. Exactly what I needed.',
    'Consistent batch, same as last time. Reliable supplier.',
  ],
  'k2-liquid-spray': [
    'Sprays evenly, dries fast. Potency is exactly what they claim.',
    'Good bottle, no leaks. Applied to paper perfectly.',
    'Strong stuff — a little goes a long way. Happy with the purchase.',
    'Arrived sealed and discreet. Works great on herbs and paper.',
    'Consistent strength, no weird smell. Recommend.',
    'Second order, same quality. Shipping was quick again.',
  ],
  'k2-powder': [
    'High purity powder, exactly as advertised. Lab results match.',
    'Fine crystalline powder, no clumps. Very satisfied.',
    'Dissolved cleanly for my application. Good quality control.',
    'Potent and clean — this supplier is consistent.',
    'Packaging was vacuum sealed and discreet. Product is top tier.',
    'Accurate weight, strong product. Ordering again.',
  ],
  'etomidate': [
    'Purity checks out, COA matched the batch. Professional supplier.',
    'Clean crystals, no discoloration. Exactly as described.',
    'Arrived quickly and sealed. Quality is excellent.',
    'Lab-grade material, consistent with previous orders.',
    'Very pure, tested 99%+. Trustworthy vendor.',
  ],
  'vapes-kpods': [
    'Pod hit smooth and consistent. Battery-friendly, no leaks.',
    'Clean taste, potent as described. Packaging was discreet.',
    'Sealed pod, fresh on arrival. Exactly what I expected.',
    'Great hardware, no clogging. Works perfectly with my device.',
    'Fast shipping, authentic product. Will buy more pods.',
  ],
};

const GENERIC = [
  'Great quality, fast and discreet shipping. Recommended.',
  'Exactly as described. Very satisfied with the order.',
  'Consistent quality and professional packaging.',
  'Smooth transaction, product is legit.',
];

function ratingFor(target) {
  // Bias ratings around the product's advertised rating (default 4.5)
  const base = Math.min(5, Math.max(3, Math.round(target || 4.5)));
  const r = Math.random();
  if (r < 0.6) return base;
  if (r < 0.85) return Math.min(5, base + 1 > 5 ? base : base);
  return Math.max(3, base - 1);
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const products = await Product.find({}).lean();
  let updated = 0;

  for (const p of products) {
    if (Array.isArray(p.reviews) && p.reviews.length > 0) continue;

    const target = typeof p.numReviews === 'number' && p.numReviews > 0 ? p.numReviews : 5;
    const count = Math.min(Math.max(target, 4), 8);
    const pool = COMMENTS[p.category] || GENERIC;
    const usedComments = new Set();
    const usedNames = new Set();

    const reviews = [];
    for (let i = 0; i < count; i++) {
      let name = pick(NAMES);
      let comment = pick(pool);
      let guard = 0;
      while (usedNames.has(name) && guard++ < 10) name = pick(NAMES);
      guard = 0;
      while (usedComments.has(comment) && guard++ < 10) comment = pick(pool);
      usedNames.add(name);
      usedComments.add(comment);

      reviews.push({
        name,
        rating: ratingFor(p.rating),
        comment,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 120) * 86400000),
      });
    }

    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

    await Product.updateOne(
      { _id: p._id },
      {
        $set: {
          reviews,
          numReviews: reviews.length,
          rating: Math.round(avg * 10) / 10,
        },
      }
    );
    updated++;
  }

  console.log(`Seeded reviews on ${updated} products`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
