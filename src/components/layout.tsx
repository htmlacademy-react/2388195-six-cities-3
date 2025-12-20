import {NavLink, Outlet, useLocation} from 'react-router-dom';
import { AppRoute } from '../const';
import Header from './header';


const getLayotState = (pathname: AppRoute) => {
  let rootClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;

  if (pathname === AppRoute.Root) {
    rootClassName = ' page--gray page--main';
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  }
  return {rootClassName, linkClassName, shouldRenderUser};
};

export default function Layout() {
  const {pathname} = useLocation();
  const {rootClassName, linkClassName, shouldRenderUser} = getLayotState(pathname as AppRoute);
  return (
    <div className={`page${rootClassName}`}>
      <Header linkClassName = {linkClassName} shouldRenderUser = {shouldRenderUser} favouriteCount={favouriteCount} userName={userName} />
    </div>
  );
}

export default Layout;
