import {useState } from 'react';
import { TListOffers, TListOffer } from '../types';
import PlaceCard from './place-card';

type ListCardsProp = {
  listOffers: TListOffers;
}

type Nullable<T> = T | null;

export default function ListCards({listOffers}: ListCardsProp): JSX.Element {
  // Первонач. состояние null (карточки не выделены) если наведен курсор - то TListOffer
  const [, setActiveOffer] = useState<Nullable<TListOffer>>(null);
  const handleHover = (listOffer?: TListOffer) => {
    setActiveOffer(listOffer || null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        listOffers.map((listOffer) => (
          <PlaceCard
            listOffer={listOffer}
            key={listOffer.id}
            handleHover={handleHover}
          />))
      }
    </div>
  );
}
