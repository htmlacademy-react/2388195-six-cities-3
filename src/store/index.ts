import { createAPI } from '@/services/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commentsSlice } from './slices/comments-slice';
import { favoriteSlice } from './slices/favorite-slice';
import { offerSlice } from './slices/offer-slice';
import { offersSlice } from './slices/offers-slice';
import { userSlice } from './slices/user-slice';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [favoriteSlice.name]: favoriteSlice.reducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
