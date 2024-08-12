import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext'; 

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
      return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.rol)) {
      return <Navigate to="/sales" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;