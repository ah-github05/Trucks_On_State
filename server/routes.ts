import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
