import { ListOffers, CityName } from '@/types/offer';
import MainPlaces from './main-places';
import { memo } from 'react';
import MemoizedMainEmpty from './main-empty';
import MemoizedCitiesMap from './cities-map';

interface ListCardsProps {
  currentOffers: ListOffers;
  currentCity: CityName;
  isEmpty: boolean;
}

function CurrentOffers({
  currentOffers,
  currentCity,
  isEmpty,
}: ListCardsProps): JSX.Element {
  return isEmpty ? (
    <MemoizedMainEmpty currentCity={currentCity} />
  ) : (
    <div className="cities__places-container container">
      <MainPlaces currentOffers={currentOffers} currentCity={currentCity} />
      <div className="cities__right-section">
        <MemoizedCitiesMap
          className="cities__map"
          currentOffers={currentOffers}
          currentCity={currentCity}
        />
      </div>
    </div>
  );
}

const MemoizedCurrentOffers = memo(CurrentOffers);
export default MemoizedCurrentOffers;
