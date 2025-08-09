import { foodTrucks, type FoodTruck, type InsertFoodTruck } from "@shared/schema";

export interface IStorage {
  getFoodTrucks(): Promise<FoodTruck[]>;
  getFoodTruckBySlug(slug: string): Promise<FoodTruck | undefined>;
  createFoodTruck(truck: InsertFoodTruck): Promise<FoodTruck>;
  searchFoodTrucks(query: string): Promise<FoodTruck[]>;
  filterFoodTrucksByCategory(category: string): Promise<FoodTruck[]>;
}

export class MemStorage implements IStorage {
  private trucks: Map<number, FoodTruck>;
  private currentId: number;

  constructor() {
    this.trucks = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleTrucks: InsertFoodTruck[] = [
      {
        // Fresh cool drinks
        slug: "fresh-cool",
        name: "Fresh Cool Drinks",
        description: "Cold smoothies and authentic springrolls!",
        image: "https://preview.redd.it/1q28cjowgp831.jpg?width=1080&crop=smart&auto=webp&s=9c7ee5e79fda7ce69fab280c949fa9c038d7b352",
        category: "asian",
        location: "State Street & Library Mall",
        phone: "N/A",
        menu: [
          { name: "Avocado Spring Roll", price: "$5.00", description: "Lettuce, cucumber, carrot, cabbage, rice noodles, peanut sauce." },
          { name: "Avocado Chicken Spring Roll", price: "$6.00", description: "Chicken, lettuce, cucumber, carrot, cabbage, rice noodles, peanut sauce" },
          { name: "Avocado Tofu Spring Roll", price: "$6.00", description: "Tofu, lettuce, cucumber, carrot, cabbage, rice noodles, peanut sauce" },
          { name: "Avocado Shrimp Spring Roll", price: "$6.00", description: "Shrimp, lettuce, cucumber, carrot, cabbage, rice noodles, peanut sauce" },
          { name: "Avocado BBQ Pork Spring Roll", price: "$6.00", description: "BBQ pork, lettuce, cucumber, carrot, cabbage, rice noodles, peanut sauce" },
          { name: "Salad Bowl", price: "$7.00", description: "Description coming soon..." }      
        ],
        schedule: {
          "Monday": "10:00 am - 6:00 pm",
          "Tuesday": "10:00 am - 6:00 pm",
          "Wednesday": "10:00 am - 6:00 pm",
          "Thursday": "10:00 am - 6:00 pm",
          "Friday": "10:00 am - 6:00 pm",
          "Saturday": "10:00 am - 7:30 pm",
          "Sunday": "10:00 am - 6:00 pm"
        }
      },

      // Toast
      {
        slug: "toast",
        name: "Toast",
        description: "Made-to-order paninis with homemade sauces!",
        image: "https://www.toastmadison.com/wp-content/themes/gili/images/toast-madison-with-bucky.jpg",
        category: "sandwiches",
        location: "State Street & Library Mall",
        phone: "+1 (608) 692-4549",
        businessLinks: {
          website: "https://toastmadison.com",
          instagram: "https://www.instagram.com/toastmadison?igsh=bDRmNjJzZm5sdWIy",
          facebook: "https://www.facebook.com/toastmadison?mibextid=wwXIfr"
        },
        menu: [
          { name: "Turkey Panini", price: "$11.00", description: "Honey-smoked turkey, pesto, garlic mayo, provolone, tomatoes, red onions, black olives, spinach." },
          { name: "Italian Mixed Meat Panini", price: "$11.00", description: "Pastrami, ham, garlic mayo, sriracha, provolone, tomatoes, black & green olives." },
          { name: "Pollo Panini", price: "$11.00", description: "Smoked chicken, pesto, garlic mayo, mozzarella, tomaotes, spinach." },
          { name: "Club Panini", price: "$11.00", description: "Ham, honey-smoked turkey, spicy brown mustard, BBQ sauce, provolone, tomatoes, red onions & spinach." },
          { name: "Spicy Panini", price: "$11.00", description: "Ham, pastrami, garlic mayo, spicy brown mustard, sriracha, provolone, tomatoes, red onions, black olives, hot giardiniera." },
          { name: "Chicken Panini", price: "$11.00", description: "Smoked chicken, BBQ sauce, red bell, mayo, cheddar, tomatoes, red onions." },
          { name: "Cuban Panini", price: "$11.00", description: "Ham, garlic mayo, spicy brown mustard, provolone, tomatoes, pickles." },
          { name: "Bacon & Egg Panini", price: "$11.00", description: "Bacon, homemade omelette, garlic mayo, sriracha, mozzarella, tomatoes, red onions, spinach." },
          { name: "Veggie Panini", price: "$11.00", description: "Provolone & mozzarella cheeses, pesto, garlic mayo, red bell mayo, tomatoes, red onions, black & green olives, spinach." },
          { name: "Classic Pesto Panini", price: "$11.00", description: "Pesto, garlic mayo, mozzarella cheese, tomatoes, spinach." },
          { name: "Grilled Cheese Panini", price: "$11.00", description: "Cheddar cheese on a French roll." },
        ],
        schedule: {
          "Monday": "11:00 am - 3:00 pm",
          "Tuesday": "11:00 am - 3:00 pm",
          "Wednesday": "11:00 am - 3:00 pm",
          "Thursday": "11:00 am - 3:00 pm",
          "Friday": "11:00 am - 3:00 pm",
          "Saturday": "11:00 am - 3:00 pm",
          "Sunday": "11:00 am - 3:00 pm"
        }
      },

      // Sandwich Hub
      {
        slug: "sandwich-hub",
        name: "Sandwich Hub",
        description: "Sandwich pop-up food cart with in-house daily baked bread!",
        image: "TBD",
        category: "sandwich",
        location: "State Street & Library Mall",
        phone: "TBD",
        businessLinks: {
          website: "https://www.sandwichhubmadison.com",
          instagram: "https://www.instagram.com/sandwich.hub.madison?igsh=cWFsdmVkMHBqenM4",
        },
        menu: [
          { name: "Pulled Pork Sandwich", price: "$11.99", description: "Slow-smoked pulled pork with BBQ sauce" },
          { name: "Brisket Platter", price: "$16.99", description: "Sliced brisket with two sides" },
          { name: "BBQ Ribs (Half Rack)", price: "$14.99", description: "Fall-off-the-bone ribs with dry rub" },
          { name: "Smoked Chicken", price: "$12.99", description: "Half chicken with signature BBQ sauce" },
          { name: "Mac & Cheese", price: "$4.99", description: "Creamy mac and cheese with breadcrumb topping" },
          { name: "Coleslaw", price: "$3.99", description: "Fresh coleslaw with tangy dressing" }
        ],
        schedule: {
          "Monday": "11:00 am - 2:00 pm",
          "Tuesday": "11:00 am - 2:00 pm",
          "Wednesday": "11:00 am - 2:00 pm",
          "Thursday": "11:00 AM - 2:00 PM",
          "Friday": "11:00 AM - 2:00 PM",
          "Saturday": "Closed",
          "Sunday": "Closed"
        }
      },
      {
        slug: "sweet-dreams",
        name: "Sweet Dreams",
        description: "Artisanal ice cream and desserts made with local Wisconsin dairy",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "desserts",
        location: "Memorial Union Terrace",
        phone: "(608) 555-0126",
        businessLinks: {
          website: "https://sweetdreamsicecream.com",
          facebook: "https://facebook.com/sweetdreamsmadison",
          instagram: "https://instagram.com/sweetdreamsicecream",
          orderOnline: "https://sweetdreamsicecream.com/order"
        },
        menu: [
          { name: "Vanilla Bean Ice Cream", price: "$4.99", description: "Madagascar vanilla with local cream" },
          { name: "Wisconsin Cheese Curds Flavor", price: "$5.99", description: "Unique sweet & salty combination" },
          { name: "Chocolate Fudge Brownie", price: "$5.49", description: "Rich chocolate with brownie chunks" },
          { name: "Strawberry Rhubarb", price: "$5.49", description: "Made with local strawberries and rhubarb" },
          { name: "Ice Cream Sandwich", price: "$6.99", description: "House-made cookies with your choice of ice cream" },
          { name: "Milkshake", price: "$7.99", description: "Thick shake with any flavor" }
        ],
        schedule: {
          "Monday": "12:00 PM - 8:00 PM",
          "Tuesday": "12:00 PM - 8:00 PM",
          "Wednesday": "12:00 PM - 8:00 PM",
          "Thursday": "12:00 PM - 9:00 PM",
          "Friday": "12:00 PM - 10:00 PM",
          "Saturday": "11:00 AM - 10:00 PM",
          "Sunday": "12:00 PM - 8:00 PM"
        }
      },
      {
        slug: "farm-fresh",
        name: "Farm Fresh Kitchen",
        description: "Farm-to-table meals featuring seasonal Wisconsin ingredients",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "healthy",
        location: "Farmers Market",
        phone: "(608) 555-0127",
        businessLinks: {
          website: "https://farmfreshkitchenmadison.com",
          facebook: "https://facebook.com/farmfreshkitchen",
          instagram: "https://instagram.com/farmfreshkitchenmadison",
          orderOnline: "https://farmfreshkitchenmadison.com/order-online"
        },
        menu: [
          { name: "Seasonal Salad Bowl", price: "$12.99", description: "Mixed greens with seasonal vegetables" },
          { name: "Farm Burger", price: "$13.99", description: "Grass-fed beef with local cheese" },
          { name: "Grilled Chicken Wrap", price: "$11.99", description: "Free-range chicken with fresh vegetables" },
          { name: "Vegetarian Quinoa Bowl", price: "$10.99", description: "Quinoa with roasted vegetables" },
          { name: "Sweet Corn Soup", price: "$6.99", description: "Made with local sweet corn" },
          { name: "Apple Crisp", price: "$5.99", description: "Made with Wisconsin apples" }
        ],
        schedule: {
          "Monday": "10:00 AM - 6:00 PM",
          "Tuesday": "10:00 AM - 6:00 PM",
          "Wednesday": "10:00 AM - 6:00 PM",
          "Thursday": "10:00 AM - 6:00 PM",
          "Friday": "10:00 AM - 7:00 PM",
          "Saturday": "8:00 AM - 7:00 PM",
          "Sunday": "10:00 AM - 5:00 PM"
        }
      },
      {
        slug: "noodle-nomad",
        name: "Noodle Nomad",
        description: "Asian fusion noodles and bowls with bold flavors and fresh ingredients",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "asian",
        location: "State Street",
        phone: "(608) 555-0128",
        businessLinks: {
          website: "https://noodlenomadmadison.com",
          facebook: "https://facebook.com/noodlenomad",
          instagram: "https://instagram.com/noodlenomadmadison",
          orderOnline: "https://postmates.com/store/noodle-nomad"
        },
        menu: [
          { name: "Pad Thai", price: "$11.99", description: "Classic Thai noodles with tamarind sauce" },
          { name: "Korean Bibimbap", price: "$12.99", description: "Rice bowl with mixed vegetables and gochujang" },
          { name: "Ramen Bowl", price: "$13.99", description: "Rich pork broth with fresh noodles" },
          { name: "Vietnamese Pho", price: "$12.99", description: "Beef pho with fresh herbs" },
          { name: "Spring Rolls (4pc)", price: "$6.99", description: "Fresh spring rolls with peanut sauce" },
          { name: "Fried Rice", price: "$9.99", description: "Wok-fried rice with vegetables and protein" }
        ],
        schedule: {
          "Monday": "Closed",
          "Tuesday": "11:00 AM - 8:00 PM",
          "Wednesday": "11:00 AM - 8:00 PM",
          "Thursday": "11:00 AM - 9:00 PM",
          "Friday": "11:00 AM - 9:00 PM",
          "Saturday": "11:00 AM - 9:00 PM",
          "Sunday": "12:00 PM - 7:00 PM"
        }
      }
    ];

    sampleTrucks.forEach(truck => {
      this.createFoodTruck(truck);
    });
  }

  async getFoodTrucks(): Promise<FoodTruck[]> {
    return Array.from(this.trucks.values());
  }

  async getFoodTruckBySlug(slug: string): Promise<FoodTruck | undefined> {
    return Array.from(this.trucks.values()).find(truck => truck.slug === slug);
  }

  async createFoodTruck(insertTruck: InsertFoodTruck): Promise<FoodTruck> {
    const id = this.currentId++;
    const truck: FoodTruck = { ...insertTruck, id };
    this.trucks.set(id, truck);
    return truck;
  }

  async searchFoodTrucks(query: string): Promise<FoodTruck[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.trucks.values()).filter(truck =>
      truck.name.toLowerCase().includes(searchTerm) ||
      truck.description.toLowerCase().includes(searchTerm) ||
      truck.category.toLowerCase().includes(searchTerm)
    );
  }

  async filterFoodTrucksByCategory(category: string): Promise<FoodTruck[]> {
    if (category === "all") {
      return this.getFoodTrucks();
    }
    return Array.from(this.trucks.values()).filter(truck => truck.category === category);
  }
}

export const storage = new MemStorage();
