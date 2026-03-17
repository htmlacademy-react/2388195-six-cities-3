import { Outlet, useLocation, Link } from 'react-router-dom';

import { getLayotState } from './utils';
import { useAuth } from '../../hooks/user-auth-hook';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { selectUserInfo } from '../../store/slices/user-slice';
import { logout } from '../../store/thunk/user-auth';
import { AppRoute, RequestStatus } from '../../const';
import LogoMainPage from './logo-main-page';
import Logo from './logo';
import Footer from './footer';
import { selectStatus } from '../../store/slices/offers-slice';

interface LayoutProps {
  favouriteCount: number;
}

export default function Layout({favouriteCount} : LayoutProps): JSX.Element | null {
  const {pathname} = useLocation();
  const {pageClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter} = getLayotState(pathname as AppRoute);

  const isAuth = useAuth();
  const data = useAppSelector(selectUserInfo);
  const status = useAppSelector(selectStatus);
  const email = data?.email;

  const dispatch = useAppDispatch();

  const handleLogOut = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };

  if (status === RequestStatus.Loading) {
    return <Outlet />;
  }

  return (
    <div className={`page${pageClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {shouldRenderLogoMainPage && <LogoMainPage />}
              {!shouldRenderLogoMainPage && <Logo/>}
            </div>
            {
              shouldRenderUser && isAuth && (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
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
                          display: 'inline-block'
                        }}
                        onClick={handleLogOut}
                      >
                        <span className="header__signout">Sign out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              )
            }
            {
              shouldRenderUser && !isAuth && (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link" to={AppRoute.Login}>
                        <span className="header__login">Sign in</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )
            }
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter && <Footer />}
    </div>
  );
}
