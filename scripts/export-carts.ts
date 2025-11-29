import { storage } from '../server/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function exportCarts() {
  const carts = await storage.getFoodCarts();
  const outputPath = path.resolve(__dirname, '../client/public/carts.json');

  fs.writeFileSync(outputPath, JSON.stringify(carts, null, 2));
  console.log(`✓ Exported ${carts.length} carts to client/public/carts.json`);
}

exportCarts();
