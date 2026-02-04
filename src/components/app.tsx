import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import MainPage from './../pages/main-page/main-page';
import FavouritePage from './../pages/favourites-page/favourites-page';
import LoginPage from './../pages/login-page/login-page';
import OfferPage from './../pages/offer-page/offer-page';
import NotFoundPage from './../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import { getAuthorizationStatus } from '../authorizationStatus';


export default function App(): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout authorizationStatus={authorizationStatus} />}
        >
          <Route
            index
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus} isReverse
              >
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavouritePage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage type='page' />}
          />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}
