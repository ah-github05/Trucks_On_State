import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const foodTrucks = pgTable("food_trucks", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  phone: text("phone").notNull(),
  menu: json("menu").$type<MenuItem[]>().notNull(),
  schedule: json("schedule").$type<Schedule>().notNull(),
  businessLinks: json("business_links").$type<BusinessLinks>(),
});

export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface Schedule {
  [key: string]: string; // day of week -> hours string
}

export interface BusinessLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  orderOnline?: string;
}

export const insertFoodTruckSchema = createInsertSchema(foodTrucks).omit({
  id: true,
});

export type InsertFoodTruck = z.infer<typeof insertFoodTruckSchema>;
export type FoodTruck = typeof foodTrucks.$inferSelect;

// Contact Form Schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  submitted_at: text("submitted_at").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  submitted_at: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
