import { City } from "@/types/offer";
import classNames from "classnames";

interface LocationContainerItemProps {
  currentCity: City;
  city: City;
}

export default function LocationContainerItem({
  city,
  currentCity,
}: LocationContainerItemProps): JSX.Element {
  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link tabs__item',
          city === currentCity && 'locations__item-link tabs__item tabs__item--active'
        )}
        href="#"
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
