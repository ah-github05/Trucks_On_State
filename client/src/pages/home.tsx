import SiteNavigationHeader from "@/components/header";
import FoodCartHeroBanner from "@/components/hero";
import FoodCartSearchAndFilter from "@/components/search-filter";
import IndividualFoodCartCard from "@/components/cart-card";
import CapitalCityFoodCartsAboutSection from "@/components/about";
import FoodCartNewsletterSignup from "@/components/newsletter";
import SiteContactFooter from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FoodCart } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function MadisonFoodCartHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const { data: carts, isLoading, error } = useQuery<FoodCart[]>({
    queryKey: ["/carts.json"],
  });

  const filteredCarts = carts?.filter((cart) => {
    const matchesSearch = searchQuery === "" ||
      cart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cart.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || cart.category === selectedCategory;

    const matchesLocation = selectedLocation === "all" || cart.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  }) || [];

  return (
    <div className="home-page-container">
      <SiteNavigationHeader />
      <FoodCartHeroBanner />
      <FoodCartSearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <section id="carts" className="home-carts-section">
        <div className="home-carts-container">
          <div className="home-carts-header">
            <h2 className="home-carts-title">
              Featured Food Carts
            </h2>
            <p className="home-carts-description">
              Each cart brings unique flavors and experiences to Madison's streets.
              Click on any cart to see their full menu and schedule.
            </p>
          </div>
          
          {error && (
            <div className="home-carts-error">
              <p className="home-carts-error-message">Failed to load food trucks. Please try again later.</p>
            </div>
          )}
          
          {isLoading && (
            <div className="home-carts-loading-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="home-cart-skeleton-card">
                  <Skeleton className="home-cart-skeleton-image" />
                  <div className="home-cart-skeleton-content">
                    <Skeleton className="home-cart-skeleton-title" />
                    <Skeleton className="home-cart-skeleton-description" />
                    <Skeleton className="home-cart-skeleton-location" />
                    <div className="home-cart-skeleton-footer">
                      <Skeleton className="home-cart-skeleton-status" />
                      <Skeleton className="home-cart-skeleton-button" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {carts && filteredCarts.length === 0 && !isLoading && (
            <div className="home-carts-empty-state">
              <p className="home-carts-empty-message">
                {searchQuery || selectedCategory !== "all"
                  ? "No food carts match your search criteria."
                  : "No food carts available at the moment."}
              </p>
            </div>
          )}
          
          {carts && filteredCarts.length > 0 && (
            <div className="home-carts-active-grid">
              {filteredCarts.map((cart) => (
                <IndividualFoodCartCard key={cart.id} cart={cart} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CapitalCityFoodCartsAboutSection />
      <FoodCartNewsletterSignup />
      <SiteContactFooter />
    </div>
  );
}
