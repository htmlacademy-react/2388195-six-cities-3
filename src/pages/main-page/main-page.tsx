import CitiesMap from '../../components/cities-map';
import ListCards from '../../components/list-cards';
import LocationContainer from '../../components/location-container';
import { TListOffers } from '../../types';

type MainPageProp = {
  cityOffersNumber: number;
  defaultCity: string;
  cities: string[];
  listOffers: TListOffers;
}

export default function MainPage({cityOffersNumber, defaultCity, cities, listOffers}: MainPageProp): JSX.Element {

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationContainer cities={cities} defaultCity={defaultCity} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityOffersNumber} places to stay in {defaultCity}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <ListCards listOffers={listOffers}/>
            </div>
          </section>
          <CitiesMap />
        </div>
      </div>
    </main>
  );
}
