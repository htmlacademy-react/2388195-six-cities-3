import Layout from '@/components/layout';
import Logo from '@/components/logo';
import { useAppSelector } from '@/hooks/store-hooks';
import { selectFavoriteOffers } from '@/store/slices/favorite-slice';
import { FullOffers, CityName, FullOffer } from '@/types/offer';
import classNames from 'classnames';
import FavouriteList from '../../components/favourites-list';
import FavouriteEmpty from '../../components/favourite-empty';

export default function FavouritePage(): JSX.Element {
  const favoriteOffers = useAppSelector(selectFavoriteOffers);

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

  return (
    <Layout>
      <main
        className={classNames(
          'page__main',
          'page__main--favorites',
          favoriteOffers.length === 0 && 'page__main--favorites-empty',
        )}
      >
        <div className="page__favorites-container container">
          {favoriteOffers.length === 0 ? (
            <FavouriteEmpty />
          ) : (
            <FavouriteList groupedOffers={groupedOffers} />
          )}
        </div>
      </main>
      <footer className="footer">
        <Logo type="footer" />
      </footer>
    </Layout>
  );
}
