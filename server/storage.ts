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
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
        phone: "N/A",
        businessLinks: {
          website: "https://www.surcocart.com",
          facebook: "https://www.facebook.com/SurcoCart/",
          instagram: "https://www.instagram.com/surcocart?utm_source=ig_web_button_share_sheet&igsh=MThpNXhnaTk4eWFhYw==",
        },
        menu: [
          { name: "Arroz Con Pollo (Chicken & Rice), GF", price: "$13.00", description: "Aromatic Jasmine rice bursting with fresh cilantro, grilled chicken, cabbage, and organic spring mix with homemade passion fruit dressing.", category: "Chicken Dishes" },
          { name: "Aji de Gallina (Chili Chicken), Mild", price: "$13.00", description: "Shredded chicken in creamy sauce with a mild kick of yellow chili pepper, jasmine rice, boiled potatoes, hard boiled egg, cabbage, and organic spring mix with homemade passion fruit dressing.", category: "Chicken Dishes" },
          { name: "Chicken Adobo (Chili Chicken), Mild", price: "$13.00", description: "Slow-braised chicken strips in tangy adobo sauce, brown lentils, jasmine rice, cabbage, and organic spring mix with homemade passion fruit dressing.", category: "Chicken Dishes" },
          { name: "Pastel De Papa (Scalloped Potatoes)", price: "$13.00", description: "Golden-baked potatoes slices layered with cheese, grilled chicken, cabbage, and organic spring mix with homemade passion fruit dressing.", category: "Chicken Dishes" },
          { name: "Arroz Chaufa, GF", price: "$TBD", description: "Wok stir-fried rice elevated with unique blends of homemade sauces (including sesame oil, soy sauce, & scrambled eggs), grilled chicken, cabbage, and organic spring mix with passion fruit dressing.", category: "Chicken Dishes" },

          // Start of vegitarian section
          { name: "Cilantro Rice, GF", price: "$TBD", description: "Stir-fried rice, grilled chicken, salad with passion fruit dressing.", category: "Vegetarian Dishes" },
          { name: "Arroz Chaufa, GF", price: "$TBD", description: "Stir-fried rice, grilled chicken, salad with passion fruit dressing.", category: "Vegetarian Dishes" },
          { name: "Pastel De Papa, GF", price: "$TBD", description: "Stir-fried rice, grilled chicken, salad with passion fruit dressing.", category: "Vegetarian Dishes" },

          // Extras
          { name: "TBD", price: "$TBD", description: "TBD", category: "Extras" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Extras" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Extras" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Extras" },

          // Beverages
          { name: "TBD", price: "$TBD", description: "TBD", category: "Beverages" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Beverages" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Beverages" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Beverages" },
          { name: "TBD", price: "$TBD", description: "TBD", category: "Beverages" },
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
        description: "Hearty dishes from the streets of Bombay",
        image: "https://bloximages.chicago2.vip.townnews.com/captimes.com/content/tncms/assets/v3/editorial/6/86/686e01e1-6dcf-5678-bba6-30383ae84644/60f6c1e8cf21f.image.jpg?resize=1396%2C930",
        category: "southeast_asian",
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
        image: "https://bloximages.chicago2.vip.townnews.com/captimes.com/content/tncms/assets/v3/editorial/5/ec/5ec217a6-6952-5dac-a466-a881079c50ae/61d8c56fd9a7f.image.jpg?resize=780%2C500",
        category: "asian",
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
          { name: "Steak, Chicken, and/or Pork", price: "$12.00", description: "Corn hard flat tortilla, beans ,lettuce, onion, cilantro, sour cream mozarella cheese." },
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

      // The Roost Fried Chicken
      {
        slug: "roost",
        name: "The Roost Fried Chicken",
        description: "Crispy fried chicken with spicy dry rubs",
        image: "/roost_pic.jpg",
        category: "american",
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
        phone: "(608) 422-9622",
        businessLinks: {
          website: "https://www.theroostfriedchicken.com",
          instagram: "https://www.instagram.com/theroostfriedchicken?utm_source=ig_web_button_share_sheet&igsh=MTdueWhrd3BnMjdzcw==",
          facebook: "https://www.facebook.com/TheRoostFriedChicken/"
        },
        menu: [
          // Chicken Tenders
          { name: "2-Piece Tenders", price: "$8.00 / $12.00", description: " " },
          { name: "3-Piece Tenders", price: "$12.00 / $15.00", description: " " },
          { name: "4-Piece Tenders", price: "$16.00 / $18.00", description: " " },
          
          // Chicken Sandwiches
          { name: "Badgerville Spicy", price: "$10.00 / $14.00", description: "Fried chicken dipped in honey butter and seasoned with spicy dry rub. Topped with pickles and coleslaw on a brioche bun." },
          { name: "Original", price: "$9.00 / $13.00", description: "Signature fried chicken topped with mayo and pickles on a brioche bun." },
          { name: "Deluxe", price: "$10.00 / $14.00", description: "Signature fried chicken topped with lettuce, tomato, pickles, cheese, and mayo on a brioche bun." },
          
          // Sides
          { name: "French Fries", price: "$4.00 / $6.00", description: " " },
          { name: "Cheese Curds", price: "$6.00", description: " " },
          { name: "Coleslaw", price: "$3.00", description: " " },
          
          // Extras
          { name: "Make it a Meal", price: " ", description: "Includes french fries and a drink. Substitute cheese curds ($2.00). Substitute lemonade  (Small- $1.00) (Large- $2.00)" },
          { name: "Roost Style", price: " ", description: "Substitute mayo for Roost Sauce." },
          { name: "Dip Chicken in Honey Butter", price: "$1.00", description: " " }
        ],
        
        schedule: {
          "Monday": "Closed",
          "Tuesday": "11:00 am - 2:00 pm",
          "Wednesday": "11:00 am - 2:00 pm",
          "Thursday": "11:00 am - 2:00 pm",
          "Friday": "11:00 am - 2:00 pm",
          "Saturday": "Closed",
          "Sunday": "Closed"
        }
      },

      // M & J Jamaican Kitch'n
      {
        slug: "mj-jamaican",
        name: "M & J Jamaican Kitch'n",
        description: "TBD",
        image: "/mj_pic.jpg",
        category: "caribbean",
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
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
      },

      // New Food Truck
      {
        slug: "falafel",
        name: "King of Falafel",
        description: "Fresh falafel and ",
        image: "TBD",
        category: "middle_eastern",
        location: "state-street-library-mall",
        locationDisplayName: "State Street & Library Mall",
        phone: "N/A",
        businessLinks: {
          website: "https://kingoffalafel.dine.online/locations/2964238?fulfillment=pickup",

        },
        menu: [
          { name: "Falafel Sandwich", price: "$9.00", description: "Hummus, tomato, tahini." },
          { name: "Falafel Sandwich", price: "$10.00", description: "Taziki, tomato, onion." },
          { name: "Chicken Shawarma", price: "$10.00", description: "Grilled onion, tomato, pickle, lettuce, tahini." },
          { name: "Veggie Plate", price: "$12.00", description: "Babaganouj, hummus, basmati rice, falafel (x2)." },
          { name: "Gyro Egg Roll (2 pieces)", price: "$5.00", description: "Gyro meat, banana pepper, swiss cheese." }
        ],
        schedule: {
          "Monday": "11:00 am - 3:00 pm",
          "Tuesday": "11:00 am - 3:00 pm",
          "Wednesday": "11:00 am - 3:00 pm",
          "Thursday": "11:00 am - 3:00 pm",
          "Friday": "11:00 am - 3:00 pm",
          "Saturday": "11:00 pm - 3:00 pm",
          "Sunday": "11:00 pm - 3:00 pm"
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
