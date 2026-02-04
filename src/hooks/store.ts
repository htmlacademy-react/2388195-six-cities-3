import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import type {TRootState, TAppDispatch} from '../types/store';
import { store } from '../store';

export const useAppDispatch = () => useDispatch<TAppDispatch>;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useAppStore: ()=> typeof store = useStore;
