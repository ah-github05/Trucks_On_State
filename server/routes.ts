import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all food carts
  app.get("/api/food-carts", async (req, res) => {
    try {
      const carts = await storage.getFoodCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food carts" });
    }
  });

  // Get food cart by slug
  app.get("/api/food-carts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const cart = await storage.getFoodCartBySlug(slug);

      if (!cart) {
        return res.status(404).json({ message: "Food cart not found" });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food cart" });
    }
  });

  // Search food carts
  app.get("/api/food-carts/search/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const carts = await storage.searchFoodCarts(query);
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: "Failed to search food carts" });
    }
  });

  // Filter food carts by category
  app.get("/api/food-carts/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const carts = await storage.filterFoodCartsByCategory(category);
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: "Failed to filter food carts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
