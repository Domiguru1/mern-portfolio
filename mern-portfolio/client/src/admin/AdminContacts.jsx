import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaReply, 
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendar,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaProjectDiagram,
  FaChartBar,
  FaEye
} from 'react-icons/fa';
import { contactAPI, authHelpers } from '../services/api';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = authHelpers.getUser();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    let filtered = contacts;
    
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter]);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = async (contact) => {
    try {
      // Mark as read if it's new
      if (contact.status === 'new') {
        await contactAPI.updateContactStatus(contact._id, { status: 'read' });
        await fetchContacts(); // Refresh the list
      }
      setSelectedContact(contact);
      setShowModal(true);
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleUpdateStatus = async (contactId, status, adminNotes = '') => {
    try {
      await contactAPI.updateContactStatus(contactId, { status, adminNotes });
      await fetchContacts();
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact(prev => ({ ...prev, status, adminNotes }));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.deleteContact(id);
        await fetchContacts();
        if (selectedContact && selectedContact._id === id) {
          setShowModal(false);
          setSelectedContact(null);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleLogout = () => {
    authHelpers.removeAuthToken();
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#ef4444';
      case 'read': return '#f59e0b';
      case 'responded': return '#10b981';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <FaEnvelope />;
      case 'read': return <FaEnvelopeOpen />;
      case 'responded': return <FaReply />;
      default: return <FaEnvelope />;
    }
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
            color: 'white', 
            textDecoration: 'none',
            background: 'rgba(102, 126, 234, 0.2)',
            borderRight: '3px solid #667eea'
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
              Contact Messages
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {contacts.filter(c => c.status === 'new').length} new messages
            </span>
          </div>
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
                  placeholder="Search messages..."
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
                <option value="all">All Messages</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>

          {/* Messages List */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              {filteredContacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h3 style={{ color: '#64748b', marginBottom: '16px' }}>No messages found</h3>
                  <p style={{ color: '#94a3b8' }}>Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div>
                  {filteredContacts.map((contact, index) => (
                    <div 
                      key={contact._id} 
                      style={{ 
                        padding: '20px 24px', 
                        borderBottom: index < filteredContacts.length - 1 ? '1px solid #f1f5f9' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        background: contact.status === 'new' ? '#fef3f2' : 'white'
                      }}
                      onClick={() => handleViewContact(contact)}
                      onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                      onMouseOut={(e) => e.target.style.background = contact.status === 'new' ? '#fef3f2' : 'white'}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
                        <div style={{ 
                          color: getStatusColor(contact.status), 
                          fontSize: '1.2rem',
                          marginTop: '4px'
                        }}>
                          {getStatusIcon(contact.status)}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                            <div>
                              <h3 style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: '600', 
                                marginBottom: '4px', 
                                color: '#1e293b'
                              }}>
                                {contact.subject}
                              </h3>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', color: '#64748b' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <FaUser /> {contact.name}
                                </span>
                                <span>{contact.email}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{
                                background: getStatusColor(contact.status),
                                color: 'white',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                textTransform: 'capitalize'
                              }}>
                                {contact.status}
                              </span>
                              <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FaCalendar />
                                {new Date(contact.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <p style={{ 
                            color: '#64748b', 
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {contact.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedContact && (
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
            maxWidth: '700px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                  {selectedContact.subject}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.9rem', color: '#64748b' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaUser /> {selectedContact.name}
                  </span>
                  <span>{selectedContact.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendar /> {new Date(selectedContact.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <FaTimes />
              </button>
            </div>
            
            <div style={{ 
              background: '#f8fafc', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>
                Message:
              </h4>
              <p style={{ color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {selectedContact.message}
              </p>
            </div>

            {selectedContact.adminNotes && (
              <div style={{ 
                background: '#f0f9ff', 
                padding: '16px', 
                borderRadius: '8px', 
                marginBottom: '24px',
                border: '1px solid #bae6fd'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', color: '#0c4a6e' }}>
                  Admin Notes:
                </h4>
                <p style={{ color: '#0369a1', fontSize: '0.9rem' }}>
                  {selectedContact.adminNotes}
                </p>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <span style={{ color: '#64748b', fontWeight: '500' }}>Status:</span>
              <span style={{
                background: getStatusColor(selectedContact.status),
                color: 'white',
                padding: '2px 12px',
                borderRadius: '12px',
                fontSize: '0.875rem',
                textTransform: 'capitalize'
              }}>
                {selectedContact.status}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {selectedContact.status !== 'read' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedContact._id, 'read')}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.875rem' }}
                >
                  <FaEnvelopeOpen /> Mark as Read
                </button>
              )}
              {selectedContact.status !== 'responded' && (
                <button 
                  onClick={() => {
                    const notes = prompt('Add admin notes (optional):');
                    handleUpdateStatus(selectedContact._id, 'responded', notes || '');
                  }}
                  className="btn btn-success"
                  style={{ fontSize: '0.875rem' }}
                >
                  <FaReply /> Mark as Responded
                </button>
              )}
              <button 
                onClick={() => handleDelete(selectedContact._id)}
                className="btn btn-danger"
                style={{ fontSize: '0.875rem' }}
              >
                <FaTrash /> Delete
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem', marginLeft: 'auto' }}
              >
                Close
              </button>
            </div>
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

export default AdminContacts;