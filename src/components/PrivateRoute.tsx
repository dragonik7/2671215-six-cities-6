// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthorizationStatus } from '../const';
import Spinner from './Spinner.tsx';

function PrivateRoute(): JSX.Element {
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner/>;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

export default PrivateRoute;
