import FavouriteLocations from '@/components/favorite-locations';
import { CityName, FullOffer } from '@/types/offer';

interface FavouriteListProps {
  groupedOffers: Record<
    'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf',
    FullOffer[]
  >;
}
export default function FavouriteList({ groupedOffers }: FavouriteListProps): JSX.Element {
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(groupedOffers).map(([cityName, offers]) => (
          <FavouriteLocations city={cityName as CityName} key={cityName} offers={offers} />
        ))}
      </ul>
    </section>
  );
}
