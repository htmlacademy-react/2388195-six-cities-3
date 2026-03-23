import { SortType } from '@/const';
import { ListOffers, CityName } from '@/types/offer';
import { getSortedOffers } from '@/util';
import classNames from 'classnames';
import { useState } from 'react';
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
  const [activeSort] = useState(SortType.Popular);
  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <div
      className={classNames('cities__places-container', 'container', {
        'cities__places-container--empty': isEmpty,
      })}
    >
      {isEmpty ? (
        <MainEmpty currentCity={currentCity} />
      ) : (
        <MainPlaces currentOffers={currentOffers} currentCity={currentCity} />
      )}
      <div className="cities__right-section">
        <CitiesMap className="cities__map" currentOffers={sortedOffers} currentCity={currentCity} />
      </div>
    </div>
  );
}
