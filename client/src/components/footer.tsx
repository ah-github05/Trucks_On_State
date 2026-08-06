import { useLocation } from "wouter";
import { scrollToSectionId } from "@/lib/utils";

export default function SiteContactFooter() {
  const [location, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the homepage, navigate there first with hash
    if (location !== '/') {
      setLocation(`/#${sectionId}`);
      return;
    }

    // If we're on the homepage, scroll to the section
    scrollToSectionId(sectionId);
  };

  return (
    <footer className="footer-background">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="footer-brand-flag" aria-hidden="true">C</span>
              Capital City Food Carts
            </div>
            <p className="footer-description">
              The single source for every food cart on and around State Street, Madison, Wisconsin. Real hours, real menus, updated by locals.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('carts')}>Food Carts</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2026 Capital City Food Carts. Madison, WI.</p>
          <a
            className="footer-credit-link"
            href="https://github.com/ariavhayempour/capital_city_food_carts"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub - Ariav Hayempour :)
          </a>
          <p className="footer-made-with">Made with ❤️ and 🧀</p>
        </div>
      </div>
    </footer>
  );
}
