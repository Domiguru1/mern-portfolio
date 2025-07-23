import React from 'react';
import { Link } from 'react-router-dom';
import { authHelpers } from '../services/api';

const AdminTest = () => {
  const isAuthenticated = authHelpers.isAuthenticated();
  const user = authHelpers.getUser();

  return (
    <div style={{ 
      padding: '40px', 
      background: '#f0f0f0', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Admin Test Page</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Authentication Status</h2>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
        <p><strong>Token:</strong> {authHelpers.getAuthToken() ? 'Present' : 'Missing'}</p>
      </div>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Navigation</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/admin/login" style={{ padding: '8px 16px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Admin Login
          </Link>
          <Link to="/admin/dashboard" style={{ padding: '8px 16px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Dashboard
          </Link>
          <Link to="/admin/projects" style={{ padding: '8px 16px', background: '#17a2b8', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Projects
          </Link>
          <Link to="/admin/contacts" style={{ padding: '8px 16px', background: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '4px' }}>
            Contacts
          </Link>
          <Link to="/" style={{ padding: '8px 16px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Home
          </Link>
        </div>
      </div>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2>Quick Actions</h2>
        <button 
          onClick={() => {
            authHelpers.removeAuthToken();
            window.location.reload();
          }}
          style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}
        >
          Clear Auth Data
        </button>
        <button 
          onClick={() => {
            console.log('Current URL:', window.location.href);
            console.log('Auth status:', isAuthenticated);
            console.log('User data:', user);
            console.log('Token:', authHelpers.getAuthToken());
          }}
          style={{ padding: '8px 16px', background: '#6f42c1', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Log Debug Info
        </button>
      </div>
    </div>
  );
};

export default AdminTest;