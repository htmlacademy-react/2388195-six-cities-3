import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../types/store';
import { RequestStatus } from '../../const';
import { fetchNearby, fetchOffer } from '../thunk/offer';
import { FullOffer, ListOffers } from '../../types/offer';

interface OfferState {
  offer: FullOffer | null;
  nearbyOffers: ListOffers;
  offerStatus: RequestStatus;
}

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  offerStatus: RequestStatus.Idle,
};


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
