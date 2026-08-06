import { useQuery } from "@tanstack/react-query";
import type { FoodCart } from "@shared/schema";
import capitolStateStreet from "@assets/capitol-state-street.jpg";

export default function CapitalCityFoodCartsAboutSection() {
  const { data: carts } = useQuery<FoodCart[]>({
    queryKey: ["/carts.json"],
  });

  const cartCount = carts?.length;
  const zoneCount = carts
    ? new Set(carts.map((c) => c.location).filter((l) => l !== "TBD")).size
    : undefined;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content-grid">
          <div className="about-text-content">
            <div className="kicker">Our Story</div>
            <h2 className="about-section-title">
              Built by locals who got tired of guessing.
            </h2>
            <p className="about-description-first">
              Capital City Food Carts started with one simple problem: no single place tracked who was actually open on State Street. We built the map, the hours, and the menus — so you don't have to check ten different Instagram bios before lunch.
            </p>
            <p className="about-description-second">
              Carts move on Saturdays. Some go to Capitol Square, some go traveling. We track that too.
            </p>
            <div className="about-stats-container">
              <div className="food-carts-stat">
                <h4 className="food-carts-stat-number">{cartCount ?? "—"}</h4>
                <p className="food-carts-stat-label">Food carts</p>
              </div>
              <div className="locations-stat">
                <h4 className="locations-stat-number">{zoneCount ?? "—"}</h4>
                <p className="locations-stat-label">Locations</p>
              </div>
            </div>
          </div>
          <div className="about-image-container">
            <img
              src={capitolStateStreet}
              alt="Madison Wisconsin Capitol building at the end of State Street"
              className="about-hero-image"
            />
            <span className="about-image-tag">📍 Madison, Wisconsin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
