import { Cities, City } from '../types/city';


interface LocationContainerProps {
  currentCity:City;
  cities: Cities;
}

interface LocationContainerItemProps {
  currentCity:City;
  city: City;
}

function LocationContainerItem({city, currentCity}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={city === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '} href="#">
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default function LocationContainer({cities, currentCity}: LocationContainerProps): JSX.Element {
  const locationContainerItems =
    cities.map((city) => <LocationContainerItem city={city} key={city.name} currentCity={currentCity}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationContainerItems}
      </ul>
    </section>
  );
}
