import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators, ActionCreatorsMapObject } from '@reduxjs/toolkit';

export type BoundActions<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T[K];
};

export const useActionCreators = <T extends ActionCreatorsMapObject>(
  actions: T
): BoundActions<T> => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch) as unknown as BoundActions<T>,
    [actions, dispatch]
  );
};

