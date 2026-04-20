import CurrentOffers from '@/components/current-offers';
import Layout from '@/components/layout';
import MainTabs from '@/components/main-tabs';
import Spinner from '@/components/spinner/spinner';
import { AppRoute, CITIES_LIST, DEFAULT_CITY } from '@/const';
import { useAppSelector, useDocumentTitle } from '@/hooks/store-hooks';
import {
  selectOffersByCity,
  selectOffersStatus,
} from '@/store/slices/offers-slice';
import { CityName } from '@/types/offer';
import classNames from 'classnames';
import { Navigate, useParams } from 'react-router-dom';
import ErrorPage from '../error-page/error-page';
import { useMemo } from 'react';

export default function MainPage(): JSX.Element {
  const { city } = useParams<{ city: CityName }>();

  useDocumentTitle('Main page');

  const currentCity = useMemo(() => city || DEFAULT_CITY, [city]);

  const { isLoading, isError } = useAppSelector(selectOffersStatus);
  const currentOffers = useAppSelector((state) =>
    selectOffersByCity(state, currentCity),
  );

  if (city?.toLowerCase && !CITIES_LIST.includes(city)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

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
