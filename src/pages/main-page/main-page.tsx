import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import CurrentOffers from '../../components/current-offers';
import { CITIES, RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectOffers, selectStatus } from '../../store/slices/offers-slice';
import Spinner from '../../components/spinner/spinner';
import { CityName } from '../../types/offer';

interface MainPageProps {
  currentCity: CityName;
}

export default function MainPage({ currentCity }: MainPageProps): JSX.Element {
  const status = useAppSelector(selectStatus);
  const listOffers = useAppSelector(selectOffers);

  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);

  const isEmpty = currentOffers.length === 0;

  if (status === RequestStatus.Loading || isEmpty) {
    return <Spinner />;
  }

  return (
    <main
      className={classNames('page__main', 'page__main--index', {
        'page__main--index-empty': isEmpty,
      })}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map(({ name, id }) => (
              <li key={name} className="locations__item">
                <NavLink
                  className={
                    name === currentCity
                      ? 'locations__item-link tabs__item tabs__item--active'
                      : 'locations__item-link tabs__item '
                  }
                  to={`/${id}`}
                >
                  <span>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CurrentOffers currentOffers={currentOffers} currentCity={currentCity} isEmpty={isEmpty} />
      </div>
    </main>
  );
}

///////////////////////////////////////////////////////////////////
// const groupedOffers = Object.groupBy(listOffers, (listOffer) => listOffer.city.name) as Partial<Record<CityName, ListOffers>>;
// const currentOffers: ListOffers = groupedOffers[currentCity] || [];
//TS ругается версия TypeScript ниже 5.4+
