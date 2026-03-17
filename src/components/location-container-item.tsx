import { City } from '../types/city';

interface LocationContainerItemProps {
  currentCity:City;
  city: City;
}

export default function LocationContainerItem({city, currentCity}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a className={city === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '} href="#">
        <span>{city.name}</span>
      </a>
    </li>
  );
}
