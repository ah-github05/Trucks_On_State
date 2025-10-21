import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { FoodTruck } from "@shared/schema";
import FoodTruckSearchAndFilter from "./search-filter";
import IndividualFoodTruckCard from "./truck-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FoodTruckListingGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: trucks, isLoading } = useQuery<FoodTruck[]>({
    queryKey: ["/api/trucks"],
  });

  const filteredTrucks = trucks?.filter((truck) => {
    const matchesSearch = truck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         truck.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || truck.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <FoodTruckSearchAndFilter
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedFilter}
        onCategoryChange={setSelectedFilter}
      />
      
      <section id="trucks" className="trucks-listing-section">
        <div className="trucks-listing-container">
          <div className="trucks-listing-header">
            <h2 className="trucks-listing-title">Featured Food Trucks</h2>
            <p className="trucks-listing-description">
              Each truck brings unique flavors and experiences to Madison's streets. Click on any truck to see their full menu and schedule.
            </p>
          </div>
          
          {isLoading ? (
            <div className="trucks-loading-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="truck-skeleton-card">
                  <Skeleton className="truck-skeleton-image" />
                  <div className="truck-skeleton-content">
                    <Skeleton className="truck-skeleton-title" />
                    <Skeleton className="truck-skeleton-description" />
                    <Skeleton className="truck-skeleton-location" />
                    <div className="truck-skeleton-footer">
                      <Skeleton className="truck-skeleton-status" />
                      <Skeleton className="truck-skeleton-button" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTrucks && filteredTrucks.length > 0 ? (
            <div className="trucks-active-grid">
              {filteredTrucks.map((truck) => (
                <IndividualFoodTruckCard key={truck.id} truck={truck} />
              ))}
            </div>
          ) : (
            <div className="trucks-empty-state">
              <p className="trucks-empty-message">
                {searchTerm || selectedFilter !== "all" 
                  ? "No food trucks match your search criteria." 
                  : "No food trucks available at the moment."
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
