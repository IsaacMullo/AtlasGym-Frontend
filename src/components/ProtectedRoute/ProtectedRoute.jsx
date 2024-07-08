import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

// Componente para rutas protegidas por rol
const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  // Si no hay usuario, redirige al login
  if (!user) {
      return <Navigate to="/" replace />;
  }

  // Si el usuario no tiene un rol válido para esta ruta, redirige a "No Autorizado"
  if (roles && !roles.includes(user.rol)) {
      return <Navigate to="/sales" replace />;
  }

  // Si pasa las verificaciones, renderiza los hijos (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;