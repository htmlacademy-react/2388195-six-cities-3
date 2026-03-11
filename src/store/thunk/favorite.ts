import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, FavoriteStatus} from '../../const';
import { FullOffer, FullOffers } from '../../types/offer';


export const fetchFavorites = createAsyncThunk<FullOffers, void, {extra: AxiosInstance}>(
  'fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<FullOffers>(APIRoute.Favorite);
    return data;
  }
);

interface PostFavoriteProps {
  offerId: FullOffer['id'];
  status: FavoriteStatus;
}

interface PostFavoriteResponse {
  offer: FullOffer;
  status: FavoriteStatus;
}

export const postFavorite = createAsyncThunk<PostFavoriteResponse, PostFavoriteProps, {extra: AxiosInstance}>(
  'comments/post',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<FullOffer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return { offer: data, status };
  }
);
