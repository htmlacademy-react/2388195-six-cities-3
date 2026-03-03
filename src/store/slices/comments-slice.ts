import { createSlice } from '@reduxjs/toolkit';
// import { LIST_OFFERS } from '../../mocks/list-offers';
import { RootState } from '../../types/store';
import { RequestStatus } from '../../const';
import { fetchComments, postComment } from '../thunk/offers';
import { UserComments } from '../../types';


// ListOffer['id'] - это индексный тип (index signature) в TypeScript. Он извлекает точный тип поля id из интерфейса ListOffer.
//activeId?
interface CommentsState {
  comments: UserComments;
  status: RequestStatus;
}

//Как лучше comments: UserComments; или comments: UserComment[];

const initialState: CommentsState = {
  comments: [],
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

export const commentsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postComment.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        // state.status = RequestStatus.Success;
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'comments',
  initialState,
  reducers: {},
  selectors: {
    comments: (state: CommentsState) => state.comments,
    status: (state: CommentsState) => state.status,
  }
});


export const commentsActions = {...commentsSlice.actions, ...fetchComments, ...postComment};
// console.dir(offersSlice.actions);
// console.dir(offersActions);???
export const selectComments = (state: RootState) => state.comments.comments;
export const selectStatus = (state: RootState) => state.comments.status;
