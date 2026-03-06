import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import Footer from '../footer';
import { getLayotState } from './utils';
import Logo from '../logo';
import LogoMainPage from '../logo-main-page';
import { useAuth } from '../../hooks/user-auth-hook';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectUserInfo } from '../../store/slices/user-slice';

interface LayoutProps {
  favouriteCount: number;
}

export default function Layout({favouriteCount} : LayoutProps): JSX.Element {
  const {pathname} = useLocation();
  const {pageClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter} = getLayotState(pathname as AppRoute);

  const isAuth = useAuth();
  const data = useAppSelector(selectUserInfo);
  const email = data?.email;


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
              shouldRenderUser && (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {isAuth &&
                          <>
                            <span className="header__user-name user__name">{email}</span>
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



//   return (
//     <div className={`page${pageClassName}`}>
//       <header className="header">
//         <div className="container">
//           <div className="header__wrapper">
//             <div className="header__left">
//               {shouldRenderLogoMainPage && <LogoMainPage />}
//               {!shouldRenderLogoMainPage && <Logo/>}
//             </div>
//             {
//               shouldRenderUser && (
//                 <nav className="header__nav">
//                   <ul className="header__nav-list">
//                     <li className="header__nav-item user">
//                       <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
//                         <div className="header__avatar-wrapper user__avatar-wrapper">
//                         </div>
//                         {isAuth &&
//                           <>
//                             <span className="header__user-name user__name">{email}</span>
//                             <span className="header__favorite-count">{favouriteCount}</span>
//                           </>}
//                       </Link>
//                       {!isAuth &&
//                         <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
//                           <span className="header__login">Sign in</span>
//                         </Link>}
//                     </li>
//                     {isAuth &&
//                       <li className="header__nav-item">
//                         <Link className="header__nav-link" to={AppRoute.Root}>
//                           <span className="header__signout">Sign out</span>
//                         </Link>
//                       </li>}
//                   </ul>
//                 </nav>
//               )
//             }
//           </div>
//         </div>
//       </header>
//       <Outlet />
//       {shouldRenderFooter && <Footer />}
//     </div>
//   );
// }
