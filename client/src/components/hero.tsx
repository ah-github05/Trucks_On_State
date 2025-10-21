import { Button } from "@/components/ui/button";

export default function FoodTruckHeroBanner() {
  const scrollToTrucks = () => {
    const element = document.getElementById('trucks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content-container">
        <div className="hero-text-center">
          <h1 className="hero-main-title">
            Madison's Best<br />
            <span className="hero-accent-text">Food Trucks</span>
          </h1>
          <p className="hero-description">
            Discover amazing local food trucks on State Street and around Madison to find your next favorite meal on wheels.
          </p>
          <div className="hero-buttons-container">
            <Button 
              onClick={scrollToTrucks}
              className="explore-trucks-button"
            >
              Explore Food Trucks
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToAbout}
              className="learn-more-button"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
