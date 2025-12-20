import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import MainPage from './../pages/main-page/main-page';
import FavouritePage from './../pages/favourites-page/favourites-page';
import LoginPage from './../pages/login-page/login-page';
import OfferPage from './../pages/offer-page/offer-page';
import NotFoundPage from './../pages/not-found-page/not-found-page';
import PrivateRoute from './private-route';
import Layout from './Layout';

type AppScreenProps = {
  userName: string;
  favouriteCount: number;
  randomCity: string;
  defaultCity: string;
  cities: string[];
  offers: {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
  }[];
}

export default function App({userName, favouriteCount, randomCity, defaultCity, cities, offers}: AppScreenProps): JSX.Element {
  const cityOffers = offers.filter((offer) => offer.city.name === defaultCity);
  const cityOffersNumber = cityOffers.length;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout />}
        >
          <Route
            index
            element={<MainPage favouriteCount={favouriteCount} userName={userName} cityOffersNumber={cityOffersNumber} defaultCity={defaultCity} cities={cities} offers={cityOffers} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage favouriteCount = {0} userName = {''} randomCity={randomCity}/>}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavouritePage favouriteCount={favouriteCount} userName={userName} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage favouriteCount={favouriteCount} userName={userName}/>}
          />
          <Route
            path="*"
            element={<NotFoundPage favouriteCount = {0} userName = {''} randomCity={randomCity}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>


  );
}
