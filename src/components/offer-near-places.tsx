import { ListOffers } from '../types';
import PlaceCard from './place-card';

interface OfferNearPlacesProps {
  nearOffers: ListOffers;
}

export default function OfferNearPlaces({nearOffers}: OfferNearPlacesProps): JSX.Element {

  if (nearOffers.length === 0) {
    return <h2 className="near-places__title">No offers found</h2>;
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
            hovered
          />
        ))}
      </div>
    </section>
  );
}
