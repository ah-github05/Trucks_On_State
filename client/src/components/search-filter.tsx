import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, MapPin, Search, UtensilsCrossed, Leaf, X, SlidersHorizontal } from "lucide-react";
import type { FoodCart } from "@shared/schema";

interface SearchFilterProps {
  carts: FoodCart[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  glutenFreeOnly: boolean;
  onGlutenFreeChange: (value: boolean) => void;
  effectiveLocationFor: (cart: FoodCart) => string;
  /** Owned by the results grid so the tray's count can't drift from what's rendered. */
  matchingCartCount: number;
}

// Food category filters
const categories = [
  { value: "all", label: "All Cuisines" },
  { value: "american", label: "American" },
  { value: "asian", label: "Asian" },
  { value: "caribbean", label: "Caribbean" },
  { value: "mexican", label: "Mexican" },
  { value: "middle_eastern", label: "Middle Eastern" },
  { value: "sandwiches", label: "Sandwiches" },
  { value: "south_american", label: "South American" },
  { value: "south_asian", label: "South Asian" },
  { value: "sweet_treats", label: "Sweet Treats" },
  { value: "drinks", label: "Drinks" },

  // When adding a new label go to index.css and add the corresponding classes for active and inactive states
];

// Location category filters
const locations = [
  { value: "all", label: "All Locations" },
  { value: "state-street-library-mall", label: "State Street & Library Mall" },
  { value: "west-side", label: "West Side" },
  { value: "southeast-campus", label: "Southeast Campus" },
  { value: "capitol-square", label: "Capitol Square" },
  { value: "traveling", label: "Traveling" },
];
// When adding a new label go to index.css and add the corresponding classes for active and inactive states

// Counts a cart list against every option in a filter dimension, holding the
// other two dimensions fixed — this is what lets the dropdowns/tray show a
// live "(6)" per option instead of a static list.
function countByOption(
  carts: FoodCart[],
  options: { value: string; label: string }[],
  matches: (cart: FoodCart, value: string) => boolean,
) {
  return options.map((option) => ({
    ...option,
    count: option.value === "all" ? carts.length : carts.filter((cart) => matches(cart, option.value)).length,
  }));
}

export default function FoodCartSearchAndFilter({
  carts,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  glutenFreeOnly,
  onGlutenFreeChange,
  effectiveLocationFor,
  matchingCartCount,
}: SearchFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<"location" | "category" | null>(null);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  // Close an open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;

    const handleClick = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openDropdown]);

  // Carts matching the filters other than location — powers per-location counts.
  const cartsForLocationCounts = useMemo(
    () =>
      carts.filter(
        (cart) =>
          (selectedCategory === "all" || cart.category === selectedCategory) &&
          (!glutenFreeOnly || cart.glutenFree === true),
      ),
    [carts, selectedCategory, glutenFreeOnly],
  );

  // Carts matching the filters other than cuisine — powers per-cuisine counts.
  const cartsForCategoryCounts = useMemo(
    () =>
      carts.filter(
        (cart) =>
          (selectedLocation === "all" || effectiveLocationFor(cart) === selectedLocation) &&
          (!glutenFreeOnly || cart.glutenFree === true),
      ),
    [carts, selectedLocation, glutenFreeOnly, effectiveLocationFor],
  );

  const locationCounts = useMemo(
    () => countByOption(cartsForLocationCounts, locations, (cart, value) => effectiveLocationFor(cart) === value),
    [cartsForLocationCounts, effectiveLocationFor],
  );

  const categoryCounts = useMemo(
    () => countByOption(cartsForCategoryCounts, categories, (cart, value) => cart.category === value),
    [cartsForCategoryCounts],
  );

  const selectedLocationLabel = locations.find((l) => l.value === selectedLocation)?.label ?? "All Locations";
  const selectedCategoryLabel = categories.find((c) => c.value === selectedCategory)?.label ?? "All Cuisines";

  const activeFilterCount = [
    searchQuery.trim() !== "",
    selectedLocation !== "all",
    selectedCategory !== "all",
    glutenFreeOnly,
  ].filter(Boolean).length;

  // Dropdown/switch filters only — the tray's persistent search field reports itself separately.
  const activeDropdownSummary = [
    selectedLocation !== "all" ? selectedLocationLabel : null,
    selectedCategory !== "all" ? selectedCategoryLabel : null,
    glutenFreeOnly ? "Gluten Free" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const clearAll = () => {
    onSearchChange("");
    onLocationChange("all");
    onCategoryChange("all");
    onGlutenFreeChange(false);
  };

  return (
    <section className="search-filter-section">
      <div className="search-filter-container">
        {/* Desktop: Command Bar — live search + two dropdowns + a gluten-free switch */}
        <div className="command-bar" ref={barRef}>
          <div className="command-search">
            <Search className="command-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder='Search by name, cuisine, or a dish'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search food carts"
            />
            {searchQuery && (
              <button
                type="button"
                className="command-search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="command-select-group">
            <button
              type="button"
              className={`command-select ${selectedLocation !== "all" ? "is-set" : ""} ${openDropdown === "location" ? "is-open" : ""}`}
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              aria-haspopup="true"
              aria-expanded={openDropdown === "location"}
            >
              <MapPin className="command-select-icon" aria-hidden="true" />
              <span>{selectedLocationLabel}</span>
              <ChevronDown className="command-select-caret" aria-hidden="true" />
            </button>
            {openDropdown === "location" && (
              <div className="command-panel" role="menu">
                <div className="command-panel-label">Filter by location</div>
                <div className="command-panel-grid">
                  {locationCounts.map((location) => (
                    <button
                      key={location.value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selectedLocation === location.value}
                      className={`command-panel-item ${selectedLocation === location.value ? "is-selected" : ""} ${location.count === 0 ? "is-zero" : ""}`}
                      onClick={() => {
                        onLocationChange(location.value);
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="command-panel-check">
                        {selectedLocation === location.value && <Check aria-hidden="true" />}
                      </span>
                      <span className="command-panel-item-label">{location.label}</span>
                      <span className="command-panel-count">{location.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="command-select-group">
            <button
              type="button"
              className={`command-select ${selectedCategory !== "all" ? "is-set" : ""} ${openDropdown === "category" ? "is-open" : ""}`}
              onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
              aria-haspopup="true"
              aria-expanded={openDropdown === "category"}
            >
              <UtensilsCrossed className="command-select-icon" aria-hidden="true" />
              <span>{selectedCategoryLabel}</span>
              <ChevronDown className="command-select-caret" aria-hidden="true" />
            </button>
            {openDropdown === "category" && (
              <div className="command-panel command-panel-wide" role="menu">
                <div className="command-panel-label">Filter by cuisine</div>
                <div className="command-panel-grid command-panel-grid-2col">
                  {categoryCounts.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selectedCategory === category.value}
                      className={`command-panel-item ${selectedCategory === category.value ? "is-selected" : ""} ${category.count === 0 ? "is-zero" : ""}`}
                      onClick={() => {
                        onCategoryChange(category.value);
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="command-panel-check">
                        {selectedCategory === category.value && <Check aria-hidden="true" />}
                      </span>
                      <span className="command-panel-item-label">{category.label}</span>
                      <span className="command-panel-count">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="command-divider" aria-hidden="true" />

          <button
            type="button"
            className={`command-gluten-toggle ${glutenFreeOnly ? "is-active" : ""}`}
            onClick={() => onGlutenFreeChange(!glutenFreeOnly)}
            role="switch"
            aria-checked={glutenFreeOnly}
          >
            <span className="command-switch" aria-hidden="true" />
            <Leaf className="command-gluten-icon" aria-hidden="true" />
            Gluten Free
          </button>

          {activeFilterCount > 0 && (
            <button type="button" className="command-clear" onClick={clearAll}>
              <X aria-hidden="true" />
              Clear
            </button>
          )}
        </div>

        {/* Mobile: Ticket Tray — persistent search + collapsed filter summary that tears open into grouped filters */}
        <div className="ticket-tray">
          <div className="ticket-tray-search">
            <Search className="ticket-tray-search-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder='Search by name, cuisine, or a dish'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search food carts"
            />
            {searchQuery && (
              <button
                type="button"
                className="ticket-tray-search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            className="ticket-tray-summary"
            onClick={() => setIsTrayOpen(!isTrayOpen)}
            aria-expanded={isTrayOpen}
          >
            <span className="ticket-tray-summary-left">
              <span className="ticket-tray-icon-badge" aria-hidden="true">
                <SlidersHorizontal />
              </span>
              <span className="ticket-tray-summary-text">
                <span className="ticket-tray-summary-title">Filters</span>
                <span className="ticket-tray-summary-sub">
                  {activeDropdownSummary || `${matchingCartCount} cart${matchingCartCount === 1 ? "" : "s"}`}
                </span>
              </span>
            </span>
            {activeFilterCount > 0 && <span className="ticket-tray-count-badge">{activeFilterCount} active</span>}
            <ChevronDown className={`ticket-tray-chevron ${isTrayOpen ? "is-open" : ""}`} aria-hidden="true" />
          </button>

          {isTrayOpen && (
            <>
              <div className="ticket-tray-perf" aria-hidden="true" />
              <div className="ticket-tray-body">
                <div className="ticket-tray-group">
                  <span className="ticket-tray-group-label">Location</span>
                  <div className="ticket-tray-chips">
                    {locations.map((location) => (
                      <button
                        key={location.value}
                        onClick={() => onLocationChange(location.value)}
                        className={`chip ${selectedLocation === location.value ? "chip-active" : ""}`}
                      >
                        {location.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ticket-tray-group">
                  <span className="ticket-tray-group-label">Cuisine</span>
                  <div className="ticket-tray-chips">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => onCategoryChange(category.value)}
                        className={`chip ${selectedCategory === category.value ? "chip-active" : ""}`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ticket-tray-group">
                  <span className="ticket-tray-group-label">Dietary</span>
                  <div className="ticket-tray-chips">
                    <button
                      onClick={() => onGlutenFreeChange(!glutenFreeOnly)}
                      className={`chip chip-gluten-free ${glutenFreeOnly ? "chip-active" : ""}`}
                    >
                      Gluten Free
                    </button>
                  </div>
                </div>

                <div className="ticket-tray-footer">
                  <button type="button" className="ticket-tray-clear" onClick={clearAll}>
                    Clear all
                  </button>
                  <button type="button" className="ticket-tray-apply" onClick={() => setIsTrayOpen(false)}>
                    Show {matchingCartCount} cart{matchingCartCount === 1 ? "" : "s"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
