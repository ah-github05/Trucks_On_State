import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import type { FoodCart } from "@shared/schema";
import capitolStateStreet from "@assets/capitol-state-street.jpg";
import { scrollToSectionId } from "@/lib/utils";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FoodCartHeroBanner({ searchQuery, onSearchChange }: HeroProps) {
  const [pendingQuery, setPendingQuery] = useState(searchQuery);
  const { data: carts } = useQuery<FoodCart[]>({
    queryKey: ["/carts.json"],
  });

  const stats = useMemo(() => {
    if (!carts) return null;
    const zones = new Set(carts.map((c) => c.location).filter((l) => l !== "TBD"));
    const cuisines = new Set(carts.map((c) => c.category));
    return {
      cartCount: carts.length,
      zoneCount: zones.size,
      cuisineCount: cuisines.size,
    };
  }, [carts]);

  const submitSearch = () => {
    onSearchChange(pendingQuery);
    scrollToSectionId("carts");
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <img src={capitolStateStreet} alt="State Street looking toward the Wisconsin State Capitol in Madison" />
      </div>

      <div className="hero-content-container">
        <h1 className="hero-main-title">
          Madison eats,<br />right by the <em>dome.</em>
        </h1>
        <p className="hero-description">
          Every cart on State Street, Library Mall, and beyond — real hours, real menus, one map. No more guessing who showed up today.
        </p>

        <form
          className="hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            submitSearch();
          }}
        >
          <input
            type="text"
            placeholder='Search by name, cuisine, or a dish — try "falafel"'
            value={pendingQuery}
            onChange={(e) => setPendingQuery(e.target.value)}
            aria-label="Search food carts"
          />
          <button type="submit">
            <Search className="hero-search-icon" aria-hidden="true" />
            <span>Search</span>
          </button>
        </form>
      </div>

      <span className="hero-photo-credit">State Street &amp; the Capitol</span>

      <div className="stat-strip">
        <div className="stat-strip-inner">
          <div className="stat"><b>{stats ? stats.cartCount : "—"}</b><span>Carts tracked</span></div>
          <div className="stat"><b>{stats ? stats.zoneCount : "—"}</b><span>Madison zones</span></div>
          <div className="stat"><b>{stats ? stats.cuisineCount : "—"}</b><span>Cuisines</span></div>
          <div className="stat"><b>Sat</b><span>Rotation tracked</span></div>
        </div>
      </div>
    </section>
  );
}
