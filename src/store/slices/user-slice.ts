import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { checkAuth, login, logout } from '../thunk/user-auth';
import { RootState } from '../../types/store';
import type { User } from '../../types/user';


interface UserState {
  info: User | null;
  requestStatus: RequestStatus;
  authStatus: AuthorizationStatus;
}

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  authStatus: AuthorizationStatus.Unknown
};

function processSuccess(state: UserState, action: PayloadAction<User>) {
  state.info = action.payload;
  state.authStatus = AuthorizationStatus.Auth;
  state.requestStatus = RequestStatus.Success;
}

function processFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
  state.authStatus = AuthorizationStatus.NoAuth;
}

function processLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, processSuccess);
    builder.addCase(checkAuth.rejected, processFailed);
    builder.addCase(checkAuth.pending, processLoading);
    builder.addCase(login.fulfilled, processSuccess);
    builder.addCase(login.rejected, processFailed);
    builder.addCase(login.pending, processLoading);
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.authStatus = AuthorizationStatus.NoAuth;
    });
  },
  name: 'user',
  initialState,
  reducers: {
    // setActiveId(state, action: PayloadAction<ListOffer['id'] | null>) {
    //   state.activeId = action.payload;
  },
  selectors: {
    info: (state: UserState) => state.info,
    requestStatus: (state: UserState) => state.requestStatus,
    authStatus: (state: UserState) => state.authStatus,
  }
});

// "builder.addMatcher" - позволяет объединить все pending в один

export const userActions = {...userSlice.actions};
// console.dir(offersActions);???
export const selectUserInfo = (state: RootState) => state.user.info;
export const selectAuthStatus = (state: RootState) => state.user.authStatus;

