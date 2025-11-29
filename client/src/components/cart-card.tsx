import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { capitalizeFirst, isCurrentlyOpen } from "@/lib/utils";
import type { FoodCart } from "@shared/schema";

interface CartCardProps {
  cart: FoodCart;
}

export default function IndividualFoodCartCard({ cart }: CartCardProps) {
  const isOpen = isCurrentlyOpen(cart.schedule);

  return (
    <Card className="food-cart-card">
      <img
        src={cart.image}
        alt={`${cart.name} food cart`}
        className="cart-card-image"
      />
      <CardContent className="cart-card-content">
        <div className="cart-card-header">
          <h3 className="cart-card-title">{cart.name}</h3>
        </div>
        <p className="cart-card-description">{cart.description}</p>
        <div className="cart-card-location">
          <MapPin className="cart-location-icon" />
          <span className="cart-location-text">{cart.locationDisplayName}</span>
        </div>
        <div className="cart-card-footer">
          <span className={`cart-status ${
            isOpen ? 'cart-status-open' : 'cart-status-closed'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
          <Link href={`/cart/${cart.slug}`}>
            <Button className="view-menu-button">
              View Menu
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
