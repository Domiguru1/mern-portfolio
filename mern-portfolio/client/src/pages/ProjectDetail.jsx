import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa';
import { portfolioAPI } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await portfolioAPI.getProject(id);
        setProject(response.data);
      } catch (error) {
        setError('Project not found');
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '60vh' }}>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h2 style={{ color: '#64748b', marginBottom: '16px' }}>Project Not Found</h2>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/portfolio" className="btn btn-primary">
              <FaArrowLeft /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Back Button */}
      <section style={{ padding: '20px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <Link 
            to="/portfolio" 
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>
        </div>
      </section>

      {/* Project Hero */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                  {project.title}
                </h1>
                {project.featured && (
                  <span style={{ 
                    background: '#667eea', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    Featured
                  </span>
                )}
              </div>
              
              <p style={{ fontSize: '1.2rem', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                {project.shortDescription}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                  <FaTag style={{ color: '#667eea' }} />
                  <span style={{ textTransform: 'capitalize' }}>{project.category.replace('-', ' ')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                  <FaCalendar style={{ color: '#667eea' }} />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FaGithub /> View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>

            <div>
              <img 
                src={project.image || 'https://via.placeholder.com/600x400/667eea/ffffff?text=Project+Image'} 
                alt={project.title}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
                Project Overview
              </h2>
              <div style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.7' }}>
                {project.description.split('\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '16px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
                Technologies Used
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    style={{ 
                      background: 'white', 
                      color: '#475569', 
                      padding: '8px 16px', 
                      borderRadius: '25px', 
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                Project Status
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ 
                  background: project.status === 'active' ? '#10b981' : project.status === 'completed' ? '#667eea' : '#64748b',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {project.status}
                </span>
              </div>

              {(project.githubUrl || project.liveUrl) && (
                <>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                    Project Links
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          color: '#64748b',
                          textDecoration: 'none',
                          padding: '12px 16px',
                          background: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.color = '#667eea';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.color = '#64748b';
                        }}
                      >
                        <FaGithub />
                        View Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          color: '#64748b',
                          textDecoration: 'none',
                          padding: '12px 16px',
                          background: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.color = '#667eea';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.color = '#64748b';
                        }}
                      >
                        <FaExternalLinkAlt />
                        View Live Demo
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;