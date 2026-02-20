import {TypedUseSelectorHook, useDispatch, useSelector, useStore} from 'react-redux';
import {RootState, AppDispatch} from '../types/store';
import {store} from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: ()=> typeof store = useStore;
