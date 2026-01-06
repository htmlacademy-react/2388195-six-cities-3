import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import Footer from '../footer';
import { getLayotState } from './utils';
import { getAuthorizationStatus } from '../../authorizationStatus';
import Logo from '../logo';
import LogoMainPage from '../logo-main-page';

type LayoutProps = {
  userName: string;
  favouriteCount: number;
}

export default function Layout({userName, favouriteCount} : LayoutProps): JSX.Element {
  const {pathname} = useLocation();
  const {rootClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter} = getLayotState(pathname as AppRoute);
  const authorizationStatus = getAuthorizationStatus();

  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {shouldRenderLogoMainPage ?
                <LogoMainPage /> :
                <Logo/>}
            </div>
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">{userName}</span>
                            <span className="header__favorite-count">{favouriteCount}</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth && (
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={AppRoute.Root}>
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter ? (
        <Footer />
      ) : null}
    </div>
  );
}
