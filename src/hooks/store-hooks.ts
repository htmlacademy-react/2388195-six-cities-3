import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
// import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
// import { useMemo } from 'react';
import {RootState, AppDispatch} from '../types/store';
import {store} from '../store';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AxiosInstance } from 'axios';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: ()=> typeof store = useStore;

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: string;
//   extra: AxiosInstance;
// }>();

// ////////////////////////////////////////////////////////
// // //useActionCreators
// export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
//   const dispatch = useAppDispatch();
//   return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
//   // return useMemo(() => bindActionCreators(actions, dispatch), []);
// };

// // Поскольку объект actions передается как аргумент, он может создаваться заново
// // при каждом рендере родительского компонента (если он не обернут в useMemo там).
// // Это приведет к тому, что useActionCreators будет возвращать старые версии функций,
// // привязанные к старым объектам actions. Правильно будет добавить actions и dispatch
// // в массив зависимостей.

// type BoundActions<Actions extends ActionCreatorsMapObject> = {
//   [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ?
//   BoundAsyncThunk<Actions[key]> :
//   Actions[key];
// }

// type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
//   ...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>;

// // TS: Unexpected any. Specify a different type.
