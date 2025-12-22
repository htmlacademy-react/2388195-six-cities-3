import { AppRoute } from '../../const';


export const getLayotState = (pathname: AppRoute) => {
  let rootClassName = '';
  let shouldRenderLogoMainPage = false;
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Root) {
    rootClassName = ' page--gray page--main';
    shouldRenderLogoMainPage = true;
  } else if (pathname === AppRoute.Login) {
    rootClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }
  return {rootClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter};
};
