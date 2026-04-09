import { ListOffers, CityName } from '@/types/offer';
import CitiesMap from './cities-map';
import MainEmpty from './main-empty';
import MainPlaces from './main-places';

interface ListCardsProps {
  currentOffers: ListOffers;
  currentCity: CityName;
  isEmpty: boolean;
}

export default function CurrentOffers({
  currentOffers,
  currentCity,
  isEmpty,
}: ListCardsProps): JSX.Element {
  return isEmpty ? (
    <MainEmpty currentCity={currentCity} />
  ) : (
    <div className="cities__places-container container">
      <MainPlaces currentOffers={currentOffers} currentCity={currentCity} />
      <div className="cities__right-section">
        <CitiesMap
          className="cities__map"
          currentOffers={currentOffers}
          currentCity={currentCity}
        />
      </div>
    </div>
  );
}
