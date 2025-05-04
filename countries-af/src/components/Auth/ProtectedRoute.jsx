import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  
  // Show loading state if auth is still initializing
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;