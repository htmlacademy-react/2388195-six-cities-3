import { ListOffers } from '@/types/offer';
import OfferNearPlacesList from './offer-near-places-list';

interface OfferNearPlacesProps {
  nearOffers: ListOffers;
}

export default function OfferNearPlaces({ nearOffers }: OfferNearPlacesProps): JSX.Element {
  if (nearOffers.length === 0) {
    return (
      <section className="near-places places">
        <h2 className="near-places__title">No offers found</h2>
      </section>
    );
  }

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <OfferNearPlacesList nearOffers={nearOffers} />
    </section>
  );
}
