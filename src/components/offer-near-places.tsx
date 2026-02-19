import { TListOffers } from '../types';
import PlaceCard from './place-card';

type OfferNearPlaces = {
  nearOffers: TListOffers;
}

export default function OfferNearPlaces({nearOffers}: OfferNearPlaces): JSX.Element {

  if (!nearOffers) {
    <p>No offers found</p>;
  }

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearOffers.map((nearOffer) => (
          <PlaceCard
            currentOffer={nearOffer}
            key={nearOffer.id}
            block="near-places"
          />
        ))}
      </div>
    </section>
  );
}
