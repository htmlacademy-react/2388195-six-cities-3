import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@/const';
import { FullOffer, ListOffers } from '@/types/offer';
import { UserComments, UserComment } from '@/types/user-comment';

export const fetchOffer = createAsyncThunk<FullOffer, string, { extra: AxiosInstance }>(
  'fetchOffer/offer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearby = createAsyncThunk<ListOffers, string, { extra: AxiosInstance }>(
  'fetchOffer/nearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<ListOffers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<
  UserComments,
  FullOffer['id'],
  { extra: AxiosInstance }
>('fetchOffer/comments', async (offerId, { extra: api }) => {
  const { data } = await api.get<UserComments>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

interface PostCommentProps {
  body: {
    comment: string;
    rating: number;
  };
  offerId: FullOffer['id'];
}

export const postComment = createAsyncThunk<
  UserComment,
  PostCommentProps,
  { extra: AxiosInstance }
>('comments/post', async ({ body, offerId }, { extra: api }) => {
  const { data } = await api.post<UserComment>(`${APIRoute.Comments}/${offerId}`, body);
  return data;
});
