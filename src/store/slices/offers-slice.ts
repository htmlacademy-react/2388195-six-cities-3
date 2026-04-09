import { RequestStatus, SortType } from '@/const';
import { ListOffer, ListOffers } from '@/types/offer';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postFavorite } from '../thunk/favorite';
import { fetchAllOffers } from '../thunk/offers';

interface OffersState {
  activeId: ListOffer['id'] | null;
  activeSort: SortType;
  offers: ListOffers;
  status: RequestStatus;
}

const initialState: OffersState = {
  activeId: null,
  activeSort: SortType.Popular,
  offers: [],
  status: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<ListOffer['id'] | null>) {
      state.activeId = action.payload;
    },
    setActiveSort(state, action: PayloadAction<SortType>) {
      state.activeSort = action.payload;
    },
  },
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
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload.offer;
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);

        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }
      }),
  selectors: {
    selectActiveId: (state: OffersState) => state.activeId,
    selectActiveSort: (state: OffersState) => state.activeSort,
    selectOffers: (state: OffersState) => state.offers,
    selectStatus: (state: OffersState) => state.status,
  },
});

export const offersActions = {...offersSlice.actions, fetchAllOffers};
export const { selectActiveId, selectActiveSort, selectOffers, selectStatus } = offersSlice.selectors;

export const selectOffersStatus = createSelector(
  [selectStatus],
  (status) => ({
    isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
    isError: status === RequestStatus.Failed,
    isSuccess: status === RequestStatus.Success,
  })
)

///////////////////////////////////////////////////////////////////////////
// ListOffer['id'] - это индексный тип (index signature) в TypeScript. Он извлекает точный тип поля id из интерфейса ListOffer.
//activeId?

//offers: [], - пустой массив, чтобы избежать лишнюю проверку везде, где нам нужно итерироваться по массиву

//builder - это объект у которого есть методы addCase....
//метод addCase  -нужен для того чтобы обработать конкретный кейс
//в качестве аргумента передается синхронный экшен,
//как только синхронный экшен будет задиспатчен (автоматически RTK), то вызовется вот эта функция:
// (state, action) => {
//state.status = RequestStatus.Loading;
//state - состояние, action - экшен, который был задиспатчен
//Прямо в функции мы можем менять наше состояние на Loading, ...
//fetchAllOffers - возвращает то, что попадает в срезе в переменную state.offers = action.payload;
