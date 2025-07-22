import React, { useState } from 'react';

type MediaItem = {
  type: 'video' | 'image';
  url: string;
  title?: string;
  thumbnail?: string; // For videos
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  github: any;
  demo?: string; // Single demo URL (backward compatibility)
  media?: MediaItem[]; // New: Multiple videos/images
  duration?: string; // Project duration
  teamSize?: number; // Number of team members
};

type ProjectsSectionProps = {
  projects: Project[];
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedMedia, setSelectedMedia] = useState<{
    items: MediaItem[];
    currentIndex: number;
    projectTitle: string;
  } | null>(null);

  const openMediaModal = (media: MediaItem[], projectTitle: string) => {
    setSelectedMedia({ items: media, currentIndex: 0, projectTitle });
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    if (!selectedMedia) return;
    const nextIndex = (selectedMedia.currentIndex + 1) % selectedMedia.items.length;
    setSelectedMedia({ ...selectedMedia, currentIndex: nextIndex });
  };

  const prevMedia = () => {
    if (!selectedMedia) return;
    const prevIndex = selectedMedia.currentIndex === 0 
      ? selectedMedia.items.length - 1 
      : selectedMedia.currentIndex - 1;
    setSelectedMedia({ ...selectedMedia, currentIndex: prevIndex });
  };

  const goToMedia = (index: number) => {
    if (!selectedMedia) return;
    setSelectedMedia({ ...selectedMedia, currentIndex: index });
  };

  return (
    <>
      <section id="projects" className="projects scroll-reveal">
        <div className="container">
          <h2 className="section-title">🚀 Featured Projects</h2>
          <div className="projects-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // Cứng 2 columns
            gap: '40px',
            marginTop: '60px'
          }}>
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="project-card" 
                style={{
                  animationDelay: `${index * 0.2}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '550px',
                  padding: '30px'
                }}
              >
                {/* Header */}
                <div className="project-header" style={{ 
                  marginBottom: '20px',
                  minHeight: '90px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ flex: 1, paddingRight: '15px' }}>
                    <h3 
                      className="project-title" 
                      style={{ 
                        fontSize: '1.3rem',
                        lineHeight: '1.4',
                        marginBottom: '0',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end',
                    gap: '8px'
                  }}>
                    <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                    
                    {/* Project Meta Info */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      gap: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      {project.duration && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          background: 'rgba(0, 212, 255, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 212, 255, 0.3)'
                        }}>
                          <span>📅</span>
                          <span style={{ color: 'var(--primary)' }}>{project.duration}</span>
                        </div>
                      )}
                      {project.teamSize && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          background: 'rgba(0, 255, 136, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          border: '1px solid rgba(0, 255, 136, 0.3)'
                        }}>
                          <span>👥</span>
                          <span style={{ color: 'var(--accent)' }}>
                            {project.teamSize} {project.teamSize === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ 
                  marginBottom: '20px',
                  minHeight: '170px', // Increased from 150px
                  overflow: 'hidden'
                }}>
                  <p 
                    className="project-description" 
                    style={{ 
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      margin: '0',
                      display: '-webkit-box',
                      WebkitLineClamp: 8, // Increased from 7
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '170px', // Increased from 150px
                      textAlign: 'justify'
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="project-tech" style={{ 
                  marginBottom: '20px',
                  minHeight: '80px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignContent: 'flex-start',
                  overflow: 'hidden'
                }}>
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="tech-badge"
                      style={{
                        fontSize: '0.8rem',
                        padding: '6px 12px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links & Media Demos */}
                <div style={{ 
                  marginTop: 'auto',
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 5
                }}>
                  {/* GitHub Links */}
                  {Array.isArray(project.github)
                    ? project.github.map((link, linkIndex) => (
                        <a 
                          key={linkIndex} 
                          href={link.url} 
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('GitHub link clicked:', link.url);
                          }}
                          style={{
                            fontSize: '0.85rem',
                            padding: '8px 16px',
                            display: 'inline-block',
                            textDecoration: 'none',
                            pointerEvents: 'all',
                            zIndex: 10
                          }}
                        >
                          🔗 {link.label}
                        </a>
                      ))
                    : project.github && (
                        <a 
                          href={project.github} 
                          className="project-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('GitHub link clicked:', project.github);
                          }}
                          style={{
                            fontSize: '0.85rem',
                            padding: '8px 16px',
                            display: 'inline-block',
                            textDecoration: 'none',
                            pointerEvents: 'all',
                            zIndex: 10
                          }}
                        >
                          🔗 GitHub
                        </a>
                      )}

                  {/* Single Demo (backward compatibility) */}
                  {project.demo && !project.media && (
                    <a 
                      href={project.demo} 
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Demo link clicked:', project.demo);
                      }}
                      style={{
                        fontSize: '0.85rem',
                        padding: '8px 16px',
                        display: 'inline-block',
                        textDecoration: 'none',
                        pointerEvents: 'all',
                        zIndex: 10
                      }}
                    >
                      👀 Live Demo
                    </a>
                  )}

                  {/* Media Gallery Demo */}
                  {project.media && project.media.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Opening media modal for:', project.title);
                        console.log('Media items:', project.media);
                        openMediaModal(project.media!, project.title);
                      }}
                      className="project-link"
                      style={{
                        fontSize: '0.85rem',
                        padding: '8px 16px',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '20px',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--bg-primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--glass-bg)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      🎬 View Demo ({project.media.length})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
              background: 'var(--bg-secondary)',
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
                  fontSize: '1.3rem'
                }}>
                  {selectedMedia.projectTitle}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  margin: '5px 0 0 0',
                  fontSize: '0.9rem'
                }}>
                  {selectedMedia.currentIndex + 1} of {selectedMedia.items.length}
                </p>
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
                  fontSize: '18px'
                }}
              >
                ×
              </button>
            </div>

            {/* Media Content */}
            <div style={{ 
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              {selectedMedia.items[selectedMedia.currentIndex].type === 'video' ? (
                selectedMedia.items[selectedMedia.currentIndex].url.includes('drive.google.com') ? (
                  // Google Drive video embed
                  <iframe
                    key={`${selectedMedia.currentIndex}-${selectedMedia.items[selectedMedia.currentIndex].url}`}
                    src={selectedMedia.items[selectedMedia.currentIndex].url.replace('/view?usp=sharing', '/preview')}
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      height: '450px',
                      maxHeight: '65vh',
                      borderRadius: '12px',
                      border: 'none'
                    }}
                    allow="autoplay"
                    onError={(e) => {
                      console.error('Google Drive video load error:', e);
                      console.error('Video URL:', selectedMedia.items[selectedMedia.currentIndex].url);
                    }}
                  />
                ) : (
                  // Regular video file
                  <video
                    key={`${selectedMedia.currentIndex}-${selectedMedia.items[selectedMedia.currentIndex].url}`}
                    src={selectedMedia.items[selectedMedia.currentIndex].url}
                    controls
                    autoPlay={false}
                    preload="metadata"
                    muted={false}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '65vh',
                      borderRadius: '12px'
                    }}
                    onError={(e) => {
                      console.error('Video load error:', e);
                      console.error('Video URL:', selectedMedia.items[selectedMedia.currentIndex].url);
                    }}
                    onLoadStart={() => {
                      console.log('Video loading started:', selectedMedia.items[selectedMedia.currentIndex].url);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play:', selectedMedia.items[selectedMedia.currentIndex].url);
                    }}
                  />
                )
              ) : (
                <img
                  key={`${selectedMedia.currentIndex}-${selectedMedia.items[selectedMedia.currentIndex].url}`}
                  src={selectedMedia.items[selectedMedia.currentIndex].url}
                  alt={selectedMedia.items[selectedMedia.currentIndex].title || 'Demo'}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '65vh',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                  onError={(e) => {
                    console.error('Image load error:', e);
                    console.error('Image URL:', selectedMedia.items[selectedMedia.currentIndex].url);
                  }}
                  onLoad={() => {
                    console.log('Image loaded:', selectedMedia.items[selectedMedia.currentIndex].url);
                  }}
                />
              )}
              
              {/* Media Title & Description */}
              <div style={{
                textAlign: 'center',
                marginTop: '15px',
                maxWidth: '600px'
              }}>
                <h4 style={{
                  color: 'var(--text-primary)',
                  margin: '0 0 5px 0',
                  fontSize: '1.1rem',
                  fontWeight: '600'
                }}>
                  {selectedMedia.items[selectedMedia.currentIndex].title || 
                   `${selectedMedia.items[selectedMedia.currentIndex].type === 'video' ? 'Demo Video' : 'Screenshot'} ${selectedMedia.currentIndex + 1}`}
                </h4>
                
                {/* Navigation Indicator */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}>
                  {selectedMedia.items.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToMedia(index)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: 'none',
                        background: selectedMedia.currentIndex === index 
                          ? 'var(--primary)' 
                          : 'var(--glass-border)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            {selectedMedia.items.length > 1 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                right: '20px',
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'space-between',
                pointerEvents: 'none'
              }}>
                <button
                  onClick={prevMedia}
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    pointerEvents: 'all'
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextMedia}
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    fontSize: '20px',
                    pointerEvents: 'all'
                  }}
                >
                  →
                </button>
              </div>
            )}

            {/* Media Thumbnails */}
            {selectedMedia.items.length > 1 && (
              <div style={{
                padding: '20px',
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {selectedMedia.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => goToMedia(index)}
                    style={{
                      width: '60px',
                      height: '45px',
                      border: selectedMedia.currentIndex === index 
                        ? '2px solid var(--primary)' 
                        : '1px solid var(--glass-border)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'transparent',
                      position: 'relative'
                    }}
                  >
                    {item.type === 'video' ? (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          fontSize: '10px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '1px 3px',
                          borderRadius: '2px'
                        }}>
                          {index + 1}
                        </span>
                        ▶️
                      </div>
                    ) : (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img
                          src={item.url}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          fontSize: '10px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '1px 3px',
                          borderRadius: '2px'
                        }}>
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;