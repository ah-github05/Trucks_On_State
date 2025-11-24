import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from '../server/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.get("/api/food-trucks", async (_req, res) => {
  try {
    const trucks = await storage.getFoodTrucks();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food trucks" });
  }
});

app.get("/api/food-trucks/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const truck = await storage.getFoodTruckBySlug(slug);

    if (!truck) {
      return res.status(404).json({ message: "Food truck not found" });
    }

    res.json(truck);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food truck" });
  }
});

// Serve static files from dist/public
const distPath = path.resolve(__dirname, '..', 'dist', 'public');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

export default app;
