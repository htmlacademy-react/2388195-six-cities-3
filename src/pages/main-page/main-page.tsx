import CurrentOffers from "@/components/current-offers";
import Layout from "@/components/layout";
import MainTabs from "@/components/main-tabs";
import Spinner from "@/components/spinner/spinner";
import { RequestStatus } from "@/const";
import { useAppSelector } from "@/hooks/store-hooks";
import { selectStatus, selectOffers } from "@/store/slices/offers-slice";
import { CityName } from "@/types/offer";
import classNames from "classnames";

interface MainPageProps {
  currentCity: CityName;
}

export default function MainPage({ currentCity }: MainPageProps): JSX.Element {
  const status = useAppSelector(selectStatus);
  const listOffers = useAppSelector(selectOffers);
  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);
  const isEmpty = currentOffers.length === 0;

  if (status === RequestStatus.Loading) {
    return <Spinner />;
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
