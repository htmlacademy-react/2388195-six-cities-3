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
import {TCity, TComments, TListOffers, TOffers } from '../types';

type AppScreenProps = {
  userName: string;
  favouriteCount: number;
  randomCity: string;
  cities: TCity[];
  listOffers: TListOffers;
  offers: TOffers;
  nearbyOffers: TListOffers;
  comments: TComments;
}

export default function App({userName, favouriteCount, randomCity, cities, listOffers, offers, nearbyOffers, comments}: AppScreenProps): JSX.Element {

  const authorizationStatus = getAuthorizationStatus();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout authorizationStatus={authorizationStatus} favouriteCount={favouriteCount} userName={userName} />}
        >
          <Route
            index
            element={<MainPage cities={cities} listOffers={listOffers} />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus} isReverse
              >
                <LoginPage randomCity={randomCity}/>
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
            element={<OfferPage offers={offers} authorizationStatus={authorizationStatus} nearbyOffers={nearbyOffers} randomCity={randomCity} comments={comments}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage type='page' randomCity={randomCity}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}
