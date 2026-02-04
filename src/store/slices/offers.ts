import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, TCityName } from '../../const';
import { TListOffer } from '../../types';
import { LIST_OFFERS } from '../../mocks/list-offers';

// interface OffersState {
//   city: TCity;
//   offers: TListOffers;
// } Интерфейсы поддерживают декларативное слияние, а псевдонимы типов нет.
// Объявив два или более интерфейса с одинаковыми идентификаторами (именами), мы получим один общий интерфейс

type TOffersState = {
  city: TCityName;
  offers: TListOffer[];
}

const initialState: TOffersState = {
  city: CITIES[3].name,
  offers: LIST_OFFERS,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    // Автоматически создается экшен 'offers/setCity'
    setCity: (state, action: PayloadAction<TCityName>) => {
      // Immer позволяет "мутировать" состояние напрямую
      state.city = action.payload;
    },
  },
  selectors: {
    city: (state: TOffersState) => state.city,
    offers: (state: TOffersState) => state.offers,
  }
});

export const offersActions = offersSlice.actions;
export const offersSelectors = offersSlice.selectors;
