import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const htmlPath = path.resolve('rc-cannabinoids.html');
const html = readFileSync(htmlPath, 'utf-8');

const m = html.match(/window\.__remixContext\s*=\s*(\{[\s\S]*?\});/);
if (!m) { console.error('No remix context found'); process.exit(1); }

const jsonStr = m[1];
writeFileSync('rc-cannabinoids.json', jsonStr, 'utf-8');

const data = JSON.parse(jsonStr);
const route = Object.values(data?.state?.loaderData || {}).find(v => v?.products);
const products = route?.products || [];

console.log(`Products found: ${products.length}\n`);
const clean = products.map(p => ({
  name: p.name,
  slug: p.slug,
  image: p.images?.[0],
  description: p.description,
  priceVariants: p.priceVariants?.map(v => ({ quantity: v.quantity, price: v.price })),
}));

for (const p of clean) {
  const tiers = p.priceVariants.map(v => `${v.quantity}g=${v.price}`).join(',');
  console.log(`${p.name} | ${tiers} | img=${p.image} | desc=${p.description}`);
}

writeFileSync('rc-cannabinoids-products.json', JSON.stringify(clean, null, 2), 'utf-8');
