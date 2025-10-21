import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Carts" },
  { value: "asian", label: "Asian" },
  { value: "sandwiches", label: "Sandwiches" },
  { value: "south_american", label: "South American" },
  { value: "southeast_asian", label: "Southeast Asian" },
  { value: "mexican", label: "Mexican" },
   { value: "american", label: "American" }

  // When adding a new lable go to index.css and add the corresponding classes for active and inactive states
];

export default function FoodCartSearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
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
