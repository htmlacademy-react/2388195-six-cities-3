import CurrentOffers from '../../components/current-offers';
import LocationContainer from '../../components/location-container';
import { TListOffers } from '../../types';

type MainPageProp = {
  defaultCity:string;
  cities: string[];
  listOffers: TListOffers;
}

export default function MainPage({ defaultCity, cities, listOffers}: MainPageProp): JSX.Element {
  const currentCity = defaultCity;
  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);

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
