import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await portfolioAPI.getFeaturedProjects();
        setFeaturedProjects(response.data);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="highlight">Your Name</span>
                <br />
                Full-Stack Developer
              </h1>
              <p className="hero-description">
                I create beautiful, responsive web applications using modern technologies. 
                Passionate about clean code, user experience, and bringing ideas to life.
              </p>
              <div className="hero-buttons">
                <Link to="/portfolio" className="btn btn-primary">
                  View My Work <FaArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-avatar">
                <img 
                  src="https://via.placeholder.com/300x300/667eea/ffffff?text=Your+Photo" 
                  alt="Developer"
                  className="avatar-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills section">
        <div className="container">
          <h2 className="section-title">Technologies I Work With</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <h3>Frontend</h3>
              <p>React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS</p>
            </div>
            <div className="skill-item">
              <h3>Backend</h3>
              <p>Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs</p>
            </div>
            <div className="skill-item">
              <h3>Tools & Others</h3>
              <p>Git, Docker, AWS, Heroku, Figma, VS Code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="projects-grid">
                {featuredProjects.slice(0, 3).map((project) => (
                  <div key={project._id} className="project-card">
                    <div className="project-image">
                      <img 
                        src={project.image || 'https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image'} 
                        alt={project.title}
                      />
                    </div>
                    <div className="project-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.shortDescription}</p>
                      <div className="project-technologies">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <FaGithub /> Code
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <FaExternalLinkAlt /> Live Demo
                          </a>
                        )}
                        <Link 
                          to={`/project/${project._id}`}
                          className="project-link primary"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {featuredProjects.length > 3 && (
                <div className="text-center mt-6">
                  <Link to="/portfolio" className="btn btn-primary">
                    View All Projects <FaArrowRight />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Let's Work Together</h2>
            <p className="cta-description">
              Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Start a Project <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;