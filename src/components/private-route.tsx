import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';


interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

export default function PrivateRoute({authorizationStatus, isReverse, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}
