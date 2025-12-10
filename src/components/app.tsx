import MainPage from './../pages/main-page/main-page';
import Header from './header';

type AppScreenProps = {
  userName: string;
  favouriteCount: number;
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

export default function App({userName, favouriteCount, defaultCity, cities, offers}: AppScreenProps): JSX.Element {
  const cityOffers = offers.filter((offer) => offer.city.name === defaultCity);
  const cityOffersNumber = cityOffers.length;
  return (
    <div className="page page--gray page--main">
      <Header favouriteCount={favouriteCount} userName={userName} />
      <MainPage cityOffersNumber={cityOffersNumber} defaultCity={defaultCity} cities={cities} offers={cityOffers}/>
    </div>
  );
}
