import { ListOffers } from '@/types/offer';
import MemoizedPlaceCard from './place-card';

interface OfferNearPlacesListProps {
  nearOffers: ListOffers;
}

export default function OfferNearPlacesList({
  nearOffers,
}: OfferNearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {nearOffers.map((nearOffer) => (
        <MemoizedPlaceCard
          currentOffer={nearOffer}
          key={nearOffer.id}
          cardType="near-places"
        />
      ))}
    </div>
  );
}
