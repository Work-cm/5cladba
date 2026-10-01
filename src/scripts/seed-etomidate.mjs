import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const IMG_DIR = path.resolve(__dirname, '../../public/images/etomidate');

const productSchema = new mongoose.Schema({
  name: String, slug: String, category: String,
  images: [String], description: String,
  priceVariants: [{ quantity: Number, price: Number }],
  price: Number,
  countInStock: Number, rating: Number, numReviews: Number, featured: Boolean,
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const ETOMIDATE_SPECS = [
  'CAS Number: 33125-97-2',
  'Purity: ≥99.8% (HPLC verified)',
  'Form: Fine white crystalline powder',
  'Certificate of Analysis included',
];

const GENERIC_SPECS = [
  'CAS Number: 86347-14-0',
  'Purity: ≥99.5% (HPLC verified)',
  'Form: White crystalline powder',
  'Molecular Formula: C13H16N2',
  'Molecular Weight: 200.28 g/mol',
  'Melting Point: 150-154°C',
  'Storage: Store at -20°C, protect from moisture',
  'Certificate of Analysis included',
  'Amber glass vial with desiccant',
];

const CYCHLORPHINE_SPECS = [
  'CAS Number: 16145-71-4',
  'Purity: ≥99.9% (HPLC verified)',
  'Grade: Pharmaceutical Research Grade',
  'Form: Crystalline powder, white to off-white',
  'Loss on Drying: ≤0.5%',
  'Residue on Ignition: ≤0.1%',
  'Residual Solvents: Tested via GC-MS',
  'Heavy Metals: Tested via ICP-MS',
  'Full COA with chromatograms included',
  'Batch-coded for full traceability',
];

function buildDesc(intro, specs) {
  return `${intro}\n\nSpecifications:\n${specs.map(s => `- ${s}`).join('\n')}`;
}

const PRODUCTS = [
  {
    name: 'Etomidate Powder Pure',
    slug: 'etomidate-powder-pure',
    url: 'https://www.etomidatesite.com/shop/etomidate-powder-pure',
    price: 700,
    description: buildDesc(
      'Pharmaceutical-grade pure etomidate powder with exceptional purity and consistency. High-purity etomidate powder for research and clinical use.',
      ETOMIDATE_SPECS
    ),
  },
  {
    name: 'Etomidate Crystal',
    slug: 'etomidate-crystal',
    url: 'https://www.etomidatesite.com/shop/etomidate-crystal',
    price: 700,
    description: buildDesc(
      'Etomidate crystal powder specifically formulated for laboratory and scientific studies. High-purity etomidate in crystalline form.',
      ETOMIDATE_SPECS
    ),
  },
  {
    name: 'Cychlorphine HCL Powder',
    slug: 'cychlorphine-hcl-powder',
    url: 'https://www.etomidatesite.com/shop/cychlorphine-hcl-powder',
    price: 800,
    description: buildDesc(
      'Cychlorphine HCL Powder is a premium pharmaceutical-grade research compound produced under rigorous GMP-compliant manufacturing conditions. Each batch undergoes a comprehensive triple-verification testing protocol before release, with full chromatographic analysis, residual solvent testing via GC-MS, heavy metals screening and microbial contamination testing all conducted and reported. Packaged in pharmaceutical-grade amber borosilicate glass with PTFE-lined closures for maximum product integrity.',
      CYCHLORPHINE_SPECS
    ),
  },
  {
    name: 'Medetomidine Powder',
    slug: 'medetomidine-powder',
    url: 'https://www.etomidatesite.com/shop/medetomidine-powder',
    price: 800,
    description: buildDesc(
      'High-purity medetomidine powder for research applications. Batch-tested and supplied with a certificate of analysis.',
      GENERIC_SPECS
    ),
  },
  {
    name: 'Tiletamine Powder',
    slug: 'tiletamine-powder',
    url: 'https://www.etomidatesite.com/shop/tiletamine-powder',
    price: 800,
    description: buildDesc(
      'Pharmaceutical-grade tiletamine powder for research and veterinary applications. Batch-tested and supplied with a certificate of analysis.',
      GENERIC_SPECS
    ),
  },
  {
    name: 'Spirochlorphine R6890',
    slug: 'spirochlorphine-r6890',
    url: 'https://www.etomidatesite.com/shop/spirochlorphine-r6890',
    price: 800,
    description: buildDesc(
      'High-purity Spirochlorphine R6890 powder for advanced research applications. Batch-tested and supplied with a certificate of analysis.',
      GENERIC_SPECS
    ),
  },
];

function extractOgImage(html) {
  for (const tag of html.match(/<meta[^>]+>/gi) || []) {
    if (/property=["'](?:og:image)["']/i.test(tag) || /name=["'](?:twitter:image)["']/i.test(tag)) {
      const m = tag.match(/content=["']([^"']+)["']/i);
      if (m) return m[1];
    }
  }
  return null;
}

async function fetchImageUrl(pageUrl) {
  try {
    const res = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.error(`  page fetch ${pageUrl}: HTTP ${res.status}`); return null; }
    const html = await res.text();
    return extractOgImage(html);
  } catch (e) {
    console.error(`  page fetch ${pageUrl}: ${e.message}`);
    return null;
  }
}

async function downloadImage(url, outPath) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

async function run() {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  await mongoose.connect(MONGODB_URI);

  let added = 0, skipped = 0, failed = 0;
  for (const p of PRODUCTS) {
    const exists = await Product.findOne({ slug: p.slug });
    if (exists) { console.log(`  SKIP (exists): ${p.name}`); skipped++; continue; }

    let localImage = '';
    const imgUrl = await fetchImageUrl(p.url);
    if (imgUrl) {
      try {
        const ext = path.extname(new URL(imgUrl).pathname).toLowerCase() || '.jpg';
        const filename = `${p.slug}${ext === '.webp' ? '.webp' : ext}`;
        const bytes = await downloadImage(imgUrl, path.join(IMG_DIR, filename));
        localImage = `/images/etomidate/${filename}`;
        console.log(`  image: ${filename} (${bytes} bytes)`);
      } catch (e) {
        console.error(`  image FAIL ${p.name}: ${e.message}`);
        failed++;
      }
    } else {
      console.warn(`  no og:image found for ${p.name}`);
    }

    await Product.create({
      name: p.name,
      slug: p.slug,
      category: 'etomidate',
      images: localImage ? [localImage] : [],
      description: p.description,
      priceVariants: [{ quantity: 50, price: p.price }],
      price: p.price,
      countInStock: 50,
      rating: 4.8,
      numReviews: 12,
      featured: false,
    });
    console.log(`  ADDED: ${p.name} — €${p.price} / 50g`);
    added++;
  }

  console.log(`\nDone — added ${added}, skipped ${skipped}, image failures ${failed}`);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
