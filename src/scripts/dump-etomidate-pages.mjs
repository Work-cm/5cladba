import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../.debug/etomidate');
mkdirSync(OUT, { recursive: true });

const SLUGS = [
  'etomidate-powder-pure',
  'etomidate-crystal',
  'cychlorphine-hcl-powder',
  'medetomidine-powder',
  'tiletamine-powder',
  'spirochlorphine-r6890',
];

for (const slug of SLUGS) {
  const url = `https://www.etomidatesite.com/shop/${slug}`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });
    const html = await res.text();
    const file = path.join(OUT, `${slug}.html`);
    writeFileSync(file, html);
    console.log(`${slug}: HTTP ${res.status}, ${html.length} bytes`);
  } catch (e) {
    console.error(`${slug}: FAIL ${e.message}`);
  }
}
