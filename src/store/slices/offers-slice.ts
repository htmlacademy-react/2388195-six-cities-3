import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListOffer } from '../../types';
import { LIST_OFFERS } from '../../mocks/list-offers';
import { RootState } from '../../types/store';
import { RequestStatus } from '../../const';
import { fetchAllOffers } from '../thunk/offers';


// ListOffer['id'] - это индексный тип (index signature) в TypeScript. Он извлекает точный тип поля id из интерфейса ListOffer.
//activeId?
interface OffersState {
  activeId?: ListOffer['id'] | null;
  offers: ListOffer[];
  status: RequestStatus;
}

const initialState: OffersState = {
  activeId: null,
  offers: LIST_OFFERS,
  status: RequestStatus.Idle,
};

//builder - это объект у которого есть методы addCase....
//метод addCase  -нужен для того чтобы обработать конкретный кейс
//в качестве аргумента передается синхронный экшен,
//как только синхронный экшен будет задиспатчен (автоматически RTK), то вызовется вот эта функция:
// (state, action) => {
//state.status = RequestStatus.Loading;
//state - состояние, action - экшен, который был задиспатчен
//Прямо в функции мы можем менять наше состояние на Loading, ...
//fetchAllOffers - возвращает то, что попадает в срезе в переменную state.offers = action.payload;

export const offersSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<ListOffer['id'] | null>) {
      state.activeId = action.payload;
    },
  },
  selectors: {
    activeId: (state: OffersState): ListOffer['id'] | null | undefined => state.activeId,
    offers: (state: OffersState): ListOffer[] => state.offers,
    status: (state: OffersState): RequestStatus => state.status,
  }
});

export const offersActions = offersSlice.actions;
export const selectActiveId = (state: RootState) => state.offers.activeId;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectStatus = (state: RootState) => state.offers.status;
