import { AxiosInstance, isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@/const';
import { FullOffer, ListOffers } from '@/types/offer';
import { UserComments, UserComment } from '@/types/user-comment';

// export const fetchOffer = createAsyncThunk<FullOffer, string, { extra: AxiosInstance }>(
//   'fetchOffer/offer',
//   async (offerId, { extra: api }) => {
//     const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
//     return data;
//   },
// );

interface RejectValue {
  status: number;
  message: string;
}

export const fetchOffer = createAsyncThunk<
  FullOffer,
  string,
  { extra: AxiosInstance; rejectValue: RejectValue }
>('data/fetchOffer', async (offerId, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        status: error.response?.status ?? 500,
        message:
          error.response?.status === 404 ? 'Offer not found' : error.message,
      });
    }

    return rejectWithValue({
      status: 500,
      message: 'Unknown error',
    });
  }
});

export const fetchNearby = createAsyncThunk<
  ListOffers,
  string,
  { extra: AxiosInstance }
>('fetchOffer/nearby', async (offerId, { extra: api }) => {
  const { data } = await api.get<ListOffers>(
    `${APIRoute.Offers}/${offerId}/nearby`,
  );
  return data;
});

export const fetchComments = createAsyncThunk<
  UserComments,
  FullOffer['id'],
  { extra: AxiosInstance; rejectValue: RejectValue }
>('fetchOffer/comments', async (offerId, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<UserComments>(
      `${APIRoute.Comments}/${offerId}`,
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue({
        status: error.response?.status ?? 500,
        message:
          error.response?.status === 404 ? 'Comments not found' : error.message,
      });
    }

    return rejectWithValue({
      status: 500,
      message: 'Unknown error',
    });
  }
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
  { extra: AxiosInstance; rejectValue: RejectValue }
>(
  'comments/post',
  async ({ body, offerId }, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserComment>(
        `${APIRoute.Comments}/${offerId}`,
        body,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue({
          status: error.response?.status ?? 500,
          message:
            error.response?.status === 404
              ? "Comment wasn't posted"
              : error.message,
        });
      }

      return rejectWithValue({
        status: 500,
        message: 'Unknown error',
      });
    }
  },
);
