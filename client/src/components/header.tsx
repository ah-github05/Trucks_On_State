import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteNavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-content">
          <div className="brand-logo-section">
            <Link href="/">
              <div className="brand-logo-link">
                <ShoppingCart className="brand-logo-icon" />
                <h1 className="brand-logo-text">
                  Carts on State
                </h1>
              </div>
            </Link>
          </div>
          
          <nav className="desktop-navigation">
            <div className="desktop-nav-links">
              <Link href="/">
                {/* home */}
                <Button 
                  variant="ghost" 
                  className="home-nav-button"
                  onClick={() => scrollToSection('home')}
                  >
                  Home
                </Button>
              </Link>
              {/* carts */}
              <Button 
                variant="ghost" 
                className="food-carts-nav-button"
                onClick={() => scrollToSection('carts')}
              >
                Food Carts
              </Button>
              {/* about */}
              <Button 
                variant="ghost" 
                className="about-nav-button"
                onClick={() => scrollToSection('about')}
              >
                About
                {/* contact */}
              </Button>
              <Button 
                variant="ghost" 
                className="contact-nav-button"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </Button>
            </div>
          </nav>
          
          <div className="mobile-menu-section">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="mobile-menu-close-icon" /> : <Menu className="mobile-menu-open-icon" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <div className="mobile-menu-container">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="mobile-home-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="mobile-food-carts-button"
              onClick={() => scrollToSection('carts')}
            >
              Food Carts
            </Button>
            <Button 
              variant="ghost" 
              className="mobile-about-button"
              onClick={() => scrollToSection('about')}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="mobile-contact-button"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
