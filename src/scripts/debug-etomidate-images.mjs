import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'https://www.etomidatesite.com/shop/etomidate-powder-pure';

const res = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
  },
});
const html = await res.text();
const out = path.resolve(__dirname, '../../etomidate-debug.html');
writeFileSync(out, html);
console.log(`HTTP ${res.status}, ${html.length} bytes -> ${out}`);

const urls = [...new Set((html.match(/https:\/\/[^"'\s)>]+\.(?:jpg|jpeg|png|webp|avif)(?:\?[^"'\s)>]*)?/gi) || []))];
console.log(urls.length ? urls.slice(0, 30).join('\n') : 'NO ABSOLUTE IMAGE URLS');

const srcset = [...new Set((html.match(/(?:src|srcset|data-framer-src)=["']([^"']+)["']/gi) || []))];
console.log('\nimg-ish attrs:', srcset.slice(0, 20).join('\n'));
