import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import type {TRootState, TAppDispatch} from '../types/store';
import type {store} from '../store';

export const useAppDispatch = () => useDispatch<TAppDispatch>;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppStore: ()=> typeof store = useStore;


// import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
// import type {TRootState, TAppDispatch} from '../types/store';
// import type {store} from '../store';
// import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
// import { useMemo } from 'react';

// export const useAppDispatch = () => useDispatch<TAppDispatch>;
// export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
// export const useAppStore: ()=> typeof store = useStore;

// export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
//   const dispatch = useAppDispatch();

//   //45:43
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   return useMemo(() => bindActionCreators(actions, dispatch), []);
// };
