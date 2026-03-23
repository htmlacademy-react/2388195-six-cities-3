import { CITIES } from '@/const';
import { CityName } from '@/types/offer';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface MainTabsProps {
  currentCity: CityName;
}

export default function MainTabs({ currentCity }: MainTabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map(({ name, id }) => (
            <li key={name} className="locations__item">
              <NavLink
                className={classNames(
                  'locations__item-link tabs__item',
                  name === currentCity && 'tabs__item--active',
                )}
                to={`/${id}`}
              >
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
