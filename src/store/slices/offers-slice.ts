import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListOffer } from '../../types';
import { LIST_OFFERS } from '../../mocks/list-offers';
import { RootState } from '../../types/store';

interface OffersState {
  activeId: ListOffer['id'] | null;
  offers: ListOffer[];
}

const initialState: OffersState = {
  activeId: null,
  offers: LIST_OFFERS,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<ListOffer['id'] | null>) {
      state.activeId = action.payload;
    },
  },
  selectors: {
    activeId: (state: OffersState): ListOffer['id'] | null => state.activeId,
    offers: (state: OffersState): ListOffer[] => state.offers,
  }
});

export const offersActions = offersSlice.actions;
export const selectActiveId = (state: RootState) => state.offers.activeId;
export const selectOffers = (state: RootState) => state.offers.offers;
