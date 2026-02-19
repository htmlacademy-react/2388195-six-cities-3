import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';
import { Setting, CITIES_LIST, CITIES} from './const';
import randomiseCity from './util';
import { LIST_OFFERS } from './mocks/list-offers';
import { OFFERS } from './mocks/offers';
import { COMMENTS } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      userName={Setting.USER_NAME}
      favouriteCount={Setting.FAVOURITE_COUNT}
      randomCity={randomiseCity(CITIES_LIST)}
      cities={CITIES}
      listOffers={LIST_OFFERS}
      offers={OFFERS}
      comments={COMMENTS}
    />
  </React.StrictMode>
);
