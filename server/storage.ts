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
        description: "Cold smoothies and authentic springrolls",
        image: "https://badgerherald.com/wp-content/uploads/2024/03/BMW_7422-Enhanced-NR-scaled-1-1200x801.jpg",
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
        description: "Made-to-order paninis with homemade sauces",
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
        description: "Sandwich pop-up food cart with in-house daily baked bread",
        image: "https://bloximages.chicago2.vip.townnews.com/captimes.com/content/tncms/assets/v3/editorial/2/b2/2b236bbb-3e8a-5bdf-835e-ef9a2ac09809/669806c2aa375.image.jpg?resize=1396%2C930",
        category: "sandwiches",
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
      
      // Surco Food Cart
      {
        slug: "surco",
        name: "Surco Food Cart",
        description: "A flavorful twist on classic Peruvian dishes",
        image: "https://bloximages.chicago2.vip.townnews.com/wiscnews.com/content/tncms/assets/v3/editorial/8/01/8012f089-6556-50d8-8dc0-847ada21877a/6719d0d705f72.image.jpg?crop=1920%2C1008%2C0%2C35&resize=1200%2C630&order=crop%2Cresize",
        category: "south_american",
        location: "State Street & Library Mall",
        phone: "TBD",
        businessLinks: {
          website: "https://www.surcocart.com",
          facebook: "https://www.facebook.com/SurcoCart/",
          instagram: "https://www.instagram.com/surcocart?utm_source=ig_web_button_share_sheet&igsh=MThpNXhnaTk4eWFhYw==",
        },
        menu: [
          { name: "Arroz Con Pollo (Chicken & Rice), GF", price: "$TBD", description: "Cilantro-infused jasmine rice, marinated chicken, salad with homemade passion fruit dresssing." },
          { name: "Aji de Gallina (Chili Chicken), Mild", price: "$TBD", description: "Pulled chicken breast in aji amarillo pepper sauce, jasmine rice, boiled potatoes, hard boiled egg, salad with homemade passion fruit dressing."},
          { name: "Chicken Adobo (Chili Chicken), Mild", price: "$TBD", description: "Chicken breast strips in aji panca sauce, side of brown lentils, jasmine rice, salad." },
          { name: "Pastel De Papa", price: "$TBD", description: "2-cheese scalloped potatoe,s, grilled chicken, salad with passion fruit dressing."},
          { name: "Arroz Chaufa, GF", price: "$TBD", description: "Stir-fried rice, grilled chicken, salad with passion fruit dressing."},
        ],
        schedule: {
          "Monday": "11:30 am - 2:30 pm",
          "Tuesday": "11:30 am - 2:30 pm",
          "Wednesday": "11:30 am - 2:30 pm",
          "Thursday": "11:30 am - 2:30 pm",
          "Friday": "11:30 am - 2:30 pm",
          "Saturday": "Closed",
          "Sunday": "Closed"
        }
      },

      // TBD
      {
        slug: "bombay",
        name: "Bombay Fast",
        description: "",
        image: "********",
        category: "southeast_asian",
        location: "State Street & Library Mall",
        phone: "(608) 886-3273",
        businessLinks: {
          instagram: "https://www.instagram.com/bombayfastcafe?utm_source=ig_web_button_share_sheet&igsh=enJzc25kaWZodTZt",
        },
        menu: [
          { name: "Bombay Vada Pav", price: "$10.00", description: "Bombay potato burger topped with sweet and spicyrelishserved with garlic chutney and flavored green chilies." },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD (4pc)", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" }
        ],
        schedule: {
        "Monday": "Closed",
        "Tuesday": "11:00 am - 4:30 pm",
        "Wednesday": "11:00 am - 4:30 pm",
        "Thursday": "11:00 am - 4:30 pm",
        "Friday": "11:00 am - 4:30 pm",
        "Saturday": "Closed",
        "Sunday": "Closed"
        }
      },
      {
        slug: "noodle-nomad",
        name: "Coming soon...",
        description: "Coming soon...",
        image: "https://images.squarespace-cdn.com/content/v1/5a6a66438fd4d22de6b7ba2e/1520359836611-E2MB7ZJ1ALQZ5P5Q3GPW/coming-soon.jpg",
        category: "TBD",
        location: "TBD",
        phone: "TBD",
        businessLinks: {
          website: "TBD",
          facebook: "TBD",
          instagram: "TBD",
          orderOnline: "TBD"
        },
        menu: [
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" }
        ],
        schedule: {
          "Monday": "TBD",
          "Tuesday": "TBD",
          "Wednesday": "TBD",
          "Thursday": "TBD",
          "Friday": "TBD",
          "Saturday": "TBD",
          "Sunday": "TBD"
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
