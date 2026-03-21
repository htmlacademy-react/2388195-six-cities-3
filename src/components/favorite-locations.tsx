import { Link } from 'react-router-dom';

import { AppRoute } from '../const';
import PlaceCard from './place-card';
import { FullOffers, CityName } from '../types/offer';

interface FavouriteLocationsProps {
  city: CityName;
  offers: FullOffers;
}

export default function FavouriteLocations({ city, offers }: FavouriteLocationsProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={`${AppRoute.Root}${city.toLowerCase()}`} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard currentOffer={offer} key={offer.id} block="favorites" hovered />
        ))}
      </div>
    </li>
  );
}
