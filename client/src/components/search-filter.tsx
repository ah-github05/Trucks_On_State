interface SearchFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  glutenFreeOnly: boolean;
  onGlutenFreeChange: (value: boolean) => void;
}

// Food category filters
const categories = [
  { value: "all", label: "All Carts" },
  { value: "american", label: "American" },
  { value: "asian", label: "Asian" },
  { value: "caribbean", label: "Caribbean" },
  { value: "mexican", label: "Mexican" },
  { value: "middle_eastern", label: "Middle Eastern" },
  { value: "sandwiches", label: "Sandwiches" },
  { value: "south_american", label: "South American" },
  { value: "south_asian", label: "South Asian" },
  { value: "sweet_treats", label: "Sweet Treats" },
  { value: "drinks", label: "Drinks" }

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
]
  // When adding a new label go to index.css and add the corresponding classes for active and inactive states


export default function FoodCartSearchAndFilter({
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  glutenFreeOnly,
  onGlutenFreeChange,
}: SearchFilterProps) {
  return (
    <section className="search-filter-section">
      <div className="search-filter-container">
        <div className="search-filter-content">
          <span className="filter-label">Filter by location</span>
          <div className="location-filter-buttons">
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

          <span className="filter-label">Filter by cuisine</span>
          <div className="category-filter-buttons">
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

          <div className="dietary-filter-buttons">
            <button
              onClick={() => onGlutenFreeChange(!glutenFreeOnly)}
              className={`chip chip-gluten-free ${glutenFreeOnly ? "chip-active" : ""}`}
            >
              Gluten Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
