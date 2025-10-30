import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { capitalizeFirst, isCurrentlyOpen } from "@/lib/utils";
import type { FoodTruck } from "@shared/schema";

interface TruckCardProps {
  truck: FoodTruck;
}

export default function IndividualFoodTruckCard({ truck }: TruckCardProps) {
  const isOpen = isCurrentlyOpen(truck.schedule);
  
  return (
    <Card className="food-truck-card">
      <img 
        src={truck.image} 
        alt={`${truck.name} food truck`}
        className="truck-card-image"
      />
      <CardContent className="truck-card-content">
        <div className="truck-card-header">
          <h3 className="truck-card-title">{truck.name}</h3>
        </div>
        <p className="truck-card-description">{truck.description}</p>
        <div className="truck-card-location">
          <MapPin className="truck-location-icon" />
          <span className="truck-location-text">{truck.locationDisplayName}</span>
        </div>
        <div className="truck-card-footer">
          <span className={`truck-status ${
            isOpen ? 'truck-status-open' : 'truck-status-closed'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
          <Link href={`/truck/${truck.slug}`}>
            <Button className="view-menu-button">
              View Menu
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
