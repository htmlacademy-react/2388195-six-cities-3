import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { AppRoute, CITIES, Setting } from '../const';
import MainPage from './../pages/main-page/main-page';
import FavouritePage from './../pages/favourites-page/favourites-page';
import LoginPage from './../pages/login-page/login-page';
// import OfferPage from './../pages/offer-page/offer-page';
import NotFoundPage from './../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './layout/layout';
import { getAuthorizationStatus } from '../authorizationStatus';
import getRandomCity from '../util';


export default function App(): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  const randomCity = getRandomCity(CITIES);
  const {USER_NAME, FAVOURITE_COUNT} = Setting;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout userName={USER_NAME} favouriteCount={FAVOURITE_COUNT} authorizationStatus={authorizationStatus} />}
        >
          <Route
            index
            element={<Navigate to={`/${CITIES[3].name}`} replace />}
          />
          {CITIES.map((city)=> (
            <Route
              key={city.id}
              path={city.id}
              element={<MainPage currentCity={city.name} />}
            />
          ))}


          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus} isReverse
              >
                <LoginPage randomCity={randomCity} />
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
          {/* <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage randomCity={randomCity} authorizationStatus={authorizationStatus} />}
          /> */}
          <Route
            path="*"
            element={<NotFoundPage randomCity={randomCity} type='page' />}
          />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}
