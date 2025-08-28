import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  // Show nothing while checking auth status
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If no admin, redirect to login
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // If admin exists, render children
  return children;
};

export default ProtectedRoute;