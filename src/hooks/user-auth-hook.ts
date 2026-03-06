import { selectAuthStatus } from '../store/slices/user-slice';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from './store-hooks';

export function useAuth() {
  const status = useAppSelector(selectAuthStatus);
  return status === AuthorizationStatus.Auth;
}
