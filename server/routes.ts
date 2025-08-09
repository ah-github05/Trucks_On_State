import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MailService } from '@sendgrid/mail';
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

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

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Send email via SendGrid
      if (!process.env.SENDGRID_API_KEY) {
        console.warn("SENDGRID_API_KEY not found, contact form submission will not send email");
        return res.status(500).json({ message: "Email service not configured" });
      }

      const mailService = new MailService();
      mailService.setApiKey(process.env.SENDGRID_API_KEY);

      const emailContent = {
        to: 'ahayempourwork@gmail.com',
        from: 'noreply@foodtrucks.repl.co', // This should be verified domain
        subject: `New Contact Form Submission - ${validatedData.name}`,
        text: `
Contact Form Submission:

Name: ${validatedData.name}
Email: ${validatedData.email}

Message:
${validatedData.message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<h3>Message:</h3>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `
      };

      await mailService.send(emailContent);

      // Store message in database (optional - for record keeping)
      const contactMessage = {
        ...validatedData,
        submitted_at: new Date().toISOString()
      };
      
      await storage.createContactMessage(contactMessage);

      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
