import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { RequestStatus } from '../../const';
import { fetchNearby, fetchOffer } from '../thunk/offers';
import { FullOffer, ServerOffer } from '../../types/offer';


// ListOffer['id'] - это индексный тип (index signature) в TypeScript. Он извлекает точный тип поля id из интерфейса ListOffer.
//activeId?
interface OfferState {
  offer: FullOffer | null;
  nearbyOffers: ServerOffer[];
  offerStatus: RequestStatus;
}

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  offerStatus: RequestStatus.Idle,
};

//builder - это объект у которого есть методы addCase....
//метод addCase  -нужен для того чтобы обработать конкретный кейс
//в качестве аргумента передается синхронный экшен,
//как только синхронный экшен будет задиспатчен (автоматически RTK), то вызовется вот эта функция:
// (state, action) => {
//state.status = RequestStatus.Loading;
//state - состояние, action - экшен, который был задиспатчен
//Прямо в функции мы можем менять наше состояние на Loading, ...
//fetchAllOffers - возвращает то, что попадает в срезе в переменную state.offers = action.payload;

export const offerSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.offerStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offerStatus = RequestStatus.Success;
        state.offer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offerStatus = RequestStatus.Failed;
      })
      .addCase(fetchNearby.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      }),
  name: 'offer',
  initialState,
  reducers: {
    clear(state) {
      state.offer = null;
      state.nearbyOffers = [];
    },
  },
  selectors: {
    nearbyOffers: (state: OfferState) => state.nearbyOffers,
    offer: (state: OfferState) => state.offer,
    offerStatus: (state: OfferState) => state.offerStatus,
  }
});

export const offerActions = {...offerSlice.actions, fetchOffer, fetchNearby};
export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectOffer = (state: RootState) => state.offer.offer;
export const selectOfferStatus = (state: RootState) => state.offer.offerStatus;
// export const offerSelector = offerSlice.selectors;
// console.dir(offerSelector);
// console.dir();
