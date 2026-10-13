// One-off migration: move existing 'k2-powder' products into 'cannabinoids'
// and upsert the full k2-powder catalog (name, image, price, gram-tier variants).
// Run: node src/scripts/move-k2-powder-to-cannabinoids.js

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please define MONGODB_URI in .env.local or .env');
  process.exit(1);
}

// Lax schema — operates directly on the existing products collection
const productSchema = new mongoose.Schema({}, { strict: false, collection: 'products' });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const STD_VARIANTS = [
  { quantity: 50, price: 470 },
  { quantity: 100, price: 630 },
  { quantity: 500, price: 1100 },
  { quantity: 1000, price: 2300 },
];

const researchDesc = (name) =>
  `${name} is a high-purity reference material supplied exclusively for advanced scientific, forensic, and analytical research applications. This compound is carefully prepared, handled, and tested to meet the exacting standards required by research laboratories, universities, and analytical testing facilities working in the cannabinoids field. Every batch is subject to comprehensive quality-control procedures to ensure consistency, identity, and purity suitable for demanding research protocols.\n\n` +
  `The chemical and pharmacological profile of ${name} has been documented in the scientific literature as a valuable reference compound for receptor binding studies, analytical method development, and comparative structure-activity relationship (SAR) investigations. Its physicochemical properties — including solubility, stability, chromatographic retention, and spectral behaviour — have been characterised to support reproducible and reliable experimental outcomes. These properties make it suitable for in vitro assays, reference standard development, and the calibration of analytical instrumentation.\n\n` +
  `${name} is manufactured to a minimum purity of 99%+, a standard that is confirmed by high-performance liquid chromatography (HPLC), nuclear magnetic resonance (NMR) spectroscopy, and mass spectrometry where appropriate. Each batch is accompanied by a complete Certificate of Analysis (CoA) that reports identity confirmation, purity assessment, appearance, solubility, and representative spectral data. This documentation is essential for laboratories that require traceable and verifiable reference materials.\n\n` +
  `Researchers utilise ${name} in a broad range of contexts, including receptor pharmacology, metabolic and pharmacokinetic studies, forensic toxicology, environmental analysis, and the development and validation of detection methods. As a reference material, it is intended strictly for in vitro and laboratory research use and is not intended for human or veterinary administration, consumption, or any clinical application. All handling should be performed by qualified personnel under appropriate laboratory conditions.\n\n` +
  `Proper storage and handling of ${name} are critical to preserving its chemical integrity over time. The material should be stored in a cool, dry, and light-protected environment, away from incompatible substances and sources of contamination. For complete handling, safety, storage, and disposal information, consult the Certificate of Analysis and the relevant safety data sheet (SDS) supplied with the order.\n\n` +
  `All purchases of ${name} are governed by terms that require the buyer to confirm that the material will be used only for lawful research purposes in accordance with applicable local, national, and institutional regulations. The buyer is responsible for ensuring that receipt, storage, and use of this reference material comply with all relevant laws and safety guidelines.`;

const PRODUCTS = [
  { name: 'AMB-FUBINACA', slug: 'amb-fubinaca-powder', images: ['/images/k2-powder/amb-fubinaca-powder.jpg'], countInStock: 300, rating: 4.9, numReviews: 8, featured: true },
  { name: 'ADB-FUBINACA', slug: 'adb-fubinaca-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862863/k2paperliquid/products/hp6mcjzbd4xvdcgaaohu.jpg'], countInStock: 34, rating: 4, numReviews: 4, featured: false },
  { name: '5F-EDMB-PINACA', slug: '5f-edmb-pinaca-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862780/k2paperliquid/products/uujs7lo0dousqtr0tbgm.jpg'], countInStock: 100, rating: 4.8, numReviews: 8, featured: false },
  { name: '5-FADB Precursor/Kit', slug: '5-fadb-precursor-kit-powder', images: ['/images/k2-powder/5-fadb-precursor-kit-powder.jpg'], countInStock: 100, rating: 4.9, numReviews: 8, featured: true },
  { name: '6-CL-ADBA Precursor/Kit', slug: '6-cl-adba-precursor-kit-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862709/k2paperliquid/products/bnu8xntxs6nzchw7e3el.jpg'], countInStock: 100, rating: 4.9, numReviews: 8, featured: true },
  { name: '5-CL-ADBA Precursor/Kit', slug: '5-cl-adba-precursor-kit-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862651/k2paperliquid/products/s8okqo3udteccms8qz3p.jpg'], countInStock: 100, rating: 4.9, numReviews: 8, featured: true },
  { name: '5FADB Precursor/Kit Pink', slug: '5-fadb-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790857084/k2paperliquid/products/ik7isg2fhtdtmmjz2xrk.jpg'], countInStock: 40, rating: 5, numReviews: 8, featured: true },
  { name: '6-CL-ADBA (6-Chloro-ADBA)', slug: '6-cl-adba-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862408/k2paperliquid/products/w4ienfetwltomc74i2kx.jpg'], countInStock: 38, rating: 4.6, numReviews: 8, featured: true },
  { name: 'JWH-018', slug: 'jwh-018-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862514/k2paperliquid/products/barl9sbmxjg5j6grqw1r.jpg'], countInStock: 50, rating: 4.8, numReviews: 8, featured: true },
  { name: '4F-ADB Precursor/Kit', slug: '4f-adb-precursor-kit-powder', images: ['/images/k2-powder/4f-adb-precursor-kit-powder.jpg'], countInStock: 78, rating: 4.9, numReviews: 8, featured: false },
  { name: '5F-MDMB-2201', slug: '5f-mdmb-2201-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862602/k2paperliquid/products/sreqzvbrieoe73ysk4o4.jpg'], countInStock: 23, rating: 4.8, numReviews: 8, featured: true },
  { name: 'MDMB-4en-PINACA', slug: 'mdmb-4en-pinaca-powder', images: ['/images/k2-powder/mdmb-4en-pinaca-powder.jpg'], countInStock: 300, rating: 5, numReviews: 8, featured: false },
  { name: '5CL-ADBA Precursor/Kit pink', slug: '5-cl-adba-powder', images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1790862284/k2paperliquid/products/hsbdm2yqmhxnfhtbnsgr.jpg'], countInStock: 45, rating: 4.6, numReviews: 8, featured: false },
  {
    name: 'adb-butinaca',
    slug: 'adb-butinaca',
    images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1791025289/k2paperliquid/products/a0sxmvz4emvfuv1pk63g.jpg'],
    description: 'ADB-BUTINACA, formally N-(1-amino-3,3-dimethyl-1-oxobutan-2-yl)-1-butyl-1H-indazole-3-carboxamide, also known as ADBICA, is a synthetic cannabinoid of the indazole-3-carboxamide class belonging to the ADB (tert-leucinamide) pharmacophore series. This pharmacophore series has been consistently identified in SAR research as producing high-affinity CB1 receptor binding within the indazole scaffold.\n\nADB-BUTINACA features a butyl chain at the N1 position of the indazole ring, distinguishing it from related compounds such as 5-FADB or ADB-FUBINACA, which carry longer or functionalised alkyl chains. This structural difference enables systematic comparison of N1-alkyl chain length effects within the ADB-indazole series — a key parameter in understanding cannabinoid receptor binding geometry. As a full agonist at CB1 receptors, ADB-BUTINACA activates Gi/Go-coupled signalling pathways including cAMP suppression, MAPK/ERK modulation, and ion channel regulation. Its in vitro metabolism has been characterised using hepatic microsomes, with hydroxylation and amide hydrolysis identified as primary routes. Metabolic products have been documented as forensic analytical reference materials.\n\nOur ADB-BUTINACA is produced to 99%+ purity, confirmed by HPLC-MS, NMR spectroscopy, and elemental analysis. A comprehensive Certificate of Analysis with full spectral documentation is provided with every order. Applications include CB1/CB2 receptor pharmacology, forensic toxicology reference standards, analytical method development, and ADB-series SAR research.',
    countInStock: 60, rating: 4.9, numReviews: 8, featured: true,
  },
  {
    name: 'k2spice/synthetic-marijuana',
    slug: 'k2spicesynthetic-marijuana',
    images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1791021093/k2paperliquid/products/aa11kqohc0bvxyqufcnm.jpg'],
    description: 'K2 and Spice are just two of the many trade names or brands for synthetic designer drugs that are intended to mimic THC, the main psychoactive ingredient of marijuana. These designer synthetic drugs are from the synthetic cannabinoid class of drugs that are often marketed and sold under the guise of “herbal incense” or “potpourri.”\n\nThese products are being abused for their psychoactive properties and are packaged without information as to their health and safety risks.\n\nStreet Title\nSpice, K2, RedX Dawn, Paradise, Demon, Black Magic, Spike, Mr. Nice Guy, Ninja, Zohai, Dream, Genie, Sence, Smoke, Skunk, Serenity, Yucatan, Fire, Skooby Snax, and Crazy Clown.',
    countInStock: 90, rating: 4.8, numReviews: 8, featured: true,
  },
  {
    name: 'Ab-pinaca',
    slug: 'ab-pinaca',
    images: ['https://res.cloudinary.com/dnxyxgc1m/image/upload/v1791026405/k2paperliquid/products/pzjhxgomdjykf6oqua2j.jpg'],
    description: 'AB-PINACA Reference Standard | 5fadb5cladba.com Research-grade synthetic cannabinoid analogue for laboratory instrumentation.\n\nEach unit includes verified composition, chromatographic signatures, and spectral documentation, supporting GC-MS, LC-MS, FT-IR, and forensic comparison studies in accredited laboratory environments.',
    countInStock: 90, rating: 4.8, numReviews: 8, featured: true,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected:', mongoose.connection.name);

  // 1) Move any existing k2-powder docs to cannabinoids
  const moved = await Product.updateMany({ category: 'k2-powder' }, { $set: { category: 'cannabinoids' } });
  console.log(`Moved ${moved.modifiedCount} existing k2-powder product(s) to cannabinoids`);

  // 2) Upsert the full catalog by slug
  const ops = PRODUCTS.map((p) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: {
        $set: {
          name: p.name,
          slug: p.slug,
          category: 'cannabinoids',
          images: p.images,
          description: p.description || researchDesc(p.name),
          price: 470,
          priceVariants: p.priceVariants || STD_VARIANTS,
          countInStock: p.countInStock,
          rating: p.rating,
          numReviews: p.numReviews,
          featured: p.featured,
        },
      },
      upsert: true,
    },
  }));
  const res = await Product.bulkWrite(ops);
  console.log(`Upserted: ${res.upsertedCount} new, ${res.modifiedCount} updated`);

  const total = await Product.countDocuments({ category: 'cannabinoids' });
  console.log(`cannabinoids now has ${total} product(s)`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
