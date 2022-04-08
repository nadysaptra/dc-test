import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  // check if localstorage exist
  if (!auth.user && !localStorage.getItem('auth')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
