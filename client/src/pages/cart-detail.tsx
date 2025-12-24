import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SiteNavigationHeader from "@/components/header";
import SiteContactFooter from "@/components/footer";
import { isCurrentlyOpen } from "@/lib/utils";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { FoodCart, MenuItem } from "@shared/schema";

// Utility function to group menu items by category
function groupMenuByCategory(menu: MenuItem[]): Record<string, MenuItem[]> {
  return menu.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);
}

// Standard menu item component
interface MenuItemProps {
  item: MenuItem;
  index: number;
}

function StandardMenuItem({ item, index }: MenuItemProps) {
  return (
    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h5 className="font-medium text-gray-900">{item.name}</h5>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
        <span className="font-semibold text-primary ml-4">{item.price}</span>
      </div>
    </div>
  );
}

// Dual price menu item component (for items with small/large pricing)
interface DualPriceMenuItemProps {
  item: MenuItem;
  index: number;
  smallPrice: string;
  largePrice: string;
}

function DualPriceMenuItem({ item, index, smallPrice, largePrice }: DualPriceMenuItemProps) {
  return (
    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h5 className="font-medium text-gray-900">{item.name}</h5>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>
        <div className="ml-4 flex flex-col items-end">
          <div className="font-semibold">
            <span className="text-gray-900">Small: </span>
            <span className="text-primary">{smallPrice}</span>
          </div>
          <div className="font-semibold">
            <span className="text-gray-900">Large: </span>
            <span className="text-primary">{largePrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Menu category component
interface MenuCategoryProps {
  category: string;
  items: MenuItem[];
  renderItem?: (item: MenuItem, index: number) => React.ReactElement;
}

function MenuCategory({ category, items, renderItem }: MenuCategoryProps) {
  const defaultRenderItem = (item: MenuItem, index: number) => (
    <StandardMenuItem item={item} index={index} key={index} />
  );

  return (
    <React.Fragment>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">{category}</h2>
      <div className="space-y-4 mb-6">
        {items.map(renderItem || defaultRenderItem)}
      </div>
    </React.Fragment>
  );
}

// Categorized menu renderer
interface CategorizedMenuProps {
  menu: MenuItem[];
  categoryOrder: string[];
  renderItem?: (item: MenuItem, index: number) => React.ReactElement;
}

function CategorizedMenu({ menu, categoryOrder, renderItem }: CategorizedMenuProps) {
  const groupedMenu = groupMenuByCategory(menu);

  return (
    <>
      {categoryOrder
        .filter(category => groupedMenu[category])
        .map(category => (
          <MenuCategory
            key={category}
            category={category}
            items={groupedMenu[category]}
            renderItem={renderItem}
          />
        ))}
    </>
  );
}

// Menu configuration for special cart-specific rendering
interface MenuConfig {
  type: 'external-link' | 'image' | 'categorized' | 'roost-special' | 'surco-special' | 'default';
  externalUrl?: string;
  externalMessage?: string;
  externalLinkText?: string;
  imageSrc?: string;
  imageAlt?: string;
  categoryOrder?: string[];
}

const MENU_CONFIG: Record<string, MenuConfig> = {
  "sandwich-hub": {
    type: 'external-link',
    externalUrl: 'https://www.sandwichhubmadison.com/menu',
    externalMessage: 'Sandwich Hub has a rotating menu and is subject to change. Please check their website to find the menu of the day!',
    externalLinkText: "View Today's Menu"
  },
  "kona-ice": {
    type: 'image',
    imageSrc: '/konaice-menu_pic.jpg',
    imageAlt: 'Kona Ice Menu'
  },
  "roost": {
    type: 'image',
    imageSrc: '/roost-menu_pic.jpg',
    imageAlt: 'The Roost Fried Chicken Menu'
  },
  "toms_coffee": {
    type: 'image',
    imageSrc: '/toms-menu_pic.jpg',
    imageAlt: "Travelin' Tom's Coffee Menu"
  },
  "cinn-city": {
    type: 'image',
    imageSrc: '/cinncity-menu_pic.jpg',
    imageAlt: 'Cinn City Smash Menu'
  },
  "jolly-frog": {
    type: 'categorized',
    categoryOrder: ["Tacos with Rice & Beans (2 per order)", "Burrito / Bowl (chips on the side)", "Tostadas with Rice (2 per order)", "Build Your Own", "Nachos", "Drinks"]
  },
  "surco": {
    type: 'surco-special',
    categoryOrder: ["Chicken Dishes", "Vegetarian Dishes", "Extras", "Beverages"]
  },
  "falafel": {
    type: 'categorized',
    categoryOrder: ["Main Dishes"]
  },
  "bombay": {
    type: 'categorized',
    categoryOrder: ["Bombay Specialties", "Lentil & Bean Dishes"]
  },
  "crepeuw": {
    type: 'categorized',
    categoryOrder: ["Crepes", "Crepe Sushi", "Sauces"]
  },
  "mj-jamaican": {
    type: 'categorized',
    categoryOrder: ["Plates", "Sides"]
  },
  "naan_stop": {
    type: 'categorized',
    categoryOrder: ["Naan Folds", "Sides", "Drinks"]
  },
  "stellies": {
    type: 'categorized',
    categoryOrder: ["Ice Cream"]
  },
  "fresh-cool": {
    type: 'categorized',
    categoryOrder: ["Spring Rolls"]
  },
  "toast": {
    type: 'categorized',
    categoryOrder: ["Classic Paninis"]
  },
  "nirvana": {
  type: 'image',
  imageSrc: '/nirvana_menu.jpg',
  imageAlt: 'Culinary Nirvana Menu'
}
};

// Menu content component to handle all menu rendering patterns
interface MenuContentProps {
  cart: FoodCart;
}

function MenuContent({ cart }: MenuContentProps) {
  const config = MENU_CONFIG[cart.slug] || { type: 'default' as const };

  switch (config.type) {
    case 'external-link':
      return (
        <>
          <p className="text-gray-600 mb-4">{config.externalMessage}</p>
          <div className="mt-4">
            <a
              href={config.externalUrl}
              className="text-primary hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.externalLinkText}
            </a>
          </div>
        </>
      );

    case 'image':
      return (
        <img
          src={config.imageSrc}
          alt={config.imageAlt}
          className="w-full rounded-lg"
        />
      );

    case 'roost-special':
      return <RoostMenu cart={cart} />;

    case 'surco-special':
      return <SurcoMenu cart={cart} categoryOrder={config.categoryOrder || []} />;

    case 'categorized':
      return <CategorizedMenu menu={cart.menu} categoryOrder={config.categoryOrder || []} />;

    case 'default':
      return (
        <div className="space-y-4">
          {cart.menu.map((item, index) => (
            <StandardMenuItem key={index} item={item} index={index} />
          ))}
        </div>
      );
  }
}

// Roost special menu (has custom sections and dual-price items)
function RoostMenu({ cart }: { cart: FoodCart }) {
  const groupedMenu = groupMenuByCategory(cart.menu);
  const chickenCategory = groupedMenu["Chicken Tenders & Sandwiches"] || [];
  const extrasCategory = groupedMenu["Extras"] || [];

  return (
    <>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-semibold text-gray-900 underline">Jumbo 1/4 lb Chicken Tenders</h2>
        <span className="font-semibold text-gray-900">Tenders / Meal</span>
      </div>
      <div className="space-y-4 mb-6">
        {chickenCategory.slice(0, 3).map((item, index) => (
          <StandardMenuItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-semibold text-gray-900 underline">Chicken Sandwiches</h2>
        <span className="font-semibold text-gray-900">Sandwich / Meal</span>
      </div>
      <div className="space-y-4 mb-6">
        {chickenCategory.slice(3, 6).map((item, index) => (
          <StandardMenuItem key={index} item={item} index={index} />
        ))}
      </div>

      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-semibold text-gray-900 underline">Sides</h2>
      </div>
      <div className="space-y-4 mb-6">
        {chickenCategory.slice(6, 9).map((item, index) => (
          item.name === "French Fries" ? (
            <DualPriceMenuItem key={index} item={item} index={index} smallPrice="$4.00" largePrice="$6.00" />
          ) : (
            <StandardMenuItem key={index} item={item} index={index} />
          )
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">Extras</h2>
      <div className="space-y-4 mb-6">
        {extrasCategory.map((item, index) => (
          item.name === "Meal - Substitute lemonade" ? (
            <DualPriceMenuItem key={index} item={item} index={index} smallPrice="$1.00" largePrice="$2.00" />
          ) : (
            <StandardMenuItem key={index} item={item} index={index} />
          )
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 underline">Spice Level</h2>
        <div className="grid grid-cols-[max-content,1fr] gap-x-4 mb-6">
          <div>1) Extreme</div>
          <div></div>
          <div>2) Spicy</div>
          <div></div>
          <div>3) Mild</div>
          <div></div>
          <div>4) No Spice</div>
          <div></div>
          <div>5) Naked</div>
        </div>
      </div>
    </>
  );
}

// Surco special menu (has dual-price item)
function SurcoMenu({ cart, categoryOrder }: { cart: FoodCart; categoryOrder: string[] }) {
  const groupedMenu = groupMenuByCategory(cart.menu);

  return (
    <>
      {categoryOrder.map(category => {
        const items = groupedMenu[category];
        if (!items) return null;

        return (
          <React.Fragment key={category}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 underline">{category}</h2>
            <div className="space-y-4 mb-6">
              {items.map((item, index) => (
                item.name === "Cilantro Rice, GF" ? (
                  <DualPriceMenuItem key={index} item={item} index={index} smallPrice="$8.00" largePrice="$13.00" />
                ) : (
                  <StandardMenuItem key={index} item={item} index={index} />
                )
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

// Schedule card component with switch statement instead of nested ternaries
interface ScheduleCardProps {
  cart: FoodCart;
}

function ScheduleCard({ cart }: ScheduleCardProps) {
  const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  switch (cart.slug) {
    case "kona-ice":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Kona Ice travels to various locations on an alternating schedule. Check out their Facebook to see where they will be!
            </p>
            <div className="mt-4">
              <a
                href={cart.businessLinks?.facebook || "#"}
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Facebook
              </a>
            </div>
          </CardContent>
        </Card>
      );

    case "toms_coffee":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Travelin' Tom's Coffee travels to various locations on an alternating schedule. Check out their facebook to see where they will be!
            </p>
            <div className="mt-4">
              <a
                href={cart.businessLinks?.facebook || "#"}
                className="text-primary hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Facebook
              </a>
            </div>
          </CardContent>
        </Card>
      );

    case "cinn-city":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Currently in their off-season. Schedule will be updated when they are running!
            </p>
          </CardContent>
        </Card>
      );

    case "stellies":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {Object.keys(cart.schedule)[0]}
            </p>
          </CardContent>
        </Card>
      );

    default:
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium">{day}</span>
                  <span className="text-gray-600">{cart.schedule[day]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
  }
}

export default function IndividualFoodCartDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: carts, isLoading, error } = useQuery<FoodCart[]>({
    queryKey: ["/carts.json"],
  });

  const cart = carts?.find(t => t.slug === slug);

  if (error || (carts && !cart)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteNavigationHeader />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Cart Not Found</h1>
            <p className="text-gray-600 mb-8">The food cart you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <SiteContactFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNavigationHeader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Carts
          </Button>
        </Link>

        {isLoading && (
          <div className="space-y-8">
            <Skeleton className="w-full h-64 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        )}

        {cart && (
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <img
                src={cart.image}
                alt={cart.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isCurrentlyOpen(cart.schedule) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isCurrentlyOpen(cart.schedule) ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cart Info */}
              <div className="space-y-6">
                <div>
                  <div className="mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{cart.name}</h1>
                  </div>
                  <p className="text-lg text-gray-600">{cart.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    {cart.mapsUrl ? (
                      <a
                        href={cart.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors hover:underline"
                      >
                        {cart.locationDisplayName}
                      </a>
                    ) : (
                      <span>{cart.locationDisplayName}</span>
                    )}
                  </div>
                </div>

                <ScheduleCard cart={cart} />
              </div>

              {/* Menu */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Menu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <MenuContent cart={cart} />
                    </div>
                  </CardContent>
                </Card>

                {/* Business Links - Hidden for Fresh Cool Drinks */}
                {cart.slug !== "fresh-cool" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          {cart.businessLinks?.website && (
                            <a 
                              href={cart.businessLinks.website} 
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
                          )}
                          {cart.businessLinks?.facebook && (
                            <a 
                              href={cart.businessLinks.facebook} 
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Facebook Page
                            </a>
                          )}
                          {cart.businessLinks?.instagram && (
                            <a 
                              href={cart.businessLinks.instagram} 
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Instagram
                            </a>
                          )}
                          {cart.businessLinks?.orderOnline && (
                            <a 
                              href={cart.businessLinks.orderOnline} 
                              className="text-primary hover:text-primary/80 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Order Online
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <SiteContactFooter />
    </div>
  );
}
