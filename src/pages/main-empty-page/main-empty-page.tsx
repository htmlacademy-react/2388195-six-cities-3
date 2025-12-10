import LocationContainer from '../../components/location-container';

type MainEmptyPageProp = {
  defaultCity: string;
  cities: string[];
}

export default function MainEmptyPage({cities, defaultCity}: MainEmptyPageProp): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationContainer cities={cities} defaultCity={defaultCity}/>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  );
}
