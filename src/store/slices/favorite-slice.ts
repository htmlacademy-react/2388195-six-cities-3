import { createSlice } from '@reduxjs/toolkit';
import { FavoriteStatus, RequestStatus } from '../../const';
import { fetchFavorites, postFavorite } from '../thunk/favorite';
import { FullOffer, FullOffers } from '../../types/offer';

interface FavoriteState {
  favoriteOffer: FullOffer | null;
  favoriteOffers: FullOffers;
  favoriteOfferStatus: RequestStatus;
}

const initialState: FavoriteState = {
  favoriteOffer: null,
  favoriteOffers: [],
  favoriteOfferStatus: RequestStatus.Idle,
};

export const favoriteSlice = createSlice({
  name: 'favoriteOffers',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.favoriteOfferStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOfferStatus = RequestStatus.Success;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.favoriteOfferStatus = RequestStatus.Failed;
      })
      .addCase(postFavorite.pending, (state) => {
        state.favoriteOfferStatus = RequestStatus.Loading;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.favoriteOfferStatus = RequestStatus.Success;
        switch (action.payload.status) {
          case FavoriteStatus.Added:
            state.favoriteOffers.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.offer.id);
        }
      })
      .addCase(postFavorite.rejected, (state) => {
        state.favoriteOfferStatus = RequestStatus.Failed;
      }),
  selectors: {
    selectFavoriteOffers: (state: FavoriteState) => state.favoriteOffers,
    selectFavoriteOffersStatus: (state: FavoriteState) => state.favoriteOfferStatus,
  }
});

export const favoriteOffersActions = {...favoriteSlice.actions, fetchFavorites, postFavorite};
export const {selectFavoriteOffers, selectFavoriteOffersStatus} = favoriteSlice.selectors;
