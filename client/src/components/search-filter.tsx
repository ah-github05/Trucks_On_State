import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

// Food category filters
const categories = [
  { value: "all", label: "All Carts" },
  { value: "asian", label: "Asian" },
  { value: "sandwiches", label: "Sandwiches" },
  { value: "south_american", label: "South American" },
  { value: "southeast_asian", label: "Southeast Asian" },
  { value: "mexican", label: "Mexican" },
  { value: "american", label: "American" },
  { value: "caribbean", label: "Caribbean" },
  { value: "middle_eastern", label: "Middle Eastern" },
  { value: "sweet_treats", label: "Sweet Treats" }

  // When adding a new label go to index.css and add the corresponding classes for active and inactive states
];

// Location category filters
const locations = [
  { value: "all", label: "All Locations" },
  { value: "state-street-library-mall", label: "State Street & Library Mall" },
  { value: "west", label: "West Side" },
  { value: "southeast", label: "Southeast Campus" },
  { value: "tbd3", label: "TBD3" }
]
  // When adding a new label go to index.css and add the corresponding classes for active and inactive states


export default function FoodCartSearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
}: SearchFilterProps) {
  return (
    <section className="search-filter-section">
      <div className="search-filter-container">
        <div className="search-filter-content">
          <div className="search-input-container">
            <Search className="search-input-icon" />
            <Input
              type="text"
              placeholder="Search food carts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="food-cart-search-input"
            />
          </div>
          <div className="location-filter-buttons">
            {locations.map((location) => (
              <Button
                key={location.value}
                variant={selectedLocation === location.value ? "default" : "secondary"}
                size="sm"
                onClick={() => onLocationChange(location.value)}
                className={selectedLocation === location.value
                  ? `${location.value}-location-active`
                  : `${location.value}-location-inactive`
                }
              >
                {location.label}
              </Button>
            ))}
          </div>
          <div className="category-filter-buttons">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "secondary"}
                size="sm"
                onClick={() => onCategoryChange(category.value)}
                className={selectedCategory === category.value 
                  ? `${category.value}-category-active` 
                  : `${category.value}-category-inactive`
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
