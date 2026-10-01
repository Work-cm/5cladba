import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2] || 'rc-cannabinoids.html';
const html = readFileSync(file, 'utf-8');

// Find the inline script containing the data context (could be __remixContext, loaderData, or product array)
let ctxIndex = html.indexOf('window.__remixContext');
if (ctxIndex === -1) { ctxIndex = html.indexOf('__remixContext'); }
if (ctxIndex === -1) { ctxIndex = html.indexOf('"products":'); }
if (ctxIndex === -1) { console.error('no context/products found in HTML'); process.exit(1); }

let scriptStart = html.lastIndexOf('<script>', ctxIndex);
let scriptEnd = html.indexOf('</script>', ctxIndex);
if (scriptStart === -1 || scriptEnd === -1) { console.error('script boundaries not found'); process.exit(1); }
const script = html.slice(scriptStart + 8, scriptEnd).trim();

// Extract the object that starts right after the assignment
const assignMatch = script.match(/(__remixContext\s*=\s*)(\{[\s\S]*);?\s*$/);
if (!assignMatch) { console.error('could not locate object assignment'); console.log(script.slice(0,400)); process.exit(1); }
let jsonStr = assignMatch[2];
// trim trailing semicolon / JS if present
jsonStr = jsonStr.replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

function findProducts(obj) {
  if (Array.isArray(obj)) {
    for (const item of obj) { const res = findProducts(item); if (res) return res; }
  } else if (obj && typeof obj === 'object') {
    if (obj.products && Array.isArray(obj.products) && obj.products.length > 0) return obj.products;
    for (const v of Object.values(obj)) { const res = findProducts(v); if (res) return res; }
  }
  return null;
}

const products = findProducts(data);
if (!products) { console.error('no products array found'); process.exit(1); }

const clean = products.map(p => ({
  name: p.name,
  slug: p.slug,
  image: p.images?.[0],
  description: p.description,
  priceVariants: p.priceVariants?.map(v => ({ quantity: v.quantity, price: v.price })),
}));

writeFileSync('rc-products.json', JSON.stringify(clean, null, 2), 'utf-8');
console.log(`Products: ${clean.length}`);
for (const p of clean) {
  console.log(`${p.name} | ${p.priceVariants.map(v=>`${v.quantity}g=${v.price}`).join(',')} | ${p.description?.slice(0,80)}...`);
}
