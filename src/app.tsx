import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/store-hooks';
// import Layout from './components/layout/layout';
import ProtectedRoute from './components/private-route';
import { CITIES, AppRoute, DEFAULT_CITY } from './const';
import { useAuth } from './hooks/user-auth-hook';
import FavouritePage from './pages/favourites-page/favourites-page';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import OfferPage from './pages/offer-page/offer-page';
import { getToken } from './services/token';
import { fetchFavorites } from './store/thunk/favorite';
import { fetchAllOffers } from './store/thunk/offers';
import { checkAuth } from './store/thunk/user-auth';
import getRandomCity from './util';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const token = getToken();
  const randomCity = getRandomCity(CITIES);

  useEffect(() => {
    dispatch(fetchAllOffers())
      .unwrap()
      .then(() => {
        console.log('success');
      })
      .catch(() => {
        console.log('error');
      });

    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth, token]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Navigate to={`/${DEFAULT_CITY}`} replace />} />
          {CITIES.map((city) => (
            <Route key={city.id} path={city.id}
            element={<MainPage currentCity={city.name} />} />
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
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage randomCity={randomCity} />} />
          <Route path="*" element={<NotFoundPage randomCity={randomCity} type="page" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//////////////////////////////////////////////////////////////////////////
// все компоненты которые должны быть защищены - обернуты в protect route
// а компоненты, которые должны быть защищены, но быть публичными - теперь с пропом onlyForUnAuth - только для неавторизованнных

//dispatch(fetchAllOffers()) - асинхронный диспатч возвращает промис,
// поэтому мы можем использовать then и catch,
// но нужно использовать метод unwrap() чтобы обработать ошибку
// именно внутри fetchAllOffers()
//метод unwrap() - достает оригинальное состояние промиса then и catch - будут отрабатывать как надо

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
