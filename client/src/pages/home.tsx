import SiteNavigationHeader from "@/components/header";
import FoodTruckHeroBanner from "@/components/hero";
import FoodTruckSearchAndFilter from "@/components/search-filter";
import IndividualFoodTruckCard from "@/components/truck-card";
import TrucksOnStateAboutSection from "@/components/about";
import ContactForm from "@/components/contact-form";
import SiteContactFooter from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FoodTruck } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function MadisonFoodTruckHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: trucks, isLoading, error } = useQuery<FoodTruck[]>({
    queryKey: ["/api/food-trucks"],
  });

  const filteredTrucks = trucks?.filter((truck) => {
    const matchesSearch = searchQuery === "" || 
      truck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || truck.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="home-page-container">
      <SiteNavigationHeader />
      <FoodTruckHeroBanner />
      <FoodTruckSearchAndFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <section id="trucks" className="home-trucks-section">
        <div className="home-trucks-container">
          <div className="home-trucks-header">
            <h2 className="home-trucks-title">
              Featured Food Trucks
            </h2>
            <p className="home-trucks-description">
              Each truck brings unique flavors and experiences to Madison's streets. 
              Click on any truck to see their full menu and schedule.
            </p>
          </div>
          
          {error && (
            <div className="home-trucks-error">
              <p className="home-trucks-error-message">Failed to load food trucks. Please try again later.</p>
            </div>
          )}
          
          {isLoading && (
            <div className="home-trucks-loading-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="home-truck-skeleton-card">
                  <Skeleton className="home-truck-skeleton-image" />
                  <div className="home-truck-skeleton-content">
                    <Skeleton className="home-truck-skeleton-title" />
                    <Skeleton className="home-truck-skeleton-description" />
                    <Skeleton className="home-truck-skeleton-location" />
                    <div className="home-truck-skeleton-footer">
                      <Skeleton className="home-truck-skeleton-status" />
                      <Skeleton className="home-truck-skeleton-button" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {trucks && filteredTrucks.length === 0 && !isLoading && (
            <div className="home-trucks-empty-state">
              <p className="home-trucks-empty-message">
                {searchQuery || selectedCategory !== "all" 
                  ? "No food trucks match your search criteria." 
                  : "No food trucks available at the moment."}
              </p>
            </div>
          )}
          
          {trucks && filteredTrucks.length > 0 && (
            <div className="home-trucks-active-grid">
              {filteredTrucks.map((truck) => (
                <IndividualFoodTruckCard key={truck.id} truck={truck} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <TrucksOnStateAboutSection />
      <ContactForm />
      <SiteContactFooter />
    </div>
  );
}
