'use client'
import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TechStackSection from '../components/TechStackSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import type { MediaItem } from '../components/ProjectsSection';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle system for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      constructor() {
        this.x = Math.random() * (canvas ? canvas.width : 0);
        this.y = Math.random() * (canvas ? canvas.height : 0);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${0.1 + Math.random() * 0.3})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {

      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Inject advanced CSS
  useEffect(() => {
    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :root {
        --primary: #00d4ff;
        --primary-dark: #0099cc;
        --secondary: #ff0080;
        --accent: #00ff88;
        --bg-primary: #050505;
        --bg-secondary: #0a0a0a;
        --bg-tertiary: #111111;
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
        --text-muted: #888888;
        --glass-bg: rgba(255, 255, 255, 0.05);
        --glass-border: rgba(255, 255, 255, 0.1);
        --shadow-glow: 0 0 30px rgba(0, 212, 255, 0.3);
        --shadow-glow-secondary: 0 0 30px rgba(255, 0, 128, 0.3);
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        line-height: 1.6;
        overflow-x: hidden;
      }



      .portfolio {
        min-height: 100vh;
        position: relative;
      }

      .particle-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 40px;
        position: relative;
        z-index: 2;
      }

      /* Advanced Navigation */
      .navbar {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 50px;
        padding: 12px 30px;
        z-index: 1000;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-glow);
      }

      .navbar:hover {
        box-shadow: var(--shadow-glow), 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateX(-50%) translateY(-2px);
      }

      .nav-container {
        display: flex;
        align-items: center;
        gap: 30px;
      }

      .nav-logo {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--primary);
        text-shadow: 0 0 10px var(--primary);
      }

      .nav-menu {
        display: flex;
        gap: 25px;
        align-items: center;
      }

      .nav-item {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 20px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .nav-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .nav-item:hover::before {
        left: 100%;
      }

      .nav-item:hover,
      .nav-item.active {
        color: var(--primary);
        background: rgba(0, 212, 255, 0.1);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
      }

      .nav-toggle {
        display: none;
      }

      /* Hero Section with 3D Effects */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.1) 0%, transparent 70%),
                    linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 80%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
        animation: gradientShift 10s ease-in-out infinite;
      }

      @keyframes gradientShift {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .hero-content {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 80px;
        align-items: center;
        position: relative;
        z-index: 2;
      }

      .hero-text {
        transform: translateY(0);
        animation: fadeInUp 1s ease-out;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .hero-greeting {
        font-size: 1.1rem;
        color: var(--primary);
        font-weight: 500;
        margin-bottom: 10px;
        opacity: 0;
        animation: fadeIn 1s ease-out 0.2s forwards;
      }

      .hero-name {
        font-size: 4.5rem;
        font-weight: 900;
        background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 50%, var(--secondary) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 10px;
        line-height: 1.1;
        opacity: 0;
        animation: fadeIn 1s ease-out 0.4s forwards, textGlow 3s ease-in-out infinite;
      }

      @keyframes textGlow {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
      }

      .hero-role {
        font-size: 1.8rem;
        color: var(--text-secondary);
        font-weight: 300;
        margin-bottom: 30px;
        opacity: 0;
        animation: fadeIn 1s ease-out 0.6s forwards;
      }

      .hero-description {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 40px;
        max-width: 600px;
        opacity: 0;
        animation: fadeIn 1s ease-out 0.8s forwards;
        text-align: justify;
      }

      .hero-buttons {
        display: flex;
        gap: 20px;
        opacity: 0;
        animation: fadeIn 1s ease-out 1s forwards;
      }

      .btn {
        padding: 16px 32px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        position: relative;
        overflow: hidden;
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
      }

      .btn:hover::before {
        left: 100%;
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: var(--bg-primary);
        box-shadow: var(--shadow-glow);
      }

      .btn-primary:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: var(--shadow-glow), 0 15px 30px rgba(0, 212, 255, 0.4);
      }

      .btn-secondary {
        background: transparent;
        color: var(--text-primary);
        border: 2px solid var(--glass-border);
        backdrop-filter: blur(10px);
      }

      .btn-secondary:hover {
        background: var(--glass-bg);
        border-color: var(--primary);
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
      }

      .hero-visual {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .floating-card {
        width: 400px;
        height: 500px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 40px;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-glow);
        animation: float 6s ease-in-out infinite;
      }

      .floating-card:hover {
        transform: rotateY(5deg) rotateX(5deg) translateZ(20px);
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateZ(0deg); }
        33% { transform: translateY(-10px) rotateZ(1deg); }
        66% { transform: translateY(5px) rotateZ(-1deg); }
      }

      .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
      }

      .avatar {
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        margin-bottom: 20px;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3); }
        50% { box-shadow: 0 10px 40px rgba(0, 212, 255, 0.5); }
      }

      .status-indicator {
        width: 12px;
        height: 12px;
        background: var(--accent);
        border-radius: 50%;
        animation: blink 2s ease-in-out infinite;
        margin: 10px 0;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      /* Enhanced Tech Stack */
      .tech-stack {
        padding: 100px 0;
        background: var(--bg-secondary);
        position: relative;
      }

      .section-title {
        text-align: center;
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 60px;
        background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .tech-container {
        perspective: 1000px;
      }

      .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .tech-card {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform-style: preserve-3d;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .tech-icon {
        font-size: 2.5rem;
        margin-bottom: 8px;
      }

      .tech-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
        transform: translateX(-100%);
        transition: transform 0.5s ease;
      }

      .tech-card:hover::before {
        transform: translateX(0);
      }

      .tech-card:hover {
        transform: translateY(-10px) rotateX(5deg);
        box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
        border-color: var(--primary);
      }

      .tech-name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-top: 12px;
      }

      /* About Section */
      .about {
        padding: 100px 0;
        background: var(--bg-primary);
        position: relative;
      }

      .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 60px;
        align-items: start;
      }

      .about-text .section-title {
        text-align: center;
        margin-bottom: 40px;
      }

      .about-description {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 30px;
        text-align: center;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }

      .education-section, .awards-section {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 40px;
        margin-bottom: 40px;
      }

      .section-subtitle {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .education-card {
        background: rgba(0, 212, 255, 0.05);
        border: 1px solid rgba(0, 212, 255, 0.2);
        border-radius: 16px;
        padding: 30px;
        text-align: center;
        margin-bottom: 30px;
      }

      .university-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 10px;
      }

      .degree-info {
        font-size: 1.1rem;
        color: var(--text-secondary);
        margin-bottom: 15px;
      }

      .date-gpa {
        font-size: 1rem;
        color: var(--primary);
        font-weight: 600;
        margin-bottom: 20px;
      }

      .scholarships-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 15px;
        margin-top: 20px;
      }

      .scholarship-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
        color: var(--text-secondary);
      }

      .coursework-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 15px;
        margin-top: 20px;
      }

      .coursework-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
      }

      .coursework-tag {
        background: rgba(0, 212, 255, 0.1);
        color: var(--primary);
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        border: 1px solid rgba(0, 212, 255, 0.3);
        font-family: 'JetBrains Mono', monospace;
      }

      .awards-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .awards-table th {
        background: rgba(0, 212, 255, 0.1);
        color: var(--primary);
        padding: 15px;
        text-align: center;
        font-weight: 600;
        border: 1px solid rgba(0, 212, 255, 0.3);
      }

      .awards-table td {
        padding: 12px 15px;
        text-align: center;
        border: 1px solid var(--glass-border);
        color: var(--text-secondary);
      }

      .awards-table tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }

      .award-level {
        color: var(--text-primary);
        font-weight: 600;
      }

      .award-recognition {
        color: var(--primary);
        font-weight: 600;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }

      .stat-card {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 30px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-glow);
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--primary);
        margin-bottom: 8px;
        font-family: 'JetBrains Mono', monospace;
      }

      .stat-label {
        color: var(--text-secondary);
        font-weight: 500;
      }

      /* Next-level Projects */
      .projects {
        padding: 100px 0;
        background: var(--bg-secondary);
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 40px;
        margin-top: 60px;
      }

      .project-card {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 40px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        group: hover;
      }

      .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.1));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .project-card:hover::before {
        opacity: 1;
      }

      .project-card:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: var(--shadow-glow);
      }

      .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        position: relative;
        z-index: 1;
      }

      .project-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 8px;
      }

      .project-status {
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .project-status.completed {
        background: rgba(0, 255, 127, 0.2);
        color: var(--accent);
        border: 1px solid var(--accent);
      }

      .project-status.in-progress {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
        border: 1px solid #ffc107;
      }

      .project-description {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 30px;
        position: relative;
        z-index: 1;
      }

      .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 30px;
        position: relative;
        z-index: 1;
      }

      .tech-badge {
        background: rgba(0, 212, 255, 0.1);
        color: var(--primary);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border: 1px solid rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
      }

      .tech-badge:hover {
        background: rgba(0, 212, 255, 0.2);
        transform: translateY(-2px);
      }

      .project-links {
        display: flex;
        gap: 12px;
        position: relative;
        z-index: 1;
      }

      .project-link {
        padding: 8px 16px;
        background: var(--glass-bg);
        color: var(--text-primary);
        text-decoration: none;
        border-radius: 20px;
        border: 1px solid var(--glass-border);
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }

      .project-link:hover {
        background: var(--primary);
        color: var(--bg-primary);
        transform: translateY(-2px);
      }

      /* Contact Section */
      .contact {
        padding: 100px 0;
        background: var(--bg-primary);
        position: relative;
      }

      .contact-content {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }

      .contact-description {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 50px;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-bottom: 50px;
      }

      .contact-card {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 16px;
        padding: 30px;
        transition: all 0.3s ease;
      }

      .contact-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-glow);
      }

      .contact-icon {
        font-size: 2rem;
        margin-bottom: 16px;
        color: var(--primary);
      }

      .contact-info {
        font-size: 1.1rem;
        color: var(--text-primary);
        font-weight: 500;
      }

      .social-links {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .social-link {
        width: 60px;
        height: 60px;
        background: var(--glass-bg);
        color: var(--text-primary);
        text-decoration: none;
        border-radius: 50%;
        border: 1px solid var(--glass-border);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .social-link:hover {
        background: var(--primary);
        color: var(--bg-primary);
        transform: translateY(-3px) scale(1.1);
        box-shadow: var(--shadow-glow);
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .hero-content {
          grid-template-columns: 1fr;
          gap: 50px;
          text-align: center;
        }

        .about-content {
          grid-template-columns: 1fr;
          gap: 50px;
        }

        .floating-card {
          width: 350px;
          height: 450px;
        }

        .hero-name {
          font-size: 3.5rem;
        }
      }

      @media (max-width: 768px) {
        .container {
          padding: 0 20px;
        }

        .navbar {
          top: 10px;
          left: 10px;
          right: 10px;
          transform: none;
          border-radius: 20px;
          padding: 15px 20px;
        }

        .nav-container {
          justify-content: space-between;
        }

        .nav-menu {
          position: fixed;
          top: 80px;
          left: 10px;
          right: 10px;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          flex-direction: column;
          padding: 20px;
          gap: 15px;
          transform: translateY(-20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .nav-menu.active {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .nav-toggle {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .nav-toggle span {
          width: 25px;
          height: 3px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .nav-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .hero-name {
          font-size: 2.5rem;
        }

        .hero-role {
          font-size: 1.4rem;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .floating-card {
          width: 300px;
          height: 400px;
        }

        .section-title {
          font-size: 2.5rem;
        }

        .tech-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .projects-grid {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .skills-showcase {
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .contact-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }

      @media (max-width: 480px) {
        .hero-name {
          font-size: 2rem;
        }

        .section-title {
          font-size: 2rem;
        }

        .floating-card {
          width: 280px;
          height: 360px;
          padding: 30px;
        }

        .avatar {
          width: 100px;
          height: 100px;
          font-size: 2.5rem;
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Scroll animations */
      .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }

      .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, var(--secondary), var(--primary));
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const techStack = [
    { 
      name: 'Java', 
      level: 85, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      isImage: true 
    },
    { 
      name: 'JavaScript', 
      level: 80, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      isImage: true 
    },
    { 
      name: 'React', 
      level: 75, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      isImage: true 
    },
    { 
      name: 'Node.js', 
      level: 70, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      isImage: true 
    },
    { 
      name: 'Spring Boot', 
      level: 80, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      isImage: true 
    },
    { 
      name: 'MySQL', 
      level: 75, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      isImage: true 
    },
    { 
      name: 'MongoDB', 
      level: 65, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      isImage: true 
    },
    { 
      name: 'Git', 
      level: 85, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      isImage: true 
    },
    { 
      name: 'Docker', 
      level: 60, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      isImage: true 
    },
    { 
      name: 'HTML/CSS', 
      level: 90, 
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      isImage: true 
    }
  ];
  
  const achievements = [
    {
      achievement: 'Youth and Children\'s Creativity Contest',
      recognition: 'Second Prize (National)',
      year: '2019–2020',
      externalLink: 'https://vtv.vn/video/le-tong-ket-cuoc-thi-sang-tao-thanh-thieu-nien-va-nhi-dong-toan-quoc-lan-thu-16-12-12-2020-476075.htm',
      description: 'National level creativity and innovation contest for youth'
    },
    {
      achievement: 'Youth and Children\'s Creativity Contest',
      recognition: 'First Prize (Provincial)',
      year: '2019–2020',
      externalLink: 'https://baoangiang.com.vn/an-giang-trao-31-giai-sang-tao-thanh-thieu-nien-nhi-dong-tinh-nam-2020-a294809.html',
      description: 'Provincial level creativity contest - highest achievement'
    },
    {
      achievement: 'High School Informatics Contest',
      recognition: 'Second Prize (Provincial)',
      year: '2019',
      imageUrl: '/images/hsg.png',
      description: 'Provincial programming competition for high school students'
    },
    {
      achievement: 'Vietnam Science and Engineering Fair',
      recognition: 'Second Prize (Provincial)',
      year: '2019–2020',
      imageUrl: '/images/khkt.png',
      description: 'Provincial science and engineering research competition'
    },
    {
      achievement: 'Youth Informatics Contest',
      recognition: 'Consolation Prize (Provincial)',
      year: '2019-2020',
      imageUrl: '/images/tht.png',
      description: 'Provincial informatics programming contest for youth'
    },
    {
      achievement: 'Non-Major Informatics Olympiad',
      recognition: 'Top 7 (University)',
      year: '2022',
      imageUrl: '/images/olympic.png',
      description: 'University-level programming olympiad for non-CS majors'
    }
  ];


  const projects = [
    {
      title: 'E-Commerce Web Application',
      description: 'A fully functional online footwear retail system with separate frontend (ReactJS, Ant Design, Redux Toolkit) and backend (Spring Boot, MySQL, JWT, Docker). The platform supports product browsing, cart and order management, secure user/admin authentication, VnPay payment, Cloudinary image storage, Redis caching, and is fully containerized for deployment. All APIs are documented with Swagger.',
      tech: ['ReactJS', 'Spring Boot', 'MySQL', 'Ant Design', 'Redux Toolkit', 'JWT', 'Docker', 'Redis', 'Swagger', 'Cloudinary', 'VnPay'],
      status: 'Completed',
      duration: 'Dec 2024 – May 2025', 
      teamSize: 2, 
      github: [
        { label: 'Frontend', url: 'https://github.com/QuocBinh042/shoe-store-frontend' },
        { label: 'Backend', url: 'https://github.com/QuocBinh042/shoe-store-backend' }
      ]
    },
    {
      title: "Graduate Thesis Management System for Master and Doctoral Programs – IUH",
      description: "A centralized system that digitalizes the management of graduate theses and dissertations at IUH, streamlining workflows and ensuring compliance. Frontend: Next.js + TypeScript, Ant Design, multi-role support, REST/gRPC integration. Backend: Spring Boot 3 microservices, MongoDB, JWT, gRPC, RabbitMQ. Infrastructure: Docker, Kubernetes, Redis, automated CI/CD.",
      tech: ['Next.js', 'TypeScript', 'Ant Design', 'Spring Boot 3', 'MongoDB', 'gRPC', 'RabbitMQ', 'JWT', 'Docker', 'Kubernetes', 'Helm', 'Redis', 'GitLab CI/CD'],
      status: 'In Progress',
      duration: 'May 2025 - Present',
      teamSize: 2,
      github: []
    },
    {
      title: '📱 School Connection – Android App for Smart School Communication',
      description: 'Android app developed to centralize school–parent–student communication via five modules: instant announcements (push + TTS), contact (in-app calling/chat without saving numbers), anonymous feedback channel, dynamic class schedules, and monthly conduct tracking. Features secure role-based access for 6 user types. SQL Server cloud-hosted backend, Vietnamese UI with text-to-speech support.',
      tech: ['Java', 'Android Studio', 'Microsoft SQL Server 2014', 'Voice Assistant', 'Vietnamese Language', 'Android 4.0.3+', 'Online Database'],
      status: 'Completed',
      duration: '2019–2020',
      teamSize: 2,
      github: [],
      media: [
        { type: 'video', url: 'https://drive.google.com/file/d/10_VpH94rVx8JbpGq8sKbTMHcM6oiwZwQ/view?usp=sharing' },
        { type: 'video', url: 'https://drive.google.com/file/d/1K5WiHekcCtyh2XTqdoWlNl3crEKcNshO/view?usp=sharing' }
      ] as MediaItem[]
    }
    
  ];

  return (
    <div className="portfolio">
      <ParticleBackground />
      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <TechStackSection techStack={techStack} />
      <AboutSection achievements={achievements} />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </div>
  );
};

export default Portfolio;