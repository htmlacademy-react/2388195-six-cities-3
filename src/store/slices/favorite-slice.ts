import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { FavoriteOffer, FavoriteOffers } from '../../types/favorite';
import { fetchFavorites, postFavorite } from '../thunk/favorite';

interface FavoriteState {
  favoriteOffer: FavoriteOffer | null;
  favoriteOffers: FavoriteOffers;
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
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);
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

export const offerActions = {...favoriteSlice.actions, fetchFavorites, postFavorite};
export const {selectFavoriteOffers, selectFavoriteOffersStatus} = favoriteSlice.selectors;
