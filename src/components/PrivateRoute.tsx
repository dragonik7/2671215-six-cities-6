import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = false;

function PrivateRoute(){
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
