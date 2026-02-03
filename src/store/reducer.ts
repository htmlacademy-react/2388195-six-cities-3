import {createReducer} from '@reduxjs/toolkit';
import {incrementStep} from './action';
import { LIST_OFFERS } from '../mocks/list-offers';
import { CITIES, TCityName } from '../const';
import { TListOffers } from '../types';

// interface OffersState {
//   city: TCity;
//   offers: TListOffers;
// } Интерфейсы поддерживают декларативное слияние, а псевдонимы типов нет.
// Объявив два или более интерфейса с одинаковыми идентификаторами (именами), мы получим один общий интерфейс

type OffersState = {
  city: TCityName;
  offers: TListOffers;
}

const initialState: OffersState = {
  city: CITIES[3].name,
  offers: LIST_OFFERS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    });
});

export {reducer};
