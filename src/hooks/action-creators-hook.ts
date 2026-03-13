import { useMemo } from 'react';
import { bindActionCreators, ActionCreatorsMapObject } from '@reduxjs/toolkit';
import { useAppDispatch } from './store-hooks';

export type BoundActions<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T[K];
};

export const useActionCreators = <T extends ActionCreatorsMapObject>(
  actions: T
): BoundActions<T> => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch) as unknown as BoundActions<T>,
    [actions, dispatch]
  );
};

