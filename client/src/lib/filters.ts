import type { FoodCart } from "@shared/schema";

export interface CartFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  glutenFreeOnly: boolean;
}

/** Saturday-aware location, since some carts relocate for the weekend. */
export function effectiveLocationFor(cart: FoodCart, isSaturday: boolean): string {
  return isSaturday && cart.saturdayLocation ? cart.saturdayLocation : cart.location;
}

/**
 * The single definition of "does this cart match the current filters".
 * Both the results grid and the filter bar's counts run through this so the
 * "Show N carts" button can never disagree with what the grid renders.
 */
export function cartMatchesFilters(
  cart: FoodCart,
  filters: CartFilters,
  locationOf: (cart: FoodCart) => string,
): boolean {
  const query = filters.searchQuery.trim().toLowerCase();

  const matchesSearch =
    query === "" ||
    cart.name.toLowerCase().includes(query) ||
    cart.description.toLowerCase().includes(query) ||
    cart.menu.some((item) => item.name.toLowerCase().includes(query));

  const matchesCategory = filters.selectedCategory === "all" || cart.category === filters.selectedCategory;

  const matchesLocation = filters.selectedLocation === "all" || locationOf(cart) === filters.selectedLocation;

  const matchesGlutenFree = !filters.glutenFreeOnly || cart.glutenFree === true;

  return matchesSearch && matchesCategory && matchesLocation && matchesGlutenFree;
}
