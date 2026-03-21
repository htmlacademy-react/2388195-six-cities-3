import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, FavoriteStatus } from '../../const';
import { FullOffer, FullOffers } from '../../types/offer';

export const fetchFavorites = createAsyncThunk<FullOffers, void, { extra: AxiosInstance }>(
  'fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FullOffers>(APIRoute.Favorite);
    return data;
  },
);

interface PostFavoriteProps {
  offerId: FullOffer['id'];
  favoriteStatus: FavoriteStatus;
}

interface PostFavoriteResponse {
  offer: FullOffer;
  favoriteStatus: FavoriteStatus;
}

export const postFavorite = createAsyncThunk<
  PostFavoriteResponse,
  PostFavoriteProps,
  { extra: AxiosInstance }
>('postFavorite', async ({ offerId, favoriteStatus }, { extra: api }) => {
  const { data } = await api.post<FullOffer>(`${APIRoute.Favorite}/${offerId}/${favoriteStatus}`);
  return { offer: data, favoriteStatus };
});
