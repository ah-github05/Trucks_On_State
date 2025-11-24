import { storage } from '../server/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function exportTrucks() {
  const trucks = await storage.getFoodTrucks();
  const outputPath = path.resolve(__dirname, '../client/public/trucks.json');

  fs.writeFileSync(outputPath, JSON.stringify(trucks, null, 2));
  console.log(`✓ Exported ${trucks.length} trucks to client/public/trucks.json`);
}

exportTrucks();
