import {CITIES} from '../const';

type LocationContainerItemProps = {
  city: string;
}

function LocationContainerItem({city}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default function LocationContainer(): JSX.Element {
  const locationContainerItems =
    CITIES.map((city) => <LocationContainerItem city={city} key={city}/>);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationContainerItems}
      </ul>
    </section>
  );
}


/*<a className="locations__item-link tabs__item ${city === {defaultCity} : tabs__item--active" ? " href="#"}>*/
/* <li className="locations__item">
          <a className="locations__item-link tabs__item tabs__item--active">
            <span>Amsterdam</span>
          </a>
        </li> */
