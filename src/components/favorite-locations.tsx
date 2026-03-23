import { AppRoute } from "@/const";
import { CityName, FullOffers } from "@/types/offer";
import { Link } from "react-router-dom";
import PlaceCard from "./place-card";

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
          <PlaceCard currentOffer={offer} key={offer.id} cardType="favorites" hovered />
        ))}
      </div>
    </li>
  );
}
