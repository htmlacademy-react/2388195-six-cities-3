import CurrentOffers from '../../components/current-offers';
import LocationContainer from '../../components/location-container';
import { TCity, TListOffers } from '../../types';

type MainPageProp = {
  cities: TCity[];
  listOffers: TListOffers;
}

export default function MainPage({ cities, listOffers}: MainPageProp): JSX.Element {
  const currentCity = cities[3];
  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity.name);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationContainer cities={cities} currentCity={currentCity} />
      </div>
      <div className="cities">
        <CurrentOffers currentOffers={currentOffers} currentCity={currentCity}/>
      </div>
    </main>
  );
}
