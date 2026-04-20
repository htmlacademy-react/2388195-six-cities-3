import { AppRoute } from '@/const';
import { CityName, FullOffers } from '@/types/offer';
import { Link } from 'react-router-dom';
import MemoizedPlaceCard from './place-card';
import { memo } from 'react';

interface FavouriteLocationsProps {
  city: CityName;
  offers: FullOffers;
}

function FavouriteLocations({
  city,
  offers,
}: FavouriteLocationsProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            to={`${AppRoute.Root}${city.toLowerCase()}`}
            className="locations__item-link"
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <MemoizedPlaceCard
            currentOffer={offer}
            key={offer.id}
            cardType="favorites"
            hovered
          />
        ))}
      </div>
    </li>
  );
}

const MemoizedFavouriteLocations = memo(FavouriteLocations);
export default MemoizedFavouriteLocations;
