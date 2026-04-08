import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './components/private-route';
import { CITIES, AppRoute } from './const';
import { useAppDispatch } from './hooks/store-hooks';
import { useAuth } from './hooks/user-auth-hook';
import FavouritePage from './pages/favourites-page/favourites-page';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import OfferPage from './pages/offer-page/offer-page';
import { fetchFavorites } from './store/thunk/favorite';
import { fetchAllOffers } from './store/thunk/offers';
import { checkAuth } from './store/thunk/user-auth';
import getRandomCity from './util';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const randomCity = getRandomCity(CITIES);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchAllOffers())
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${AppRoute.Root}:city`} element={<MainPage />} />
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
          element={<OfferPage randomCity={randomCity} />}
        />
        <Route
          path="*"
          element={<NotFoundPage randomCity={randomCity} type="page" />}
        />
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
