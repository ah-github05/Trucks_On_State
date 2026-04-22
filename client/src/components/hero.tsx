import { Button } from "@/components/ui/button";

const cuisineItems = [
  "🇲🇽 Mexican",
  "🍜 Asian",
  "🇺🇸 American",
  "🌴 Caribbean",
  "🫔 South American",
  "🧆 Middle Eastern",
  "🍬 Sweet Treats",
  "🥤 Drinks",
  "🥪 Sandwiches",
  "🍛 Southeast Asian",
];

export default function FoodCartHeroBanner() {
  const scrollToCarts = () => {
    const element = document.getElementById('carts');
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
      <div className="hero-glow-amber"></div>
      <div className="hero-glow-red"></div>

      <div className="hero-content-container">
        <div className="hero-text-center">
          <div className="hero-eyebrow">📍 Madison, Wisconsin</div>

          <h1 className="hero-main-title">
            Madison's Best<br />
            <span className="hero-accent-text">Food Carts</span>
          </h1>

          <p className="hero-description">
            Discover amazing local food carts around Madison to find your next favorite meal on wheels.
          </p>

          <div className="hero-buttons-container">
            <Button
              onClick={scrollToCarts}
              className="explore-carts-button"
            >
              Explore Food Carts
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

      <div className="hero-marquee-wrapper">
        <div className="hero-marquee-track">
          {[...cuisineItems, ...cuisineItems].map((item, i) => (
            <span key={i} className="hero-marquee-item">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
