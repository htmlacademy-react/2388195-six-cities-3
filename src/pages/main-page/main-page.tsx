import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import CurrentOffers from '../../components/current-offers';
import { CITIES, TCityName } from '../../const';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectOffers } from '../../store/slices/offers-slice';

type MainPageProps = {
  currentCity: TCityName;
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


///////////////////////////////////////////
// import { NavLink } from 'react-router-dom';
// import classNames from 'classnames';
// import CurrentOffers from '../../components/current-offers';
// import { AppRoute, CITIES, TCityName } from '../../const';
// import { useAppDispatch, useAppSelector } from '../../hooks/store';
// import { offersActions, offersSelectors } from '../../store/slices/offers';
// // import {useActionCreators} from '../../hooks/store';

// type MainPageProps = {
//   currentCity: TCityName;
// }

// export default function MainPage({currentCity}: MainPageProps): JSX.Element {

//   const listOffers = useAppSelector(offersSelectors.offers);
//   const dispatch = useAppDispatch();
//   // const {setCity}  = useActionCreators(offersActions);
//   // setCity(city.name) вместо dispatch(offersActions.setCity(city.name));
//   const currentOffers = listOffers.filter((listOffer) => listOffer.city.name === currentCity);
//   // const offersByCity = Object.groupBy(listOffers, (listOffer) => listOffer.city.name);
//   // const currentOffers = offersByCity[city] ?? [];

//   const isEmpty: boolean = currentOffers.length === 0;

//   // <main className={`page__main, page__main--index, ${isEmpty && 'page__main--index-empty'}`}></main>
//   return (
//     <main className={classNames('page__main', 'page__main--index', {'page__main--index-empty' : isEmpty})}>
//       <h1 className="visually-hidden">Cities</h1>
//       <div className="tabs">
//         {/* <LocationContainer cities={CITIES} currentCity={currentCity} />
//          */}
//         <section className="locations container">
//           <ul className="locations__list tabs__list">
//             {CITIES.map((city) => (
//               <li key={city.name} className="locations__item">
//                 <NavLink
//                   className={city.name === currentCity ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item '}
//                   to={AppRoute.Root}
//                   onClick={(evt) => {
//                     evt.preventDefault();
//                     dispatch(offersActions.setCity(city.name));
//                   }}
//                 >
//                   <span>{city.name}</span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//       <div className="cities">
//         <CurrentOffers currentOffers={currentOffers} currentCity={currentCity}/>
//       </div>
//     </main>
//   );
// }
