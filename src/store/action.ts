import {createAction} from '@reduxjs/toolkit';
import { TCityName } from '../const';

export const setCity = createAction<TCityName>('offers/setCity');
