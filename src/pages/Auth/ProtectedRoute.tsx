import React, { ReactElement, FC } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement; // Expect only React elements as children
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) : ReactElement<any, any> | null => { 
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
