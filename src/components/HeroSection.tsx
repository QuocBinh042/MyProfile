import React, { useRef } from 'react';

type HeroSectionProps = {
  scrollToSection: (sectionId: string) => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">👋 Hello, I&apos;m</div>
            <h1 className="hero-name">Trần Lê Quốc Bình</h1>
            <div className="hero-role">Software Engineering Student</div>
            <p className="hero-description">
              Final-year Software Engineering student at Industrial University of Ho Chi Minh City (IUH) with strong academic background and a passion for building scalable, efficient software systems. Awarded multiple scholarships for academic excellence and national-level recognition in informatics and innovation competitions. 
              Eager to contribute to impactful engineering teams, with a strong foundation in programming, algorithms, and software design.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                💼 Let&apos;s Connect
              </button>
              <button className="btn btn-secondary">
                📄 View Resume
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-content">
                <div className="avatar">🎓</div>
                <div>
                  <h3 style={{color: 'var(--text-primary)', marginBottom: '10px'}}>Quốc Bình</h3>
                  <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>SE Student</p>
                  <p style={{color: 'var(--accent)', fontSize: '0.8rem'}}>Seeking opportunities</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px'}}>
                    <div>
                      <div style={{color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold'}}>10+</div>
                      <div style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>Projects</div>
                    </div>
                    <div>
                      <div style={{color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold'}}>3.31</div>
                      <div style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>GPA/4.0</div>
                    </div>
                  </div>
                  <div style={{color: 'var(--text-secondary)', fontSize: '0.8rem'}}>
                    📍 Ho Chi Minh City, Vietnam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 