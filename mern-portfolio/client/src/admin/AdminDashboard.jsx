import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaProjectDiagram, 
  FaEnvelope, 
  FaChartBar, 
  FaSignOutAlt,
  FaPlus,
  FaEye,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { adminAPI, contactAPI, authHelpers } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    featuredProjects: 0
  });
  const [contactStats, setContactStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    readMessages: 0,
    respondedMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = authHelpers.getUser();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectStats, messageStats] = await Promise.all([
          adminAPI.getDashboardStats(),
          contactAPI.getContactStats()
        ]);
        setStats(projectStats.data);
        setContactStats(messageStats.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
            color: 'white', 
            textDecoration: 'none',
            background: 'rgba(102, 126, 234, 0.2)',
            borderRight: '3px solid #667eea'
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
          <FaEnvelope /> 
          Messages
          {contactStats.newMessages > 0 && (
            <span style={{
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto'
            }}>
              {contactStats.newMessages}
            </span>
          )}
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
      
      {/* Mobile Overlay */}
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

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '250px' }}>
        {/* Header */}
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
              Dashboard
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/admin/projects" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
              <FaPlus style={{ marginRight: '6px' }} />
              New Project
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main style={{ padding: '24px' }}>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-3" style={{ marginBottom: '32px' }}>
                <div className="card text-center">
                  <FaProjectDiagram style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    {stats.totalProjects}
                  </h3>
                  <p style={{ color: '#64748b' }}>Total Projects</p>
                </div>
                <div className="card text-center">
                  <FaChartBar style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    {stats.activeProjects}
                  </h3>
                  <p style={{ color: '#64748b' }}>Active Projects</p>
                </div>
                <div className="card text-center">
                  <FaEnvelope style={{ fontSize: '2.5rem', color: '#f59e0b', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                    {contactStats.newMessages}
                  </h3>
                  <p style={{ color: '#64748b' }}>New Messages</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-2" style={{ gap: '24px' }}>
                <div className="card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                    Project Overview
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Total Projects:</span>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{stats.totalProjects}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Active:</span>
                      <span style={{ fontWeight: '600', color: '#10b981' }}>{stats.activeProjects}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Featured:</span>
                      <span style={{ fontWeight: '600', color: '#667eea' }}>{stats.featuredProjects}</span>
                    </div>
                  </div>
                  <Link 
                    to="/admin/projects"
                    className="btn btn-primary"
                    style={{ marginTop: '16px', width: '100%', textAlign: 'center' }}
                  >
                    Manage Projects
                  </Link>
                </div>

                <div className="card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                    Messages Overview
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Total Messages:</span>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{contactStats.totalMessages}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>New:</span>
                      <span style={{ fontWeight: '600', color: '#ef4444' }}>{contactStats.newMessages}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Responded:</span>
                      <span style={{ fontWeight: '600', color: '#10b981' }}>{contactStats.respondedMessages}</span>
                    </div>
                  </div>
                  <Link 
                    to="/admin/contacts"
                    className="btn btn-primary"
                    style={{ marginTop: '16px', width: '100%', textAlign: 'center' }}
                  >
                    View Messages
                  </Link>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

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

export default AdminDashboard;