import {Navigate, useLocation} from 'react-router-dom';
import { ReactNode } from 'react';

import { AppRoute } from '../const';
import { useAppSelector } from '../hooks/store-hooks';
import { selectUserInfo } from '../store/slices/user-slice';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnauth?: boolean;
};

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


  if (!onlyUnauth && !user) {
  // Нет авторизации и не стр логина
    return <Navigate state = {{from:location}} to = {AppRoute.Login} replace />;
  }

  return children;
}
