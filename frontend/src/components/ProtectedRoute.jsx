// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/store';

const ProtectedRoute = ({loginPage}) => {
  const { isAuthenticated, user } = useStore();

  
  if (!isAuthenticated) {
    // Redirect to login page if not logged in
    return <Navigate to={loginPage} />;
  }
  if(!user.isVerified){
    return <Navigate to="/verify-email"/>
  }

  // Allow access if the user is logged in
  return <Outlet />;
};

export default ProtectedRoute;
