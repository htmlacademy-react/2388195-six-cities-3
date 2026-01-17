import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import Footer from '../footer';
import { getLayotState } from './utils';
import Logo from '../logo';
import LogoMainPage from '../logo-main-page';

type TLayoutProps = {
  userName: string;
  favouriteCount: number;
  authorizationStatus: AuthorizationStatus;
}

export default function Layout({userName, favouriteCount, authorizationStatus} : TLayoutProps): JSX.Element {
  const {pathname} = useLocation();
  const {rootClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter} = getLayotState(pathname as AppRoute);
  const isAuth: boolean = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {shouldRenderLogoMainPage && <LogoMainPage />}
              {!shouldRenderLogoMainPage && <Logo/>}
            </div>
            {
              shouldRenderUser && (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {isAuth &&
                          <>
                            <span className="header__user-name user__name">{userName}</span>
                            <span className="header__favorite-count">{favouriteCount}</span>
                          </>}
                      </Link>
                      {!isAuth &&
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                          <span className="header__login">Sign in</span>
                        </Link>}
                    </li>
                    {isAuth &&
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppRoute.Root}>
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>}
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
