import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authHelpers } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authHelpers.isAuthenticated();
  const user = authHelpers.getUser();
  
  useEffect(() => {
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - user:', user);
  }, [isAuthenticated, user]);
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('Authenticated, rendering admin component');
  return children;
};

export default ProtectedRoute;