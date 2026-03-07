import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import { FavoriteOffer, FavoriteOffers } from '../../types/favorite';
import { FullOffer } from '../../types/offer';


export const fetchFavorites = createAsyncThunk<FavoriteOffers, void, {extra: AxiosInstance}>(
  'fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FavoriteOffers>(APIRoute.Favorite);
    return data;
  }
);


interface PostFavoriteProps {
  offerId: FullOffer['id'];
  status: number;
}

export const postFavorite = createAsyncThunk<FavoriteOffer, PostFavoriteProps, {extra: AxiosInstance}>(
  'comments/post',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<FavoriteOffer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return data;
  },
);
