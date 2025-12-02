import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const foodCarts = pgTable("food_carts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  locationDisplayName: text("location_display_name").notNull(),
  menu: json("menu").$type<MenuItem[]>().notNull(),
  schedule: json("schedule").$type<Schedule>().notNull(),
  businessLinks: json("business_links").$type<BusinessLinks>(),
});

export interface MenuItem {
  name: string;
  price: string;
  price2?: string;
  description: string;
  category?: string;
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

export const insertFoodCartSchema = createInsertSchema(foodCarts).omit({
  id: true,
});

export type InsertFoodCart = z.infer<typeof insertFoodCartSchema>;
export type FoodCart = typeof foodCarts.$inferSelect;
