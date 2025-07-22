import React from 'react';
import { FaDownload, FaCode, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const About = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* About Hero Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div>
              <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
                About Me
              </h1>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px', color: '#64748b' }}>
                I'm a passionate full-stack developer with over 3 years of experience creating 
                web applications that solve real-world problems. I love working with modern 
                technologies and am always eager to learn new skills.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px', color: '#64748b' }}>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or enjoying outdoor activities. I believe in writing clean, 
                maintainable code and creating user experiences that matter.
              </p>
              <button className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <FaDownload /> Download Resume
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://via.placeholder.com/400x400/667eea/ffffff?text=About+Photo"
                alt="About"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px', 
                  height: 'auto', 
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2 className="section-title">Skills & Experience</h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <FaCode style={{ fontSize: '3rem', color: '#667eea', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Development</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Proficient in React, Node.js, MongoDB, and modern web technologies. 
                Experienced in building scalable applications.
              </p>
            </div>
            <div className="card text-center">
              <FaGraduationCap style={{ fontSize: '3rem', color: '#667eea', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Education</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Bachelor's in Computer Science. Continuous learner through online courses 
                and certifications in latest technologies.
              </p>
            </div>
            <div className="card text-center">
              <FaBriefcase style={{ fontSize: '3rem', color: '#667eea', marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Experience</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                3+ years of professional experience working with startups and established 
                companies on various web development projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">My Journey</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Senior Full-Stack Developer</h3>
              <p style={{ color: '#667eea', fontWeight: '500', marginBottom: '12px' }}>Tech Company • 2022 - Present</p>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Leading development of web applications using React, Node.js, and MongoDB. 
                Mentoring junior developers and implementing best practices.
              </p>
            </div>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Full-Stack Developer</h3>
              <p style={{ color: '#667eea', fontWeight: '500', marginBottom: '12px' }}>Startup Inc • 2021 - 2022</p>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Developed and maintained multiple client projects. Worked with React, Express.js, 
                and various databases to deliver high-quality solutions.
              </p>
            </div>
            <div className="card">
              <h3 style={{ color: '#1e293b', marginBottom: '8px' }}>Junior Developer</h3>
              <p style={{ color: '#667eea', fontWeight: '500', marginBottom: '12px' }}>Web Agency • 2020 - 2021</p>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Started my professional journey building responsive websites and learning 
                modern development practices in a collaborative environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;