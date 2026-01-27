type LocationContainerProps = {
  currentCity:string;
  cities: string[];
}

type LocationContainerItemProps = {
  currentCity:string;
  city: string;
}

function LocationContainerItem({city, currentCity}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={city === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default function LocationContainer({cities, currentCity}: LocationContainerProps): JSX.Element {
  const locationContainerItems =
    cities.map((city) => <LocationContainerItem city={city} key={city} currentCity={currentCity}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationContainerItems}
      </ul>
    </section>
  );
}
