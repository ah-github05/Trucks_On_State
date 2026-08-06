import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { FoodCart } from '../shared/schema';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://capitalcityfoodcarts.com';

function loadCarts(): FoodCart[] {
  const cartsPath = path.resolve(__dirname, '../client/public/carts.json');
  return JSON.parse(fs.readFileSync(cartsPath, 'utf-8'));
}

function generateSitemap(carts: FoodCart[]) {
  const staticUrls = [{ loc: `${SITE_URL}/`, priority: '1.0' }];
  const cartUrls = carts.map((cart) => ({
    loc: `${SITE_URL}/cart/${cart.slug}`,
    priority: '0.8',
  }));

  const urls = [...staticUrls, ...cartUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const outputPath = path.resolve(__dirname, '../client/public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
}

function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  const outputPath = path.resolve(__dirname, '../client/public/robots.txt');
  fs.writeFileSync(outputPath, robots);
  console.log('✓ Generated robots.txt');
}

function injectItemListSchema(carts: FoodCart[]) {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Madison, WI Food Carts',
    itemListElement: carts.map((cart, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/cart/${cart.slug}`,
      name: cart.name,
    })),
  };

  const scriptTag = `    <script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n  </head>`;

  // Injected into the BUILT output only (dist/public/index.html), not the
  // source client/index.html, so repeated builds never dirty tracked source.
  const distIndexPath = path.resolve(__dirname, '../dist/public/index.html');
  if (!fs.existsSync(distIndexPath)) {
    console.warn('⚠ dist/public/index.html not found — run this after `vite build`. Skipping ItemList injection.');
    return;
  }

  const html = fs.readFileSync(distIndexPath, 'utf-8').replace('  </head>', scriptTag);
  fs.writeFileSync(distIndexPath, html);
  console.log(`✓ Injected ItemList structured data for ${carts.length} carts into dist/public/index.html`);
}

function main() {
  const mode = process.argv[2];
  const carts = loadCarts();

  if (mode === 'post-build') {
    // Runs after `vite build`, once dist/public/index.html exists.
    injectItemListSchema(carts);
  } else {
    // Runs before `vite build` so sitemap.xml/robots.txt live in
    // client/public and get copied into dist/public by Vite.
    generateSitemap(carts);
    generateRobotsTxt();
  }
}

main();
