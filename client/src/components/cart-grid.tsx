import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FoodCart } from "@shared/schema";
import FoodCartSearchAndFilter from "./search-filter";
import IndividualFoodCartCard from "./cart-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FoodCartListingGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: carts, isLoading } = useQuery<FoodCart[]>({
    queryKey: ["/api/carts"],
  });

  const filteredCarts = carts?.filter((cart) => {
    const matchesSearch = cart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || cart.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <FoodCartSearchAndFilter
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedFilter}
        onCategoryChange={setSelectedFilter}
      />

      <section id="carts" className="carts-listing-section">
        <div className="carts-listing-container">
          <div className="carts-listing-header">
            <h2 className="carts-listing-title">Featured Food Carts</h2>
            <p className="carts-listing-description">
              Each cart brings unique flavors and experiences to Madison's streets. Click on any cart to see their full menu and schedule.
            </p>
          </div>

          {isLoading ? (
            <div className="carts-loading-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="cart-skeleton-card">
                  <Skeleton className="cart-skeleton-image" />
                  <div className="cart-skeleton-content">
                    <Skeleton className="cart-skeleton-title" />
                    <Skeleton className="cart-skeleton-description" />
                    <Skeleton className="cart-skeleton-location" />
                    <div className="cart-skeleton-footer">
                      <Skeleton className="cart-skeleton-status" />
                      <Skeleton className="cart-skeleton-button" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCarts && filteredCarts.length > 0 ? (
            <div className="carts-active-grid">
              {filteredCarts.map((cart) => (
                <IndividualFoodCartCard key={cart.id} cart={cart} />
              ))}
            </div>
          ) : (
            <div className="carts-empty-state">
              <p className="carts-empty-message">
                {searchTerm || selectedFilter !== "all"
                  ? "No food carts match your search criteria."
                  : "No food carts available at the moment."
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
