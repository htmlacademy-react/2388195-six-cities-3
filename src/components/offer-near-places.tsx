import { TListOffers, TListOffer, Nullable } from '../types';
import PlaceCard from './place-card';
import { useState } from 'react';

type OfferNearPlaces = {
  nearbyOffers: TListOffers;
}

export default function OfferNearPlaces({nearbyOffers}: OfferNearPlaces): JSX.Element {

  if (!nearbyOffers) {
    <p>No offers found</p>;
  }

  const [, setActiveOffer] = useState<Nullable<TListOffer>>(null);
  const handleHover = (listOffer?: TListOffer) => {
    setActiveOffer(listOffer || null);
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearbyOffers.map((nearbyOffer) => (
          <PlaceCard
            listOffer={nearbyOffer}
            key={nearbyOffer.id}
            handleHover={handleHover}
          />
        ))}
      </div>
    </section>
  );
}
