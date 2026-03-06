import { AppRoute } from '../../const';


export const getLayotState = (pathname: AppRoute) => {
  let pageClassName = '';
  let shouldRenderLogoMainPage = false;
  let shouldRenderUser = true;
  let shouldRenderFooter = false;

  if (pathname === AppRoute.Root) {
    pageClassName = ' page--gray page--main';
    shouldRenderLogoMainPage = true;
  } else if (pathname === AppRoute.Login) {
    pageClassName = ' page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }
  return {pageClassName, shouldRenderLogoMainPage, shouldRenderUser, shouldRenderFooter};
};
