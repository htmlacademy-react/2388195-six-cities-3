type LocationContainerProps = {
  cities: string[];
  defaultCity: string;
}

type LocationContainerItemProps = {
  city: string;
  defaultCity: string;
}

function LocationContainerItem({city, defaultCity}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={city === defaultCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default function LocationContainer({cities, defaultCity}: LocationContainerProps): JSX.Element {
  const locationContainerItems =
    cities.map((city) => <LocationContainerItem city={city} key={city} defaultCity={defaultCity}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationContainerItems}
      </ul>
    </section>
  );
}
