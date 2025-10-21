import { Truck, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function SiteContactFooter() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="footer-background">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="brand-section">
            <h3 className="text-2xl font-bold flex items-center">
              <Truck className="w-6 h-6 mr-2" />
              Trucks on State
            </h3>
          </div>
          <div>
            <h4 className="quick-links-title">Quick Links</h4>
            <ul className="quick-links-list">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="home-link"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('trucks')}
                  className="food-trucks-button"
                >
                  Food Trucks
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="about-button"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2025 Trucks on State. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
