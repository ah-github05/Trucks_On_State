import { ShoppingCart, MapPin } from "lucide-react";

import state_street_vimal_1 from "@assets/state-street-vimal-1.jpg";

export default function CapitalCityFoodCartsAboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content-grid">
          <div className="about-text-content">
            <h2 className="about-section-title">
              About Capital City Food Carts
            </h2>
            <p className="about-description-first">
              Food carts bring incredible diversity and flavor to Madison's culinary landscape. We're passionate about connecting the vibrant food cart community with hungry locals, students, and visitors.
            </p>
            <div className="about-stats-container">
              <div className="food-carts-stat">
                <div className="food-carts-stat-icon-bg">
                  <ShoppingCart className="food-carts-stat-icon" />
                </div>
                <div className="food-carts-stat-content">
                  <h4 className="food-carts-stat-number">100+ Carts</h4>
                  <p className="food-carts-stat-label">Active in Madison</p>
                </div>
              </div>
              <div className="locations-stat">
                <div className="locations-stat-icon-bg">
                  <MapPin className="locations-stat-icon" />
                </div>
                <div className="locations-stat-content">
                  <h4 className="locations-stat-number">4 Areas</h4>
                  <p className="locations-stat-label">Around the city</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-container">
            <img 
              src={state_street_vimal_1} 
              alt="Madison Wisconsin Capitol building" 
              className="about-hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
