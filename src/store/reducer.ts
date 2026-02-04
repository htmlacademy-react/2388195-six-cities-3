import {createReducer} from '@reduxjs/toolkit';
import {setCity} from './action';
import { LIST_OFFERS } from '../mocks/list-offers';
import { CITIES, TCityName } from '../const';
import { TListOffers } from '../types';

// interface OffersState {
//   city: TCity;
//   offers: TListOffers;
// } Интерфейсы поддерживают декларативное слияние, а псевдонимы типов нет.
// Объявив два или более интерфейса с одинаковыми идентификаторами (именами), мы получим один общий интерфейс

type TOffersState = {
  city: TCityName;
  offers: TListOffers;
}

const initialState: TOffersState = {
  city: CITIES[3].name,
  offers: LIST_OFFERS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
