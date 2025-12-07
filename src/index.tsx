import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/components/app';
import {Setting, CITIES, OFFERS} from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App userName={Setting.USER_NAME} favouriteCount={Setting.FAVOURITE_COUNT} defaultCity={Setting.DEFAULT_CITY} cities={CITIES} offers={OFFERS}/>
  </React.StrictMode>
);
