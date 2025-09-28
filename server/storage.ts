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
        businessLinks: {},
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
        phone: "N/A",
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

      // Bombay Fast
      {
        slug: "bombay",
        name: "Bombay Fast",
        description: "Spiced dishes from the heart of Bombay",
        image: "https://bloximages.chicago2.vip.townnews.com/captimes.com/content/tncms/assets/v3/editorial/6/86/686e01e1-6dcf-5678-bba6-30383ae84644/60f6c1e8cf21f.image.jpg?resize=1396%2C930",
        category: "southeast_asian",
        location: "State Street & Library Mall",
        phone: "N/A",
        businessLinks: {
          instagram: "https://www.instagram.com/bombayfastcafe?utm_source=ig_web_button_share_sheet&igsh=enJzc25kaWZodTZt",
        },
        menu: [
          { name: "Bombay Vada Pav", price: "$10.00", description: "Bombay potato burger topped with sweet and spicyrelishserved with garlic chutney and flavored green chilies." },
          { name: "Bombay Misal Pav", price: "$10.00", description: "Indian pluses cooked with authentic home-style spices topped with Bombay Trail mix. Garnished with chopped onions, cilantro, and lemon. Served with bread." },
          { name: "Bombay Pav Bhaji", price: "$10.00", description: "Medley of vegetbles cooked with authentic home-style spices. Garnished with butter, chopped onions, cilanto, and lemon. Served with bread." },
          { name: "Bombay Falafel Meal", price: "$10.00", description: "Bombay style falafel completed with pulav, gravy, and saald. Served with a side of sweet and green chutney." },
          { name: "Chole", price: "$10.00", description: "One pot recipe of garbonzo beans (chickpeas) cooked with authentic home-style spices. Garnished with chopped onions, cilantro, and lime. Served with naan, rice, and chutney."},
          { name: "Chole Samosa", price: "$10.00", description: "Chatt recipe made with samosas, chana masala, various chutneys, and spices. Popular recipe from North India" },
          { name: "Dal Makhani (Black Gram)", price: "$10.00", description: "Black Gram sooked with authentic home-style spices. Garnished with chopped onions, cilantro, and lemon. Served with naan, rice, and chutney."},
          { name: "Rajma (Kidney Beans)", price: "$10.00", description: "Kidney beans cooked with authentic home style spices garnished with chopped onions, cilantro, and lime. Served with naan, rice, and chutney."}
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

      // Nani
      {
        slug: "nani",
        name: "Nani",
        description: "Chinese dim sum and Sichuan-style stir-fry",
        image: "***",
        category: "Asian",
        location: "TBD",
        phone: "N/A",
        businessLinks: {
          website: "https://nani.restaurant",
          instagram: "https://www.instagram.com/nani.restaurant/?utm_source=ig_web_button_share_sheet",
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
          "Monday": "11:00 am - 2:00 pm",
          "Tuesday": "11:00 am - 2:00 pm",
          "Wednesday": "11:00 am - 2:00 pm",
          "Thursday": "11:00 am - 2:00 pm",
          "Friday": "11:00 am - 2:00 pm",
          "Saturday": "Closed",
          "Sunday": "Closed"
        }
      },

      // Jolly Frog
      {
        slug: "jolly-frog",
        name: "Jolly Frog",
        description: "Authentic Mexican food with fresh ingredients",
        image: "TBD",
        category: "mexican",
        location: "State Street & Library Mall",
        phone: "N/A",
        businessLinks: {
          facebook: "https://www.facebook.com/jollyfrogllc?mibextid=wwXIfr"
        },
        menu: [
          { name: "Steak and/or Pork", price: "$10.00", description: "Corn tortilla, onion, cilantro, lime." },
          { name: "Chicken", price: "$10.00", description: "Corn tortilla, lettuce, sour cream, cheese." },
          { name: "Veggie", price: "$10.00", description: "Corn tortilla, onion, cilantro, lettuce, tomato, sour cream, cheese, avocado." },
          { name: "Steak, Chicken, and/or Pork", price: "$12.00", description: "Flour tortilla, rice, beans, onion, cilantro, lettuce, cheese, sour cream." },
          { name: "Veggie", price: "$12.00", description: "Flour tortilla, rice, beans, onion, cilantro, lettuce, tomato, avocado, cheese, sour cream." },
          { name: "Steak, Chicken, and/or Pork", price: "$10.00", description: "Nacho cheese, beans, onion, cilantro, lettuce, shredded cheddar cheese, monterrey jack, sour cream, jalapeños." },
          { name: "Veggie", price: "$10.00", description: "Nacho cheese, beans, onion, cilantro, lettuce, shredded cheddar cheese, monterrey jack, sour cream, jalapeños." },
          { name: "Taco", price: "$3.50", description: "Meat, onion, cilantro, lettuce, tomato, mozzarella cheese, sour cream." },
          { name: "Steak, Chicken, and/or Pork", price: "$12.00", description: "Corn hard flat tortilla, beans ,lettuce, onion ,cilantro, sour cream mozarella cheese." },
          { name: "Veggie", price: "$12.00", description: "Corn hard flat tortilla, beans, lettuce, onion, cilantro, tomato, sour cream, mozzarella cheese, avocado." }
        ],
        schedule: {
          "Monday": "11:00 am - 3:00 pm",
          "Tuesday": "11:00 am - 3:00 pm",
          "Wednesday": "11:00 am - 3:00 pm",
          "Thursday": "11:00 am - 3:00 pm",
          "Friday": "11:00 am - 3:00 pm",
          "Saturday": "Closed",
          "Sunday": "Closed"
        }
      },

      // Smoky Joe's BBQ
      {
        slug: "roost",
        name: "The Roost Fried Chicken",
        description: "Crispy fried chicken with spicy dry rubs",
        image: "TBD",
        category: "TBD",
        location: "State Street & Library Mall",
        phone: "(608) 422-9622",
        businessLinks: {
          website: "https://www.theroostfriedchicken.com",
          instagram: "https://www.instagram.com/theroostfriedchicken?utm_source=ig_web_button_share_sheet&igsh=MTdueWhrd3BnMjdzcw==",
          facebook: "https://www.facebook.com/TheRoostFriedChicken/"
        },
        menu: [
          { name: "Pulled Pork Sandwich", price: "$12.99", description: "Slow-smoked pulled pork with house BBQ sauce on a brioche bun." },
          { name: "Brisket Platter", price: "$18.99", description: "Sliced beef brisket with two classic sides and cornbread." },
          { name: "BBQ Ribs (Half Rack)", price: "$16.99", description: "Fall-off-the-bone ribs with dry rub and signature sauce." },
          { name: "Smoked Chicken (Half)", price: "$14.99", description: "Half chicken with smoky BBQ glaze and choice of two sides." },
          { name: "BBQ Combo Platter", price: "$22.99", description: "Choice of two meats with two sides and cornbread." },
          { name: "Mac & Cheese", price: "$5.99", description: "Creamy three-cheese mac with crispy breadcrumb topping." },
          { name: "Coleslaw", price: "$4.99", description: "Fresh coleslaw with tangy vinegar-based dressing." },
          { name: "Baked Beans", price: "$5.49", description: "House-made baked beans with bacon and molasses." },
          { name: "Cornbread", price: "$3.99", description: "Fresh-baked cornbread with honey butter." }
        ],
        schedule: {
          "Monday": "11:00 am - 8:00 pm",
          "Tuesday": "11:00 am - 8:00 pm",
          "Wednesday": "11:00 am - 8:00 pm",
          "Thursday": "11:00 am - 8:00 pm",
          "Friday": "11:00 am - 9:00 pm",
          "Saturday": "11:00 am - 9:00 pm",
          "Sunday": "12:00 pm - 7:00 pm"
        }
      },

      // TBD Food Truck
      {
        slug: "tbd-food-truck",
        name: "M & J Jamaican Kitch'n",
        description: "TBD",
        image: "TBD",
        category: "TBD",
        location: "TBD",
        phone: "TBD",
        businessLinks: {
          website: "TBD",
          instagram: "TBD",
          facebook: "TBD"
        },
        menu: [
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
          { name: "TBD", price: "$TBD", description: "TBD" },
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
    const truck = { ...insertTruck, id } as FoodTruck;
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
