import React from 'react';

type TechStack = { name: string; level: number; icon: string }[];

type TechStackSectionProps = {
  techStack: TechStack;
};

const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => (
  <section className="tech-stack scroll-reveal">
    <div className="container">
      <h2 className="section-title">💻 Tech Stack</h2>
      <div className="tech-container">
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div key={index} className="tech-card" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="tech-icon">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TechStackSection; 