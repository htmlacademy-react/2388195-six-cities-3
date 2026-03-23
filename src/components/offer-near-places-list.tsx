import { ListOffers } from '@/types/offer';
import PlaceCard from './place-card';

interface OfferNearPlacesListProps {
  nearOffers: ListOffers;
}

export default function OfferNearPlacesList({ nearOffers }: OfferNearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {nearOffers.map((nearOffer) => (
        <PlaceCard currentOffer={nearOffer} key={nearOffer.id} cardType="near-places" />
      ))}
    </div>
  );
}
