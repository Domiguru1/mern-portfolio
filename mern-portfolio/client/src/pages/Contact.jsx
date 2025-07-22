import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      await contactAPI.submitContact(formData);
      setAlert({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Contact Header */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h1 className="section-title">Get In Touch</h1>
          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind or just want to say hello? I'd love to hear from you. 
            Let's discuss how we can work together.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '60px', alignItems: 'start' }}>
            {/* Contact Information */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
                Let's Start a Conversation
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6', marginBottom: '32px' }}>
                I'm always excited to take on new challenges and collaborate on interesting projects. 
                Whether you have a specific idea in mind or just want to explore possibilities, 
                I'm here to help bring your vision to life.
              </p>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                  Contact Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaEnvelope style={{ color: '#667eea', fontSize: '1.2rem' }} />
                    <span style={{ color: '#64748b' }}>hello@portfolio.com</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaPhone style={{ color: '#667eea', fontSize: '1.2rem' }} />
                    <span style={{ color: '#64748b' }}>+1 (555) 123-4567</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FaMapMarkerAlt style={{ color: '#667eea', fontSize: '1.2rem' }} />
                    <span style={{ color: '#64748b' }}>San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                  Follow Me
                </h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      background: '#f1f5f9',
                      borderRadius: '12px',
                      color: '#475569',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#667eea';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#f1f5f9';
                      e.target.style.color = '#475569';
                    }}
                  >
                    <FaLinkedin style={{ fontSize: '1.5rem' }} />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      background: '#f1f5f9',
                      borderRadius: '12px',
                      color: '#475569',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#667eea';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#f1f5f9';
                      e.target.style.color = '#475569';
                    }}
                  >
                    <FaGithub style={{ fontSize: '1.5rem' }} />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '48px',
                      height: '48px',
                      background: '#f1f5f9',
                      borderRadius: '12px',
                      color: '#475569',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#667eea';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = '#f1f5f9';
                      e.target.style.color = '#475569';
                    }}
                  >
                    <FaTwitter style={{ fontSize: '1.5rem' }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
                Send Me a Message
              </h3>
              
              {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    required
                    placeholder="Tell me about your project or inquiry..."
                    rows="6"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaEnvelope />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;