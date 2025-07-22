import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import { portfolioAPI } from '../services/api';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile Apps' },
    { value: 'ui-design', label: 'UI/UX Design' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await portfolioAPI.getAllProjects();
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Portfolio Header */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h1 className="section-title">My Portfolio</h1>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Here's a collection of projects I've worked on, showcasing different technologies and approaches to problem-solving.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: '40px 0', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <FaFilter style={{ color: '#667eea', fontSize: '1.2rem' }} />
            <span style={{ fontWeight: '500', color: '#475569' }}>Filter by category:</span>
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`btn ${selectedCategory === category.value ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#64748b', marginBottom: '16px' }}>No projects found</h3>
              <p style={{ color: '#94a3b8' }}>Try selecting a different category.</p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <p style={{ color: '#64748b' }}>
                  Showing {filteredProjects.length} of {projects.length} projects
                </p>
              </div>
              <div className="grid grid-3">
                {filteredProjects.map((project) => (
                  <div key={project._id} className="card" style={{ overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', marginBottom: '16px' }}>
                      <img 
                        src={project.image || 'https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image'} 
                        alt={project.title}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <h3 style={{ color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span style={{ 
                            background: '#667eea', 
                            color: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            Featured
                          </span>
                        )}
                      </div>
                      <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '16px' }}>
                        {project.shortDescription}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index} 
                            style={{ 
                              background: '#f1f5f9', 
                              color: '#475569', 
                              padding: '4px 12px', 
                              borderRadius: '20px', 
                              fontSize: '0.875rem',
                              fontWeight: '500'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span style={{ 
                            background: '#e2e8f0', 
                            color: '#64748b', 
                            padding: '4px 12px', 
                            borderRadius: '20px', 
                            fontSize: '0.875rem'
                          }}>
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <FaGithub /> Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            <FaExternalLinkAlt /> Demo
                          </a>
                        )}
                        <Link 
                          to={`/project/${project._id}`}
                          className="btn btn-primary"
                          style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;