import dbConnect from '../utils/db';
import Product from '@/models/Product';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Seed the database with initial data
 * Run this script with: node -r esm src/lib/seed/seed-db.js
 */
async function seedDatabase() {
  try {
    // Connect to the database
    await dbConnect();
    console.log('Connected to the database');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@5fadb5cladba.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@5fadb5cladba.com',
        password: hashedPassword,
        isAdmin: true,
      });
      console.log('Admin user created');
    }

    // Sample products data
    const productsData = [
      // Cannabinoids
      {
        name: 'CBD Isolate',
        slug: 'cbd-isolate',
        category: 'Cannabinoids',
        images: ['/images/products/cbd-isolate.jpg'],
        description: 'Pure CBD isolate powder, 99.9% purity. Perfect for research and development purposes.\n\nThis high-quality CBD isolate is extracted using CO2 methods and thoroughly tested for purity and potency.',
        priceVariants: [
          { quantity: 1, price: 29.99 },
          { quantity: 5, price: 129.99 },
          { quantity: 10, price: 249.99 },
        ],
        countInStock: 50,
        rating: 4.8,
        numReviews: 24,
        featured: true,
      },
      {
        name: 'Delta-8 THC',
        slug: 'delta-8-thc',
        category: 'Cannabinoids',
        images: ['/images/products/delta-8.jpg'],
        description: 'Delta-8 THC research compound, 95% purity. For laboratory research only.\n\nThis compound is ideal for comparative studies and analytical testing.',
        priceVariants: [
          { quantity: 1, price: 39.99 },
          { quantity: 5, price: 179.99 },
          { quantity: 10, price: 329.99 },
        ],
        countInStock: 35,
        rating: 4.5,
        numReviews: 18,
        featured: false,
      },
      {
        name: 'CBG Crystals',
        slug: 'cbg-crystals',
        category: 'Cannabinoids',
        images: ['/images/products/cbg-crystals.jpg'],
        description: 'Cannabigerol (CBG) crystalline powder, 98%+ purity.\n\nCBG is often called the "mother cannabinoid" as it is the precursor to many other cannabinoids.',
        priceVariants: [
          { quantity: 1, price: 49.99 },
          { quantity: 5, price: 219.99 },
          { quantity: 10, price: 399.99 },
        ],
        countInStock: 20,
        rating: 4.7,
        numReviews: 12,
        featured: true,
      },
      
      // Research Chemicals
      {
        name: '3-MMC',
        slug: '3-mmc',
        category: 'Research Chemicals',
        images: ['/images/products/3-mmc.jpg'],
        description: '3-MMC (3-Methylmethcathinone) research compound, 99% purity. For analytical chemistry only.\n\nThis compound is provided for laboratory research and analytical purposes.',
        priceVariants: [
          { quantity: 1, price: 59.99 },
          { quantity: 5, price: 269.99 },
          { quantity: 10, price: 499.99 },
        ],
        countInStock: 15,
        rating: 4.3,
        numReviews: 9,
        featured: false,
      },
      {
        name: '4-AcO-DMT',
        slug: '4-aco-dmt',
        category: 'Research Chemicals',
        images: ['/images/products/4-aco-dmt.jpg'],
        description: '4-AcO-DMT (O-Acetylpsilocin) research compound, 99.5% purity. For laboratory use only.\n\nThis tryptamine compound is ideal for comparative analysis and scientific research.',
        priceVariants: [
          { quantity: 1, price: 79.99 },
          { quantity: 5, price: 349.99 },
          { quantity: 10, price: 649.99 },
        ],
        countInStock: 10,
        rating: 4.9,
        numReviews: 15,
        featured: true,
      },
      {
        name: '2-FDCK',
        slug: '2-fdck',
        category: 'Research Chemicals',
        images: ['/images/products/2-fdck.jpg'],
        description: '2-FDCK (2-Fluorodeschloroketamine) research compound, 99% purity. For analytical purposes only.\n\nThis arylcyclohexylamine compound is provided for laboratory research.',
        priceVariants: [
          { quantity: 1, price: 69.99 },
          { quantity: 5, price: 299.99 },
          { quantity: 10, price: 549.99 },
        ],
        countInStock: 25,
        rating: 4.6,
        numReviews: 11,
        featured: false,
      },
      
    ];

    // Cannabinoid powders (former k2-powder catalog)
    const POWDER_VARIANTS = [
      { quantity: 50, price: 470 },
      { quantity: 100, price: 630 },
      { quantity: 500, price: 1100 },
      { quantity: 1000, price: 2300 },
    ];
    const powderDesc = (n) =>
      `${n} is a high-purity synthetic cannabinoid reference material (99%+, HPLC/NMR/MS confirmed) supplied strictly for laboratory, forensic and analytical research. Each batch ships with a Certificate of Analysis. Not for human or veterinary use.`;
    const CDN = 'https://res.cloudinary.com/dnxyxgc1m/image/upload';
    const cannabinoidPowders = [
      ['AMB-FUBINACA', 'amb-fubinaca-powder', '/images/k2-powder/amb-fubinaca-powder.jpg', 300, 4.9, true],
      ['ADB-FUBINACA', 'adb-fubinaca-powder', `${CDN}/v1790862863/k2paperliquid/products/hp6mcjzbd4xvdcgaaohu.jpg`, 34, 4.0, false],
      ['5F-EDMB-PINACA', '5f-edmb-pinaca-powder', `${CDN}/v1790862780/k2paperliquid/products/uujs7lo0dousqtr0tbgm.jpg`, 100, 4.8, false],
      ['5-FADB Precursor/Kit', '5-fadb-precursor-kit-powder', '/images/k2-powder/5-fadb-precursor-kit-powder.jpg', 100, 4.9, true],
      ['6-CL-ADBA Precursor/Kit', '6-cl-adba-precursor-kit-powder', `${CDN}/v1790862709/k2paperliquid/products/bnu8xntxs6nzchw7e3el.jpg`, 100, 4.9, true],
      ['5-CL-ADBA Precursor/Kit', '5-cl-adba-precursor-kit-powder', `${CDN}/v1790862651/k2paperliquid/products/s8okqo3udteccms8qz3p.jpg`, 100, 4.9, true],
      ['5FADB Precursor/Kit Pink', '5-fadb-powder', `${CDN}/v1790857084/k2paperliquid/products/ik7isg2fhtdtmmjz2xrk.jpg`, 40, 5.0, true],
      ['6-CL-ADBA (6-Chloro-ADBA)', '6-cl-adba-powder', `${CDN}/v1790862408/k2paperliquid/products/w4ienfetwltomc74i2kx.jpg`, 38, 4.6, true],
      ['JWH-018', 'jwh-018-powder', `${CDN}/v1790862514/k2paperliquid/products/barl9sbmxjg5j6grqw1r.jpg`, 50, 4.8, true],
      ['4F-ADB Precursor/Kit', '4f-adb-precursor-kit-powder', '/images/k2-powder/4f-adb-precursor-kit-powder.jpg', 78, 4.9, false],
      ['5F-MDMB-2201', '5f-mdmb-2201-powder', `${CDN}/v1790862602/k2paperliquid/products/sreqzvbrieoe73ysk4o4.jpg`, 23, 4.8, true],
      ['MDMB-4en-PINACA', 'mdmb-4en-pinaca-powder', '/images/k2-powder/mdmb-4en-pinaca-powder.jpg', 300, 5.0, false],
      ['5CL-ADBA Precursor/Kit pink', '5-cl-adba-powder', `${CDN}/v1790862284/k2paperliquid/products/hsbdm2yqmhxnfhtbnsgr.jpg`, 45, 4.6, false],
    ];
    cannabinoidPowders.forEach(([name, slug, img, stock, rating, featured]) => {
      productsData.push({
        name,
        slug,
        category: 'cannabinoids',
        images: [img],
        description: powderDesc(name),
        priceVariants: POWDER_VARIANTS,
        countInStock: stock,
        rating,
        numReviews: 8,
        featured,
      });
    });

    // Etomidate powders
    const ETO_800 = [
      { quantity: 50, price: 800 },
      { quantity: 100, price: 1400 },
      { quantity: 200, price: 2500 },
      { quantity: 500, price: 5200 },
      { quantity: 1000, price: 8500 },
    ];
    const ETO_700 = [
      { quantity: 50, price: 700 },
      { quantity: 100, price: 1250 },
      { quantity: 200, price: 2200 },
      { quantity: 500, price: 4500 },
      { quantity: 1000, price: 7500 },
    ];
    const etomidatePowders = [
      ['Medetomidine Powder', 'medetomidine-powder', ETO_800, 50, 4.6, false],
      ['Cychlorphine HCL Powder', 'cychlorphine-hcl-powder', ETO_800, 50, 5.0, false],
      ['Etomidate Crystal', 'etomidate-crystal', ETO_700, 50, 4.8, true],
      ['Etomidate Powder Pure', 'etomidate-powder-pure', ETO_700, 50, 4.6, true],
      ['Spirochlorphine R6890', 'spirochlorphine-r6890', ETO_800, 50, 4.9, false],
      ['Tiletamine Powder', 'tiletamine-powder', ETO_800, 50, 4.9, false],
    ];
    etomidatePowders.forEach(([name, slug, variants, stock, rating, featured]) => {
      productsData.push({
        name,
        slug,
        category: 'etomidate',
        images: [`/images/etomidate/${slug}.jpg`],
        description: `${name} is a high-purity reference material (99%+, HPLC/NMR/MS confirmed) supplied strictly for laboratory, forensic and analytical research. Each batch ships with a Certificate of Analysis. Not for human or veterinary use.`,
        priceVariants: variants,
        countInStock: stock,
        rating,
        numReviews: 8,
        featured,
      });
    });

    // Vapes / K-Pods
    const VAPE_350 = [
      { quantity: 50, price: 350 },
      { quantity: 100, price: 550 },
      { quantity: 200, price: 850 },
    ];
    const SPACE_OIL = [
      { quantity: 100, price: 500 },
      { quantity: 250, price: 1250 },
      { quantity: 500, price: 2500 },
      { quantity: 1000, price: 5000 },
    ];
    const vapesKpods = [
      ['Space Oil', 'etomidate-space-oil', SPACE_OIL, 5.0],
      ['Piao Piao Vape', 'piao-piao-vape', VAPE_350, 5.0],
      ['Zombie Vape', 'zombie-vape', VAPE_350, 5.0],
      ['Etomidate Vape K-Pod Max', 'etomidate-vape-kpod-max', VAPE_350, 4.6],
      ['Etomidate Vape Starter Kit', 'etomidate-vape-starter-kit', VAPE_350, 5.0],
      ['Etomidate Vape K-Pod Menthol', 'etomidate-vape-kpod-strong', VAPE_350, 4.6],
      ['Etomidate Vape Disposable Mini', 'etomidate-vape-disposable-mini', VAPE_350, 5.0],
      ['Etomidate Vape K-Pod Strong', 'etomidate-vape-k-pod-strong', VAPE_350, 4.8],
      ['Etomidate Vape K-Pod Classic', 'etomidate-vape-k-pod-classic', VAPE_350, 4.4],
    ];
    vapesKpods.forEach(([name, slug, variants, rating]) => {
      productsData.push({
        name,
        slug,
        category: 'vapes-kpods',
        images: [`/images/vapes/${slug}.jpg`],
        description: `${name} is a premium vape product supplied ready-to-use with consistent formulation and discreet packaging. Quality-checked before listing. Not for sale to minors.`,
        priceVariants: variants,
        countInStock: 100,
        rating,
        numReviews: 5,
        featured: false,
      });
    });

    // Research chemicals
    const RC_TIER = [
      { quantity: 100, price: 600 },
      { quantity: 250, price: 850 },
      { quantity: 500, price: 1200 },
      { quantity: 1000, price: 2300 },
    ];
    const RC_CDN = 'https://res.cloudinary.com/dnxyxgc1m/image/upload';
    const researchChemicals = [
      ['Amphetamine Powder', 'amphetamine-powder', `${RC_CDN}/v1777381960/novachem/products/kuacpmphbffvldmnlatu.jpg`, 75, 4.5, 60, true],
      ['2FDCK', '2fdck', `${RC_CDN}/v1777381904/novachem/products/hw76shilnqkhbdbbblpj.jpg`, 55, 4.0, 149, true],
      ['A-pvp/apvp', 'alpha-pvp', `${RC_CDN}/v1791286736/NitazeneChemicals/products/cq849ynwmy6daet1hhza.jpg`, 32, 5.0, 24, true],
      ['Ketamine Crystal', 'ketamine-crystal', `${RC_CDN}/v1776240717/novachem/products/tm94ceak1cuk2bmqkjuw.jpg`, 35, 4.9, 38, true],
      ['α-PiHP', 'alpha-pihp', `${RC_CDN}/v1791286785/NitazeneChemicals/products/rljbsc5o3l3za6tm8qin.jpg`, 30, 5.0, 16, false],
      ['4mmc/mephedrone', '4-mmc-mephedrone', `${RC_CDN}/v1776240871/novachem/products/rbw2cadbvk8ayt714yg2.jpg`, 38, 4.8, 29, true],
      ['3MMC', '3-mmc-3-methylmethcathinone', `${RC_CDN}/v1776240915/novachem/products/awahypxumfxyvwowja4f.jpg`, 40, 4.7, 22, true],
      ['4cmc', '4-cmc-4-chloromethcathinone', `${RC_CDN}/v1776240982/novachem/products/gugpnhmtgptbb1ndlwvf.jpg`, 35, 4.6, 18, false],
      ['3cmc', '3-cmc-3-chloromethcathinone', `${RC_CDN}/v1776241049/novachem/products/yhwnbjwkxaa0w87xdvf3.jpg`, 35, 4.6, 14, false],
      ['Crystal Methamphetamine', 'crystal-methamphetamine', `${RC_CDN}/v1791286858/NitazeneChemicals/products/xgz6m8ui5kq5vwj0eafg.jpg`, 40, 4.8, 31, true],
      ['MDMA', 'mdma', `${RC_CDN}/v1791296781/NitazeneChemicals/products/trnhztzy65khnj5uccgf.jpg`, 30, 4.8, 22, true],
      ['MDPHP', 'mdphp', `${RC_CDN}/v1791296737/NitazeneChemicals/products/xwnsa1wt2rq15rqid9ii.jpg`, 22, 4.6, 11, false],
      ['U-47700', 'u-47700', `${RC_CDN}/v1791296696/NitazeneChemicals/products/ddd3u36kyrgkupyg8kqd.jpg`, 25, 4.7, 16, true],
      ['Kratom Powder', 'kratom-powder', `${RC_CDN}/v1791296665/NitazeneChemicals/products/hnbhamplcl3tjeugvr9a.jpg`, 60, 4.9, 38, true],
      ['Crystal Meth', 'crystal-meth', `${RC_CDN}/v1791297743/NitazeneChemicals/products/dyf9px0rwcgyrnskynwm.webp`, 20, 4.8, 19, true],
    ];
    researchChemicals.forEach(([name, slug, img, stock, rating, reviews, featured]) => {
      productsData.push({
        name,
        slug,
        category: 'research chemicals',
        images: [img],
        description: `${name} is a lab-grade research chemical supplied strictly for analytical and forensic research. Consistent purity, batch documentation available. Not for human or veterinary use.`,
        priceVariants: RC_TIER,
        countInStock: stock,
        rating,
        numReviews: reviews,
        featured,
      });
    });

    // Insert products
    await Product.insertMany(productsData);
    console.log(`${productsData.length} products inserted`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
