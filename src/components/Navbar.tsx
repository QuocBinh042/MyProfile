import React from 'react';

type NavbarProps = {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ activeSection, isMenuOpen, setIsMenuOpen, scrollToSection }) => (
  <nav className="navbar">
    <div className="nav-container">
      <div className="nav-logo">QB.dev</div>
      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        {['home', 'about', 'projects', 'contact'].map(section => (
          <button
            key={section}
            className={`nav-item ${activeSection === section ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
      <div 
        className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
);

export default Navbar; 