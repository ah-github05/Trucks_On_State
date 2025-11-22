// Vercel serverless function entry point
import express from "express";
import { storage } from "../server/storage";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all food trucks
app.get("/api/food-trucks", async (req, res) => {
  try {
    const trucks = await storage.getFoodTrucks();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food trucks" });
  }
});

// Get food truck by slug
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

// Search food trucks
app.get("/api/food-trucks/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const trucks = await storage.searchFoodTrucks(query);
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Failed to search food trucks" });
  }
});

// Filter food trucks by category
app.get("/api/food-trucks/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const trucks = await storage.filterFoodTrucksByCategory(category);
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter food trucks" });
  }
});

// Export the Express app for Vercel
export default app;
