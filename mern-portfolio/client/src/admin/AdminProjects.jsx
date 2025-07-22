import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaStar,
  FaSearch,
  FaFilter,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaProjectDiagram,
  FaEnvelope,
  FaChartBar
} from 'react-icons/fa';
import { adminAPI, authHelpers } from '../services/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'web-development',
    featured: false,
    status: 'active'
  });
  const navigate = useNavigate();
  const user = authHelpers.getUser();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);

  const fetchProjects = async () => {
    try {
      const response = await adminAPI.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };

    try {
      if (editingProject) {
        await adminAPI.updateProject(editingProject._id, projectData);
      } else {
        await adminAPI.createProject(projectData);
      }
      
      await fetchProjects();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription,
      image: project.image,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      category: project.category,
      featured: project.featured,
      status: project.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await adminAPI.deleteProject(id);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      image: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      category: 'web-development',
      featured: false,
      status: 'active'
    });
    setEditingProject(null);
  };

  const handleLogout = () => {
    authHelpers.removeAuthToken();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div style={{
      width: '250px',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: 'white',
      height: '100vh',
      position: 'fixed',
      left: sidebarOpen ? '0' : '-250px',
      top: 0,
      transition: 'left 0.3s ease',
      zIndex: 1000,
      padding: '20px 0'
    }}>
      <div style={{ padding: '0 20px', marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Admin Panel
        </h2>
      </div>
      
      <nav>
        <Link 
          to="/admin/dashboard" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 20px', 
            color: '#e2e8f0', 
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#e2e8f0';
          }}
        >
          <FaChartBar /> Dashboard
        </Link>
        <Link 
          to="/admin/projects" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 20px', 
            color: 'white', 
            textDecoration: 'none',
            background: 'rgba(102, 126, 234, 0.2)',
            borderRight: '3px solid #667eea'
          }}
        >
          <FaProjectDiagram /> Projects
        </Link>
        <Link 
          to="/admin/contacts" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 20px', 
            color: '#e2e8f0', 
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#e2e8f0';
          }}
        >
          <FaEnvelope /> Messages
        </Link>
        <Link 
          to="/" 
          target="_blank"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 20px', 
            color: '#e2e8f0', 
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#e2e8f0';
          }}
        >
          <FaEye /> View Site
        </Link>
      </nav>

      <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
        <div style={{ 
          padding: '16px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '0.875rem', marginBottom: '4px' }}>Welcome back,</p>
          <p style={{ fontWeight: '600' }}>{user?.username}</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#fca5a5',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#ef4444';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            e.target.style.color = '#fca5a5';
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      <Sidebar />
      
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div style={{ flex: 1, marginLeft: '250px' }}>
        <header style={{
          background: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                color: '#64748b',
                cursor: 'pointer',
                padding: '8px'
              }}
              className="mobile-menu-btn"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e293b' }}>
              Projects
            </h1>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaPlus /> Add Project
          </button>
        </header>

        <main style={{ padding: '24px' }}>
          {/* Filters */}
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            marginBottom: '24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ position: 'relative' }}>
                <FaSearch style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#64748b' 
                }} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 40px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaFilter style={{ color: '#64748b' }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {filteredProjects.map((project) => (
                <div key={project._id} className="card">
                  <div style={{ position: 'relative', marginBottom: '16px' }}>
                    <img 
                      src={project.image || 'https://via.placeholder.com/300x200/667eea/ffffff?text=Project'} 
                      alt={project.title}
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                      }}
                    />
                    {project.featured && (
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#f59e0b',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <FaStar /> Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                    {project.title}
                  </h3>
                  
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '12px', lineHeight: '1.4' }}>
                    {project.shortDescription}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      background: project.status === 'active' ? '#10b981' : 
                                 project.status === 'completed' ? '#667eea' : '#64748b',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize'
                    }}>
                      {project.status}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                      {project.technologies.length} tech{project.technologies.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEdit(project)}
                      className="btn btn-secondary"
                      style={{ flex: 1, fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(project._id)}
                      className="btn btn-danger"
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ color: '#64748b', marginBottom: '16px' }}>No projects found</h3>
              <p style={{ color: '#94a3b8' }}>Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="form-input"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="ui-design">UI/UX Design</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Short Description *</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  className="form-input"
                  placeholder="Brief description for cards"
                  maxLength="200"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Full Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="form-input form-textarea"
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Technologies (comma-separated) *</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  className="form-input"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>
              
              <div className="grid grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Live URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="grid grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="form-input"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    />
                    Featured Project
                  </label>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          div[style*="marginLeft: 250px"] {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProjects;