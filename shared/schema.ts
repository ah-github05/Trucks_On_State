import { z } from "zod";

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

const menuItemSchema = z.object({
  name: z.string(),
  price: z.string(),
  price2: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
});

const scheduleSchema = z.record(z.string());

const businessLinksSchema = z.object({
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  orderOnline: z.string().optional(),
});

export const foodCartSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
  location: z.string(),
  locationDisplayName: z.string(),
  mapsUrl: z.string().optional(),
  menu: z.array(menuItemSchema),
  schedule: scheduleSchema,
  businessLinks: businessLinksSchema.optional(),
});

export const insertFoodCartSchema = foodCartSchema.omit({ id: true });

export type InsertFoodCart = z.infer<typeof insertFoodCartSchema>;
export type FoodCart = z.infer<typeof foodCartSchema>;
