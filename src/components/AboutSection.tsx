import React, { useState } from 'react';
import Image from 'next/image';

type Achievement = {
  achievement: string;
  recognition: string;
  year: string;
  imageUrl?: string; // Ảnh minh chứng local
  externalLink?: string; // Link external (website, document online)
  linkText?: string; // Text hiển thị cho link (mặc định "View Details")
  description?: string; // Mô tả chi tiết
}[];

type AboutSectionProps = {
  achievements: Achievement;
};

const AboutSection: React.FC<AboutSectionProps> = ({ achievements }) => {
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string, description?: string} | null>(null);

  const openImageModal = (imageUrl: string, title: string, description?: string) => {
    setSelectedImage({ url: imageUrl, title, description });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section id="about" className="about scroll-reveal">
        <div className="container">
          <div className="about-content">
            {/* <div className="about-text">
              <h2 className="section-title">🎯 About Me</h2>
              <p className="about-description">
                I&apos;m a dedicated <strong>Software Engineering student</strong> in my final year at Industrial University
                of Ho Chi Minh City, maintaining an impressive <strong>3.31/4.0 GPA</strong> while actively building
                real-world projects and participating in programming competitions.
              </p>
              <p className="about-description">
                My journey in software development has been marked by <strong>5+ national and provincial awards</strong> in
                competitive programming and <strong>3 merit-based scholarships</strong> for academic excellence.
                I&apos;m passionate about creating innovative solutions and eager to apply my skills in a professional environment.
              </p>
            </div> */}

            {/* Education Section */}
            <div className="education-section">
              <h3 className="section-subtitle">🎓 Education</h3>
              <div className="education-card">
                {/* University Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-start',
                  marginBottom: '15px',
                  textAlign: 'left'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginRight: '15px',
                    filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))'
                  }}>
                    🏛️
                  </div>
                  <div>
                    <div className="university-name" style={{ 
                      textAlign: 'left', 
                      marginBottom: '5px',
                      fontSize: '1.4rem'
                    }}>
                      Industrial University of Ho Chi Minh City (IUH)
                    </div>
                    <div className="degree-info" style={{ textAlign: 'left' }}>
                      Bachelor of Engineering – Software Engineering
                    </div>
                  </div>
                </div>

                {/* Date and GPA */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '25px',
                  padding: '15px',
                  background: 'rgba(0, 212, 255, 0.08)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 212, 255, 0.2)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: '5px',
                      filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.7))'
                    }}>📅</div>
                    <div style={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      Sep 2021 – 2025
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: '5px',
                      filter: 'drop-shadow(0 0 5px rgba(0, 255, 136, 0.7))'
                    }}>📊</div>
                    <div style={{ 
                      color: 'var(--accent)', 
                      fontWeight: '700',
                      fontSize: '1.1rem'
                    }}>
                      GPA: 3.31/4.00
                    </div>
                  </div>
                </div>

                {/* Scholarships */}
                <div className="scholarships-title" style={{ 
                  textAlign: 'left',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    fontSize: '1.3rem',
                    filter: 'drop-shadow(0 0 5px rgba(255, 193, 7, 0.7))'
                  }}>💰</span>
                  SCHOLARSHIPS ACHIEVED:
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gap: '12px',
                  marginBottom: '25px'
                }}>
                  <div className="scholarship-item" style={{
                    background: 'rgba(255, 215, 0, 0.1)',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>🥇</span>
                    <span>2 Full-Tuition Scholarships (100% tuition coverage) for Academic Excellence</span>
                  </div>
                  <div className="scholarship-item" style={{
                    background: 'rgba(192, 192, 192, 0.1)',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(192, 192, 192, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>🥈</span>
                    <span>1 Half-Tuition Scholarship (50% tuition coverage) for Academic Excellence</span>
                  </div>
                </div>

                {/* Key Coursework */}
                <div className="coursework-title" style={{ 
                  textAlign: 'left',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    fontSize: '1.3rem',
                    filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.7))'
                  }}>📚</span>
                  KEY COURSEWORK:
                </div>
                <div className="coursework-tags" style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                  justifyItems: 'start'
                }}>
                  <span className="coursework-tag">Data Structures & Algorithms</span>
                  <span className="coursework-tag">Object-Oriented Programming</span>
                  <span className="coursework-tag">Web Development</span>
                  <span className="coursework-tag">Database Management</span>
                  <span className="coursework-tag">Software Engineering</span>
                  <span className="coursework-tag">Mobile Development</span>
                </div>
              </div>
            </div>

            {/* Awards Section with Evidence Gallery */}
            <div className="awards-section">
              <h3 className="section-subtitle">🏆 Awards & Achievements</h3>
              
              {/* Evidence Gallery Note */}
              <div style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                <p style={{ 
                  color: 'var(--primary)', 
                  margin: 0, 
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  📸 Click images to view certificates • 🔗 Click links for external evidence
                </p>
              </div>

              <table className="awards-table">
                <thead>
                  <tr>
                    <th>Achievement</th>
                    <th>Recognition</th>
                    <th>Year</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.map((award, index) => (
                    <tr key={index}>
                      <td>{award.achievement}</td>
                      <td className="award-recognition">{award.recognition}</td>
                      <td>{award.year}</td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                          {/* Image Evidence */}
                          {award.imageUrl && (
                            <Image
                              src={award.imageUrl}
                              alt={`${award.achievement} certificate`}
                              width={50}
                              height={38}
                              onClick={() => openImageModal(award.imageUrl!, award.achievement, award.description)}
                              style={{
                                width: '50px',
                                height: '38px',
                                objectFit: 'cover',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                border: '2px solid var(--glass-border)',
                                transition: 'all 0.3s ease',
                                filter: 'brightness(0.9)'
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(0.9)';
                                (e.currentTarget as HTMLElement).style.borderColor = 'var(--glass-border)';
                              }}
                              title="Click to view certificate"
                              unoptimized
                            />
                          )}
                          
                          {/* External Link Evidence */}
                          {award.externalLink && (
                            <a
                              href={award.externalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '6px 10px',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '6px',
                                color: 'var(--primary)',
                                textDecoration: 'none',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--primary)';
                                e.currentTarget.style.color = 'var(--bg-primary)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'var(--glass-bg)';
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                              title={`Open ${award.linkText || 'details'} in new tab`}
                            >
                              {award.linkText || 'View Details'}
                              <span style={{ fontSize: '0.7rem' }}>🔗</span>
                            </a>
                          )}

                          {/* No Evidence */}
                          {!award.imageUrl && !award.externalLink && (
                            <span style={{ 
                              color: 'var(--text-muted)', 
                              fontSize: '0.8rem',
                              fontStyle: 'italic'
                            }}>
                              No evidence
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal - sử dụng inline styles để tương thích */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  margin: 0, 
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    margin: '5px 0 0 0', 
                    fontSize: '0.9rem'
                  }}>
                    {selectedImage.description}
                  </p>
                )}
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontSize: '18px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--bg-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--glass-bg)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px' }}>
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }}
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;