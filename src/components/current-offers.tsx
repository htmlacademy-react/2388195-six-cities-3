import {useState } from 'react';
import { TListOffers, TListOffer, Nullable} from '../types';
import PlaceCard from './place-card';
import CitiesMap from './cities-map/cities-map';
import { TCityName } from '../const';

type ListCardsProp = {
  currentOffers: TListOffers;
  currentCity: TCityName;
}

export default function CurrentOffers({currentOffers, currentCity}: ListCardsProp): JSX.Element {
  const currentOffersNumber = currentOffers.length;

  // Первонач. состояние null (карточки не выделены) если наведен курсор - то TListOffer
  const [activeOffer, setActiveOffer] = useState<Nullable<TListOffer>>(null);
  const handleHover = (currentOffer?: TListOffer) => {
    setActiveOffer(currentOffer || null);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentOffersNumber} place{currentOffersNumber > 1 && 's'} to stay in {currentCity}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                      Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          <div className="cities__places-list places__list tabs__content">
            {
              currentOffers.map((currentOffer) => (
                <PlaceCard
                  currentOffer={currentOffer}
                  key={currentOffer.id}
                  handleHover={handleHover}
                  block="cities"
                />))
            }
          </div>
        </div>
      </section>
      <div className="cities__right-section">
        <CitiesMap className='cities__map' currentOffers={currentOffers} currentCity={currentCity} activeOfferId={activeOffer?.id} />
      </div>
    </div>

  );
}
