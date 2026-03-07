import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { fetchAllOffers } from '../store/thunk/offers';
import { AppRoute, CITIES, Setting } from '../const';
import MainPage from './../pages/main-page/main-page';
import FavouritePage from './../pages/favourites-page/favourites-page';
import LoginPage from './../pages/login-page/login-page';
import NotFoundPage from './../pages/not-found-page/not-found-page';
import Layout from './layout/layout';
import getRandomCity from '../util';
import OfferPage from '../pages/offer-page/offer-page';
import { checkAuth } from '../store/thunk/user-auth';
import { getToken } from '../services/token';
import ProtectedRoute from './private-route';


export default function App(): JSX.Element {
  const randomCity = getRandomCity(CITIES);
  const {FAVOURITE_COUNT} = Setting;

  const dispatch = useAppDispatch();

  //dispatch(fetchAllOffers()) - асинхронный диспатч возвращает промис,
  // поэтому мы можем использовать then и catch,
  // но нужно использовать метод unwrap() чтобы обработать ошибку
  // именно внутри fetchAllOffers()
  //метод unwrap() - достает оригинальное состояние промиса then и catch - будут отрабатывать как надо


  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchAllOffers())
      .unwrap()
      .then(() => {
        console.log('success');
      })
      .catch(()=> {
        console.log('error');
      });
  }, [dispatch]);

  //   const { fetchAllOffers } = useActionCreators(offersActions);
  //   useEffect(() => {
  //     fetchAllOffers()
  //       .unwrap()
  //       .then(() => {
  //         console.log('success');
  //       })
  //       .catch(()=> {
  //         console.log('error');
  //       });
  //   }, [fetchAllOffers]);
  // //зависимость [fetchAllOffers] в useEffect исправляет бесконечный цикл запросов


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout favouriteCount={FAVOURITE_COUNT} />}
        >
          <Route
            index
            element={<Navigate to={`/${Setting.DEFAULT_CITY}`} replace />}
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
              <ProtectedRoute onlyUnauth>
                <LoginPage randomCity={randomCity} />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute>
                <FavouritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferPage randomCity={randomCity} />
            }
          />
          <Route
            path="*"
            element={<NotFoundPage randomCity={randomCity} type='page' />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// все компоненты которые должны быть защищены - обернуты в protect route
// а компоненты, которые должны быть защищены, но быть публичными - теперь с пропом onlyForUnAuth - только для неавторизованнных
