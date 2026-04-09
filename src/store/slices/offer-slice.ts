import { RequestStatus } from '@/const';
import { FullOffer, ListOffers } from '@/types/offer';
import { createSlice } from '@reduxjs/toolkit';
import { postFavorite } from '../thunk/favorite';
import { fetchOffer, fetchNearby } from '../thunk/offer';

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
  name: 'offer',
  initialState,
  reducers: {
    clear(state) {
      state.offer = null;
      state.nearbyOffers = [];
      state.offerStatus = RequestStatus.Idle;
    },
  },
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
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        if (state.offer && state.offer.id === action.payload.offer.id) {
          state.offer.isFavorite = action.payload.offer.isFavorite;
        }
      }),
  selectors: {
    selectNearbyOffers: (state: OfferState) => state.nearbyOffers,
    selectOffer: (state: OfferState) => state.offer,
    selectOfferStatus: (state: OfferState) => state.offerStatus,
  },
});

export const offerActions = { ...offerSlice.actions, fetchOffer, fetchNearby };
export const { selectNearbyOffers, selectOffer, selectOfferStatus } = offerSlice.selectors;
