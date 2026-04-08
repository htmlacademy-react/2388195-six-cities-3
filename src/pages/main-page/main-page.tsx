import CurrentOffers from '@/components/current-offers';
import ErrorPage from '@/components/error-page';
import Layout from '@/components/layout';
import MainTabs from '@/components/main-tabs';
import Spinner from '@/components/spinner/spinner';
import { DEFAULT_CITY } from '@/const';
import { useAppSelector } from '@/hooks/store-hooks';
import { selectOffers, selectOffersStatus } from '@/store/slices/offers-slice';
import { CityName } from '@/types/offer';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

export default function MainPage(): JSX.Element {
  const { city } = useParams<{ city: CityName }>();
  const currentCity = city || DEFAULT_CITY;
  const {isLoading, isError} = useAppSelector(selectOffersStatus);
  const listOffers = useAppSelector(selectOffers);
  const currentOffers = listOffers.filter(
    (listOffer) => listOffer.city.name.toLowerCase() === currentCity,
  );
  const isEmpty = currentOffers.length === 0;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Layout isPageMain>
      <main
        className={classNames('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <MainTabs currentCity={currentCity} />
        <div className="cities">
          <CurrentOffers
            currentOffers={currentOffers}
            currentCity={currentCity}
            isEmpty={isEmpty}
          />
        </div>
      </main>
    </Layout>
  );
}
