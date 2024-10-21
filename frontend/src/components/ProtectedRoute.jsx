// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/store';

const ProtectedRoute = () => {
  const { isLoggedIn } = useStore();

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

  // Allow access if the user is logged in
  return <Outlet />;
};

export default ProtectedRoute;