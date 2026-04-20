import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProtectedRoute from './components/private-route';
import { AppRoute, DEFAULT_CITY } from './const';
import { useAppDispatch } from './hooks/store-hooks';
import { useAuth } from './hooks/user-auth-hook';
import FavouritePage from './pages/favourites-page/favourites-page';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import MemoizedNotFoundPage from './pages/not-found-page/not-found-page';
import OfferPage from './pages/offer-page/offer-page';
import { fetchFavorites } from './store/thunk/favorite';
import { fetchAllOffers } from './store/thunk/offers';
import { checkAuth } from './store/thunk/user-auth';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchAllOffers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Navigate
              to={`${AppRoute.Root}${DEFAULT_CITY.toLowerCase()}`}
              replace
            />
          }
        />
        <Route path={`${AppRoute.Root}:city`} element={<MainPage />} />
        <Route
          path={AppRoute.Login}
          element={
            <ProtectedRoute onlyUnauth>
              <LoginPage />
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
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
        <Route path={AppRoute.NotFound} element={<MemoizedNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
