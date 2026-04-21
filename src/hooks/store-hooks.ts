import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect } from 'react';

import { RootState, AppDispatch } from '../types/store';
import { store } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => typeof store = useStore;

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
