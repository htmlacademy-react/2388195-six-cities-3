import {Navigate, useLocation} from 'react-router-dom';
import { AppRoute } from '../const';
import { ReactNode } from 'react';
import { useAppSelector } from '../hooks/store-hooks';
import { selectUserInfo } from '../store/slices/user-slice';


type ProtectedRouteProps = {
  // children: JSX.Element;
  children: ReactNode;
  onlyUnauth?: boolean;
};

// type FromState = {
//   from?: Location;
// };

interface LocationState {
  from?: {
    pathname: string;
  };
}

export default function ProtectedRoute({ children, onlyUnauth }: ProtectedRouteProps) {
  const location = useLocation();
  const user = useAppSelector(selectUserInfo);

  if (onlyUnauth && user) {
    // есть авториз и стр логина
    const from = (location.state as LocationState)?.from?.pathname || AppRoute.Root;
    return <Navigate to = {from} replace />;
  }
  //нас надо переадресовать на страницу главное или на ту страницу, на которой мы находились, когда нас редиректнуло


  if (!onlyUnauth && !user) {
  // Нет авторизации и не стр логина
    return <Navigate state = {{from:location}} to = {AppRoute.Login} replace />;
  }

  return children;
}


// interface PrivateRouteProps {
//   authorizationStatus: AuthorizationStatus;
//   isReverse?: boolean;
//   children: JSX.Element;
// }

// export default function PrivateRoute({authorizationStatus, isReverse, children}: PrivateRouteProps): JSX.Element {
//   return (
//     authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
//       ? children
//       : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
//   );
// }
