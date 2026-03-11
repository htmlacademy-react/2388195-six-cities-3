import { useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../hooks/store-hooks';
import { selectActiveId } from '../store/slices/offers-slice';
import PlaceCard from './place-card';
import CitiesMap from './cities-map/cities-map';
import { SortType, CityName } from '../const';
import SortingOffers from './sorting-offers';
import { getSortedOffers } from '../util';
import { ListOffers } from '../types/offer';

//Переименовать в CardsListProps и файл тоже? привести к одному имени
interface ListCardsProps {
  currentOffers: ListOffers;
  currentCity: CityName;
  isEmpty:boolean;
}

export default function CurrentOffers({currentOffers, currentCity, isEmpty}: ListCardsProps): JSX.Element {
  const currentOffersNumber = currentOffers.length;

  // const dispatch = useAppDispatch();

  const activeOfferId = useAppSelector(selectActiveId);

  // const handleHover = (currentOffer?: ListOffer) => {
  //   dispatch(offersActions.setActiveId(currentOffer ? currentOffer.id : null));
  // };

  const [activeSort, setActiveSort] = useState(SortType.Popular);

  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <div className={classNames('cities__places-container', 'container',{'cities__places-container--empty': isEmpty})}>
      {isEmpty ? (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
          </div>
        </section>
      ) : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{currentOffersNumber} place{currentOffersNumber !== 1 && 's'} to stay in {currentCity}</b>
          <SortingOffers currentSortType={activeSort} onChangeSort={setActiveSort} />
          <div className="cities__places-list places__list tabs__content">
            {
              sortedOffers.map((currentOffer) => (
                <PlaceCard
                  key={currentOffer.id}
                  currentOffer={currentOffer}
                  // handleHover={handleHover} -замена обработчика события на флаг - есть опция наведения или нет
                  block="cities"
                  hovered
                />))
            }
          </div>
        </section>
      )}
      <div className="cities__right-section">
        <CitiesMap className='cities__map' currentOffers={sortedOffers} currentCity={currentCity} activeOfferId={activeOfferId}/>
      </div>
    </div>
  );
}
