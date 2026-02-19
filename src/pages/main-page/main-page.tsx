import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import CurrentOffers from '../../components/current-offers';
import { CITIES, CityName } from '../../const';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectOffers } from '../../store/slices/offers-slice';

interface MainPageProps {
  currentCity: CityName;
}

export default function MainPage({currentCity}: MainPageProps): JSX.Element {

  const listOffers = useAppSelector(selectOffers);
  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);
  const isEmpty: boolean = currentOffers.length === 0;

  return (
    <main className={classNames('page__main', 'page__main--index', {'page__main--index-empty' : isEmpty})}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map(({name, id}) => (
              <li key={name} className="locations__item">
                <NavLink
                  className={name === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '}
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
        <CurrentOffers currentOffers={currentOffers} currentCity={currentCity} isEmpty={isEmpty}/>
      </div>
    </main>
  );
}
