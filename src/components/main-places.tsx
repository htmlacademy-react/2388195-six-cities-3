import { SortType } from '@/const';
import { ListOffers, CityName } from '@/types/offer';
import { formattedType, getSortedOffers } from '@/util';
import PlaceCard from './place-card';
import SortingOffers from './sorting-offers';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { offersActions, selectActiveSort } from '@/store/slices/offers-slice';

interface MainPlacesProps {
  currentOffers: ListOffers;
  currentCity: CityName;
}

export default function MainPlaces({
  currentOffers,
  currentCity,
}: MainPlacesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSort = useAppSelector(selectActiveSort);
  const formattedOffersNumber = (count: number): string =>
    `${count} place${count !== 1 ? 's' : ''}`;

  const setSort = (type: SortType) => {
    dispatch(offersActions.setActiveSort(type));
  };

  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {formattedOffersNumber(currentOffers.length)} to stay in{' '}
        {formattedType(currentCity)}
      </b>
      <SortingOffers currentSortType={activeSort} onChangeSort={setSort} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((currentOffer) => (
          <PlaceCard
            key={currentOffer.id}
            currentOffer={currentOffer}
            cardType="cities"
            hovered
          />
        ))}
      </div>
    </section>
  );
}
