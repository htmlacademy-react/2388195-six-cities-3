import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListOffer } from '../../types';
import { LIST_OFFERS } from '../../mocks/list-offers';
import { RootState } from '../../types/store';

type OffersState = {
  activeId: ListOffer['id'] | null;
  offers: ListOffer[];
}

const initialState: OffersState = {
  activeId: null,
  offers: LIST_OFFERS,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<ListOffer['id'] | null>) {
      state.activeId = action.payload;
    },
  },
  selectors: {
    activeId: (state: OffersState): ListOffer['id'] | null => state.activeId,
    offers: (state: OffersState): ListOffer[] => state.offers,
  }
});

export const offersActions = offersSlice.actions;
// export const offersSelectors = offersSlice.selectors;
export const selectActiveId = (state: RootState) => state.offers.activeId;
export const selectOffers = (state: RootState) => state.offers.offers;

/////////////////////////////////////////////////////////
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// // import { CITIES, CityName } from '../../const';
// import { ListOffer } from '../../types';
// import { LIST_OFFERS } from '../../mocks/list-offers';

// // interface OffersState {
// //   city: City;
// //   offers: ListOffers;
// // } Интерфейсы поддерживают декларативное слияние, а псевдонимы типов нет.
// // Объявив два или более интерфейса с одинаковыми идентификаторами (именами), мы получим один общий интерфейс

// type OffersState = {
//   // city: CityName;
//   activeId?: ListOffer['id'];
//   offers: ListOffer[];
// }

// const initialState: OffersState = {
//   // city: CITIES[3].name,
//   activeId: undefined,
//   offers: LIST_OFFERS,
// };

// export const offersSlice = createSlice({
//   name: 'offers',
//   initialState,
//   reducers: {
//     // // Автоматически создается экшен 'offers/setCity'
//     // setCity: (state, action: PayloadAction<CityName>) => {
//     //   state.city = action.payload;
//     setActiveId(state, action: PayloadAction<ListOffer['id'] | undefined>) {
//       state.activeId = action.payload;
//     },
//   },
//   selectors: {
//     // city: (state: OffersState) => state.city,
//     activeId: (state: OffersState) => state.activeId,
//     offers: (state: OffersState) => state.offers,
//   }
// });

// export const offersActions = offersSlice.actions;
// export const offersSelectors = offersSlice.selectors;
