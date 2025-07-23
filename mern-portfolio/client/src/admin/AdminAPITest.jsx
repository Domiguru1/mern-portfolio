import React, { useState } from 'react';
import { adminAPI, authHelpers } from '../services/api';

const AdminAPITest = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, data) => {
    setTestResults(prev => [...prev, {
      test,
      success,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testCreateProject = async () => {
    const testProject = {
      title: 'API Test Project',
      description: 'This is a test project created via API to verify the admin project creation functionality works correctly.',
      shortDescription: 'API test project for debugging admin functionality',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=API+Test',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/test/api-test',
      liveUrl: 'https://api-test.example.com',
      category: 'web-development',
      featured: false,
      status: 'active'
    };

    try {
      console.log('Testing project creation with data:', testProject);
      const response = await adminAPI.createProject(testProject);
      addResult('Create Project', true, response.data);
      console.log('Project creation successful:', response.data);
    } catch (error) {
      console.error('Project creation failed:', error);
      addResult('Create Project', false, {
        message: error.response?.data?.message || error.message,
        details: error.response?.data?.details,
        status: error.response?.status
      });
    }
  };

  const testGetProjects = async () => {
    try {
      const response = await adminAPI.getProjects();
      addResult('Get Projects', true, { count: response.data.length, projects: response.data.slice(0, 2) });
    } catch (error) {
      addResult('Get Projects', false, {
        message: error.response?.data?.message || error.message,
        status: error.response?.status
      });
    }
  };

  const testAuth = async () => {
    const token = authHelpers.getAuthToken();
    const user = authHelpers.getUser();
    addResult('Authentication Check', !!token, {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      user: user,
      isAuthenticated: authHelpers.isAuthenticated()
    });
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    await testAuth();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testGetProjects();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testCreateProject();
    
    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Admin API Testing</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runAllTests} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          {loading ? 'Running Tests...' : 'Run All Tests'}
        </button>
        <button 
          onClick={testAuth}
          style={{ 
            padding: '10px 20px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Test Auth
        </button>
        <button 
          onClick={testGetProjects}
          style={{ 
            padding: '10px 20px', 
            background: '#17a2b8', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Test Get Projects
        </button>
        <button 
          onClick={testCreateProject}
          style={{ 
            padding: '10px 20px', 
            background: '#ffc107', 
            color: 'black', 
            border: 'none', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        >
          Test Create Project
        </button>
        <button 
          onClick={clearResults}
          style={{ 
            padding: '10px 20px', 
            background: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}
        >
          Clear Results
        </button>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          testResults.map((result, index) => (
            <div 
              key={index} 
              style={{ 
                margin: '10px 0', 
                padding: '10px', 
                background: result.success ? '#d4edda' : '#f8d7da',
                border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '4px'
              }}
            >
              <strong>{result.test}</strong> - 
              <span style={{ color: result.success ? '#155724' : '#721c24' }}>
                {result.success ? ' SUCCESS' : ' FAILED'}
              </span>
              <small style={{ display: 'block', color: '#6c757d' }}>
                {result.timestamp}
              </small>
              <pre style={{ 
                background: 'white', 
                padding: '8px', 
                marginTop: '8px', 
                borderRadius: '3px',
                fontSize: '12px',
                overflow: 'auto'
              }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAPITest;