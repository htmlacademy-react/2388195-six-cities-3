import FavouriteLocations from '../../components/favorite-locations';
import { OFFERS } from '../../mocks/offers';
// import { selectFavoriteOffers } from '../../store/slices/favorite-slice';
// import { FavoriteOffers, FavoriteOffer } from '../../types/favorite';
import { CityName } from '../../const';
import { FullOffer, FullOffers } from '../../types/offer';


export default function FavouritePage(): JSX.Element {
  // const favoriteOffers = useAppSelector(selectFavoriteOffers);
  const favoriteOffers = OFFERS;
  if (favoriteOffers.length === 0) {
    return <p>Ничего нет</p>;
  }

  // const groupedOffers = Object.groupBy(listOffers, (listOffer) => listOffer.city.name) as Partial<Record<CityName, ListOffers>>;
  // const currentOffers: ListOffers = groupedOffers[currentCity] || [];
  //TS ругается версия TypeScript ниже 5.4+

  const groupByCity = (offers: FullOffers): Record<CityName, FullOffer[]> =>
    offers.reduce((acc: Record<string, FullOffer[]>, favoriteOffer: FullOffer) => {
      const cityName = favoriteOffer.city.name;

      if (!acc[cityName]) {
        acc[cityName] = [];
      }

      acc[cityName].push(favoriteOffer);
      return acc;
    }, {});


  const groupedOffers = groupByCity(favoriteOffers);
  console.log(groupedOffers);


  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.entries(groupedOffers).map(([cityName, offers]) => (
              <FavouriteLocations
                city={cityName as CityName}
                key={cityName}
                offers={offers}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
