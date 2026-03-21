import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppSelector, useAppDispatch } from '../hooks/store-hooks';
import { useAuth } from '../hooks/user-auth-hook';
import { selectUserInfo } from '../store/slices/user-slice';
import { logout } from '../store/thunk/user-auth';

interface NavProps {
  favouriteCount: number;
  isPageLogin?: boolean;
}

export default function Nav({ favouriteCount, isPageLogin }: NavProps): JSX.Element | null {
  const isAuth = useAuth();
  const data = useAppSelector(selectUserInfo);
  const email = data?.email;

  const dispatch = useAppDispatch();

  const handleLogOut = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };

  if (isPageLogin) {
    return null;
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">{favouriteCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <button
                className="header__nav-link header__nav-link--profile"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  font: 'inherit',
                  color: 'inherit',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onClick={handleLogOut}
              >
                <span className="header__signout">Sign out</span>
              </button>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
