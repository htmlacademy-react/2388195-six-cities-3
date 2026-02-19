import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks/store-hooks';
import { offersActions, selectActiveId } from '../store/slices/offers-slice';
import { ListOffers, ListOffer} from '../types';
import PlaceCard from './place-card';
import CitiesMap from './cities-map/cities-map';
import { SortType, CityName } from '../const';
import SortingOffers from './sorting-offers';
import { getSortedOffers } from '../util';

type ListCardsProp = {
  currentOffers: ListOffers;
  currentCity: CityName;
  isEmpty:boolean;
}

export default function CurrentOffers({currentOffers, currentCity, isEmpty}: ListCardsProp): JSX.Element {
  const currentOffersNumber = currentOffers.length;

  // // Первонач. состояние null (карточки не выделены) если наведен курсор - то ListOffer
  // const [activeOffer, setActiveOffer] = useState<Nullable<ListOffer>>(null);
  // const handleHover = (currentOffer?: ListOffer) => {
  //   setActiveOffer(currentOffer || null);
  // };

  const dispatch = useAppDispatch();

  // Получаем активный ID из стора
  const activeOfferId = useAppSelector(selectActiveId);

  // Обработчик теперь отправляет action в стор
  const handleHover = (currentOffer?: ListOffer) => {
    dispatch(offersActions.setActiveId(currentOffer ? currentOffer.id : null));
  };

  const [activeSort, setActiveSort] = useState(SortType.Popular);

  const sortedOffers = getSortedOffers(currentOffers, activeSort);

  return (
    <div className={classNames('cities__places-container', 'container',{'cities__places-container--empty': isEmpty})}>
      {isEmpty ? (
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
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
                  currentOffer={currentOffer}
                  key={currentOffer.id}
                  handleHover={handleHover}
                  block="cities"
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


////////////////////////////////////////
// // import {MouseEvent, useState} from 'react';
// import { useState } from 'react';
// import classNames from 'classnames';
// import { ListOffers, ListOffer, Nullable} from '../types';
// import PlaceCard from './place-card';
// import CitiesMap from './cities-map/cities-map';
// import { CityName } from '../const';
// import { useAppDispatch } from '../hooks/store-hooks';
// import { useAppDispatch } from '../hooks/store-hooks';
// import { offersActions } from '../store/slices/offers-slice';


// type ListCardsProp = {
//   currentOffers: ListOffers;
//   currentCity: CityName;
//   isEmpty:boolean;
// }

// export default function CurrentOffers({currentOffers, currentCity, isEmpty}: ListCardsProp): JSX.Element {
//   const currentOffersNumber = currentOffers.length;
//     const dispatch = useAppDispatch();
// const handleSetActive = (id: string) => {
//   dispatch(offersActions.setActiveId(id));
// };
//   // Первонач. состояние null (карточки не выделены) если наведен курсор - то ListOffer
//   const [activeOffer, setActiveOffer] = useState<Nullable<ListOffer>>(null);
//   const handleHover = (currentOffer?: ListOffer) => {
//     setActiveOffer(currentOffer || null);
//   };

//   return (
//     <div className={classNames('cities__places-container', 'container',{'cities__places-container--empty': isEmpty})}>
//       <section className="cities__places places">
//         <h2 className="visually-hidden">Places</h2>
//         <b className="places__found">{currentOffersNumber} place{currentOffersNumber !== 1 && 's'} to stay in {currentCity}</b>
//         <form className="places__sorting" action="#" method="get">
//           <span className="places__sorting-caption">Sort by</span>
//           <span className="places__sorting-type" tabIndex={0}>
//                       Popular
//             <svg className="places__sorting-arrow" width="7" height="4">
//               <use xlinkHref="#icon-arrow-select"></use>
//             </svg>
//           </span>
//           <ul className="places__options places__options--custom places__options--opened">
//             <li className="places__option places__option--active" tabIndex={0}>Popular</li>
//             <li className="places__option" tabIndex={0}>Price: low to high</li>
//             <li className="places__option" tabIndex={0}>Price: high to low</li>
//             <li className="places__option" tabIndex={0}>Top rated first</li>
//           </ul>
//         </form>
//         <div className="cities__places-list places__list tabs__content">
//           <div className="cities__places-list places__list tabs__content">
//             {
//               currentOffers.map((currentOffer) => (
//                 <PlaceCard
//                   currentOffer={currentOffer}
//                   key={currentOffer.id}
//                   handleHover={handleHover}
//                   block="cities"
//                 />))
//             }
//           </div>
//         </div>
//       </section>
//       <div className="cities__right-section">
//         <CitiesMap className='cities__map' currentOffers={currentOffers} currentCity={currentCity} activeOfferId={activeOffer?.id}/>
//       </div>
//     </div>
//   );
// }
