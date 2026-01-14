import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';
import { Setting, CITIES} from './const';
import randomiseCity from './util';
import { LIST_OFFERS } from './mocks/list-offers';
import { OFFERS } from './mocks/offers';
import { NEARBY_OFFERS } from './mocks/nearby-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      userName={Setting.USER_NAME}
      favouriteCount={Setting.FAVOURITE_COUNT}
      randomCity={randomiseCity(CITIES)}
      defaultCity={Setting.DEFAULT_CITY}
      cities={CITIES}
      listOffers={LIST_OFFERS}
      offers={OFFERS}
      nearbyOffers={NEARBY_OFFERS}
    />
  </React.StrictMode>
);
