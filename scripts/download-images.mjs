// Downloads real photographs into public/images/ so they replace the placeholders.
// 1. Pick royalty-free photos (Unsplash / Pexels / Pixabay) and copy each DIRECT image link
//    (right-click the photo → "Copy image address").
// 2. Paste them into the LIST below, next to the file name you want.
// 3. Run:  npm run images
// Needs Node 18+ and internet access. Files already present are skipped unless you delete them.
import fs from 'node:fs/promises';
import path from 'node:path';

const LIST = {
  // 'backgrounds/hero.jpg':        'https://…',   // dry ASAL landscape, wide
  // 'backgrounds/cta.jpg':         'https://…',   // green restoration / community
  // 'backgrounds/about.jpg':       'https://…',
  // 'backgrounds/page-header.jpg': 'https://…',
  // 'programmes/programme-1.jpg':  'https://…',   // … up to programme-9
  // 'articles/article-1.jpg':      'https://…',
  // 'gallery/gallery-1.jpg':       'https://…',   // … up to gallery-8 (add more in src/data/site.js)
};

const root = path.resolve('public/images');
for (const [file, url] of Object.entries(LIST)) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dest = path.join(root, file);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log('saved', file);
  } catch (e) { console.error('FAILED', file, e.message); }
}
if (!Object.keys(LIST).length) console.log('Nothing to download – edit scripts/download-images.mjs first.');
