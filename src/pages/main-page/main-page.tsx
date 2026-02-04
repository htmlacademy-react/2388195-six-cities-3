import { Link } from 'react-router-dom';
import CurrentOffers from '../../components/current-offers';
import { AppRoute, CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCity } from '../../store/action';


export default function MainPage(): JSX.Element {

  const listOffers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);

  const isEmpty: boolean = currentOffers.length === 0;

  return (
    <main className={`page__main, page__main--index, ${isEmpty && 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        {/* <LocationContainer cities={CITIES} currentCity={currentCity} />
         */}
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((city) => (
              <li key={city.name} className="locations__item">
                <Link
                  className={city.name === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '}
                  to={AppRoute.Root}
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(setCity(city.name));
                  }}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CurrentOffers currentOffers={currentOffers} currentCity={currentCity}/>
      </div>
    </main>
  );
}
