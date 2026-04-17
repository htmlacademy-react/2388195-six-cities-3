import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@/const';
import { ListOffers } from '@/types/offer';

export const fetchAllOffers = createAsyncThunk<ListOffers, void, { extra: AxiosInstance }>(
  'fetchAllOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ListOffers>(APIRoute.Offers);
    return data;
  },
);
