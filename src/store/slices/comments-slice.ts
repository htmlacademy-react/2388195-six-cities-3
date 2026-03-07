import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { fetchComments, postComment } from '../thunk/offer';
import { UserComments } from '../../types/user-comment';

interface CommentsState {
  comments: UserComments;
  status: RequestStatus;
}

const initialState: CommentsState = {
  comments: [],
  status: RequestStatus.Idle,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
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
        state.comments.push(action.payload);
      })
      .addCase(postComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  selectors: {
    selectComments: (state: CommentsState) => state.comments,
    selectCommentsStatus: (state: CommentsState) => state.status,
  }
});

export const commentsActions = {...commentsSlice.actions, ...fetchComments, ...postComment};
export const {selectComments, selectCommentsStatus} = commentsSlice.selectors;
