import CitiesMap from '../../components/cities-map';
import LocationContainer from '../../components/location-container';
import PlaceCard from '../../components/place-card';

type MainPageProp = {
  cityOffersNumber: number;
  defaultCity: string;
  cities: string[];
  offers: {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
        name: string;
        location: {
            latitude: number;
            longitude: number;
            zoom: number;
        };
    };
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
  }[];
}

export default function MainPage({cityOffersNumber, defaultCity, cities, offers}: MainPageProp): JSX.Element {
  const placeCards = offers.map((offer) => <PlaceCard offer={offer} key={offer.id}/>);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationContainer cities={cities} defaultCity={defaultCity}/>
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
              {placeCards}
            </div>
          </section>
          <CitiesMap/>
        </div>
      </div>
    </main>
  );
}
