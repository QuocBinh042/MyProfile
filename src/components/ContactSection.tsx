import React from 'react';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaFacebookF,
} from 'react-icons/fa';

const ContactSection: React.FC = () => (
  <section id="contact" className="contact scroll-reveal">
    <div className="container">
      <div className="contact-content">
        <h2 className="section-title">📞 Let&apos;s Connect</h2>
        <p className="contact-description">
          I&apos;m actively looking for <strong>internship opportunities</strong> and <strong>entry-level positions</strong> 
          in software development. Let&apos;s discuss how I can contribute to your team with my skills and fresh perspective!
        </p>

        {/* Dòng 1 */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '30px',
            marginBottom: '30px',
          }}
        >
          {/* Email */}
          <a
            href="mailto:tranlequocbinh2003@gmail.com"
            className="contact-card"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <FaEnvelope size={28} style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
              Email Address
            </div>
            <div className="contact-info" style={{ color: 'var(--text-primary)', wordBreak: 'break-all' }}>
              tranlequocbinh2003@gmail.com
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+84394109818"
            className="contact-card"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <FaPhoneAlt size={28} style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
              Phone Number
            </div>
            <div className="contact-info" style={{ color: 'var(--text-primary)' }}>
              +84 394 109 818
            </div>
          </a>
        </div>

        {/* Dòng 2 */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '30px',
          }}
        >
          {/* GitHub */}
          <a
            href="https://github.com/QuocBinh042"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <FaGithub size={28} style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
              GitHub
            </div>
            <div className="contact-info" style={{ color: 'var(--text-primary)' }}>
              QuocBinh042
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/quocbinh"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <FaLinkedin size={28} style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
              LinkedIn
            </div>
            <div className="contact-info" style={{ color: 'var(--text-primary)' }}>
              quocbinh
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/quoc.binh.603164"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <FaFacebookF size={28} style={{ marginBottom: '12px', color: 'var(--primary)' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
              Facebook
            </div>
            <div className="contact-info" style={{ color: 'var(--text-primary)' }}>
              Quoc Binh
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
